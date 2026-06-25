const fs = require('fs');
let data = fs.readFileSync('.graphify/.graphify_semantic.json', 'utf-8');
data = data.replace(/"file_type": "entity"/g, '"file_type": "concept"');
data = data.replace(/"file_type": "technology"/g, '"file_type": "concept"');
fs.writeFileSync('.graphify/.graphify_semantic.json', data);
