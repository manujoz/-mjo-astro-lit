#!/usr/bin/env node
import esbuild from 'esbuild';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function dev() {
  try {
    console.log('👀 Starting development mode...');
    
    // Encontrar archivos TypeScript en src/
    const entryPoints = await glob('src/**/*.ts', { 
      cwd: __dirname,
      absolute: true 
    });

    if (entryPoints.length === 0) {
      console.log('No TypeScript files found in src/');
      return;
    }

    // Crear contexto de esbuild para watch mode
    const ctx = await esbuild.context({
      entryPoints,
      outdir: path.join(__dirname, 'dist'),
      format: 'esm',
      platform: 'node',
      target: 'node18',
      sourcemap: true,
      sourcesContent: false,
      minify: false,
      plugins: [{
        name: 'rebuild-notifier',
        setup(build) {
          build.onEnd((result) => {
            const date = new Date().toLocaleTimeString();
            if (result.errors.length) {
              console.error(`[${date}] ❌ Build failed with errors:`);
              result.errors.forEach(err => console.error(err));
            } else {
              if (result.warnings.length) {
                console.log(`[${date}] ⚠️ Built with warnings:`);
                result.warnings.forEach(warn => console.warn(warn));
              } else {
                console.log(`[${date}] ✅ Build completed`);
              }
            }
          });
        }
      }]
    });

    // Iniciar watch mode
    await ctx.watch();
    console.log('🔄 Watching for changes... (Press Ctrl+C to stop)');

    // Manejar cierre graceful
    process.on('SIGINT', async () => {
      console.log('\n🛑 Stopping development server...');
      await ctx.dispose();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Development mode failed:', error);
    process.exit(1);
  }
}

dev();
