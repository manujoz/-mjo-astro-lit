#!/usr/bin/env node
import { glob } from 'glob';
import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isCI = !!process.env.CI;
const defaultTimeout = isCI ? 1400000 : 600000;

async function test() {
  try {
    console.log('🧪 Running tests...');
    
    // Buscar archivos de test
    const testFiles = await glob('test/**/*.test.js', { 
      cwd: __dirname,
      absolute: true 
    });

    if (testFiles.length === 0) {
      console.log('No test files found in test/ directory');
      return;
    }

    console.log(`Found ${testFiles.length} test file(s)`);

    // Ejecutar tests usando Node.js test runner
    run({
      files: testFiles,
      timeout: defaultTimeout,
      concurrency: true,
    })
    .on('test:fail', () => {
      // Establecer código de salida 1 en caso de fallos
      process.exitCode = 1;
    })
    .pipe(new spec())
    .pipe(process.stdout);

  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

test();
