const fs = require('fs');
const pkg = require('./package.json');

let manifest = fs.readFileSync('fxmanifest.lua', 'utf8');

manifest = manifest
  .replace(/version '.*?'/, `version '${pkg.version}'`)
  .replace(/description '.*?'/, `description '${pkg.description || 'AAA TypeScript Boilerplate for Mercy Framework (React NUI + tRPC)'}'`)
  .replace(/author '.*?'/, `author '${pkg.author || 'Mercy Collective + You'}'`);

fs.writeFileSync('fxmanifest.lua', manifest);
console.log(`✅ fxmanifest.lua updated to v${pkg.version}`);