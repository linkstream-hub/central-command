const fs = require('fs');
const html = fs.readFileSync('html.txt', 'utf8');
const regex = /\["([^"]+)",(\d+)\]/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log("Sheet:", match[1], "GID:", match[2]);
}
const regex2 = /\[(\d+),"([^"]+)"/g;
while ((match = regex2.exec(html)) !== null) {
  console.log("Sheet:", match[2], "GID:", match[1]);
}
