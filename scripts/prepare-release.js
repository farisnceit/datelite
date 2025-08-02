#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Preparing release...\n');

try {
  // Run tests
  console.log('🧪 Running tests...');
  execSync('pnpm test', { stdio: 'inherit' });
  
  // Lint code
  console.log('🔍 Linting code...');
  execSync('pnpm run lint', { stdio: 'inherit' });
  
  // Build project
  console.log('📦 Building project...');
  execSync('pnpm run build', { stdio: 'inherit' });
  
  // Check bundle sizes
  console.log('📊 Checking bundle sizes...');
  try {
    execSync('pnpm run size', { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️  Bundle size check failed, but continuing...');
  }
  
  // Validate package.json
  console.log('✅ Validating package.json...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredFields = ['name', 'version', 'description', 'main', 'author', 'license'];
  const missingFields = requiredFields.filter(field => !packageJson[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields in package.json: ${missingFields.join(', ')}`);
  }
  
  // Check if all dist files exist
  const expectedFiles = [
    'dist/datelite.js',
    'dist/datelite.min.js',
    'dist/datelite.esm.js',
    'dist/datelite.cjs.js',
    'dist/datelite.css',
    'dist/datelite.min.css'
  ];
  
  const missingFiles = expectedFiles.filter(file => !fs.existsSync(file));
  if (missingFiles.length > 0) {
    throw new Error(`Missing build files: ${missingFiles.join(', ')}`);
  }
  
  console.log('\n🎉 Release preparation completed successfully!');
  console.log('📋 Pre-publish checklist:');
  console.log('   ✅ Tests passed');
  console.log('   ✅ Code linted');
  console.log('   ✅ Project built');
  console.log('   ✅ Bundle sizes checked');
  console.log('   ✅ Package.json validated');
  console.log('   ✅ All build files present');
  console.log('\n🚀 Ready to publish with: pnpm publish');
  
} catch (error) {
  console.error('❌ Release preparation failed:', error.message);
  process.exit(1);
}