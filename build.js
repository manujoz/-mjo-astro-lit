#!/usr/bin/env node
import esbuild from 'esbuild';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {
  try {
    console.log('🧹 Cleaning dist directory...');
    
    // Limpiar dist/ pero mantener los .d.ts files
    try {
      const files = await glob('dist/**/*', { 
        cwd: __dirname,
        ignore: ['dist/**/*.d.ts'],
        absolute: true 
      });
      await Promise.all(files.map(file => fs.rm(file, { force: true })));
    } catch (err) {
      // Si no existe dist/, crear el directorio
      await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
    }

    console.log('⚡ Building with esbuild...');
    
    // Encontrar archivos TypeScript en src/
    const entryPoints = await glob('src/**/*.ts', { 
      cwd: __dirname,
      absolute: true 
    });

    if (entryPoints.length === 0) {
      console.log('No TypeScript files found in src/');
      return;
    }

    // Configuración de esbuild
    await esbuild.build({
      entryPoints,
      outdir: path.join(__dirname, 'dist'),
      format: 'esm',
      platform: 'node',
      target: 'node18',
      sourcemap: false,
      sourcesContent: false,
      minify: false,
    });

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
