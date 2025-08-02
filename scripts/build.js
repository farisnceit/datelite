#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Vanilla DatePicker...\n');

// Ensure dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

try {
  // Build JavaScript
  console.log('📦 Building JavaScript...');
  execSync('pnpm run build:js', { stdio: 'inherit' });
  
  // Build CSS
  console.log('🎨 Building CSS...');
  execSync('pnpm run build:css', { stdio: 'inherit' });
  
  // Copy additional files
  console.log('📄 Copying additional files...');
  
  // Copy README for npm
  if (fs.existsSync('README.npm.md')) {
    fs.copyFileSync('README.npm.md', 'README.md');
  }
  
  // Generate package info
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const buildInfo = {
    name: packageJson.name,
    version: packageJson.version,
    buildDate: new Date().toISOString(),
    files: fs.readdirSync(distDir)
  };
  
  fs.writeFileSync(
    path.join(distDir, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
  
  console.log('\n✅ Build completed successfully!');
  console.log(`📊 Bundle sizes:`);
  
  // Show bundle sizes
  const files = fs.readdirSync(distDir);
  files.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.css')) {
      const filePath = path.join(distDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`   ${file}: ${sizeKB}KB`);
    }
  });
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}