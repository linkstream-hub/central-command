const fs = require('fs');
const html = fs.readFileSync('html.txt', 'utf8');
const regex = /\["([^"]+)",(\d+)\]/g;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[1].toLowerCase().includes('roster')) {
    console.log("Found Roster Sheet:", match[1], "GID:", match[2]);
  }
}
// Try an alternative regex for sheet metadata
const regex2 = /\[(\d+),"([^"]+)"/g;
while ((match = regex2.exec(html)) !== null) {
  if (match[2].toLowerCase().includes('roster')) {
    console.log("Found Roster Sheet:", match[2], "GID:", match[1]);
  }
}
