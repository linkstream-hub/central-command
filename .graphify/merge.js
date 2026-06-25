const fs = require('fs');
const logFile = 'C:/Users/Aldrick/.gemini/antigravity/brain/f6b568b9-c106-447b-8eac-94e71c5257d5/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean);

let allNodes = [];
let allEdges = [];
let allHyperedges = [];

const subagentFiles = [
  '.graphify/subagent_10b2578d.json',
  '.graphify/subagent_82994c4f.json'
];

for (const file of subagentFiles) {
    if (fs.existsSync(file)) {
        try {
            const parsed = JSON.parse(fs.readFileSync(file, 'utf-8'));
            allNodes.push(...(parsed.nodes || []));
            allEdges.push(...(parsed.edges || []));
            if (parsed.hyperedges) allHyperedges.push(...(parsed.hyperedges || []));
        } catch(e) {
            console.error('Error parsing file', file);
        }
    }
}

const seen = new Set();
for (const line of lines) {
    try {
        const data = JSON.parse(line);
        if (data.type === 'SYSTEM_MESSAGE' && data.content) {
            // Find JSON blocks starting with {"nodes"
            const match = data.content.match(/\{[\s\n]*"nodes"[\s\S]*\}/);
            if (match) {
                const jsonStr = match[0];
                if (seen.has(jsonStr)) continue;
                seen.add(jsonStr);
                
                try {
                    const parsed = JSON.parse(jsonStr);
                    // Only process if it has nodes array
                    if (Array.isArray(parsed.nodes)) {
                        allNodes.push(...(parsed.nodes || []));
                        allEdges.push(...(parsed.edges || []));
                        if (parsed.hyperedges) allHyperedges.push(...(parsed.hyperedges || []));
                    }
                } catch (e) {
                    console.error("Parse error:", e.message);
                }
            }
        }
    } catch(e) {}
}

const semanticGraph = { nodes: allNodes, edges: allEdges, hyperedges: allHyperedges };
fs.writeFileSync('.graphify/.graphify_semantic.json', JSON.stringify(semanticGraph, null, 2));
console.log(`Merged ${seen.size} transcript chunks + ${subagentFiles.length} files. Nodes: ${allNodes.length}, Edges: ${allEdges.length}, Hyperedges: ${allHyperedges.length}`);
