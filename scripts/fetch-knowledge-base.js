import fs from "node:fs";
import path from "node:path";

const TARGET_DIR = "docs/Developers/";
const API_SPEC_DIR = "static/pendle-v2/openapi/";

const V2_DEV_KNOWLEDGE_BASE_DOC_ID = "1GnE1PqqMrRy4hT6JJq86l6eLWbFEs2ubJwK_g8PSUH8";
const V2_USER_KNOWLEDGE_BASE_DOC_ID = "1nMqsJGkNVw3ZxCZZ743PhzrWo6O8urlwMBESFalQSTw";
const V2_API_SPEC = 'https://api-v2.pendle.finance/core/docs/specs.json';

function getGoogleDocUrl(docId) {
  return `https://docs.google.com/document/d/${docId}/export?format=txt`;
}

async function storeKnowledgeBase(url, fileName, targetDir = TARGET_DIR, isJson = false) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch: " + res.status);

    const text = await res.text();

    const targetPath = path.join(targetDir, fileName);
    if (isJson) {
        fs.writeFileSync(targetPath, JSON.stringify(JSON.parse(text), null, 2));
    } else {
        fs.writeFileSync(targetPath, text);
    }
}

async function main() {
    await storeKnowledgeBase(getGoogleDocUrl(V2_DEV_KNOWLEDGE_BASE_DOC_ID), "dev-knowledge-base.txt");
    await storeKnowledgeBase(getGoogleDocUrl(V2_USER_KNOWLEDGE_BASE_DOC_ID), "user-knowledge-base.txt");
    await storeKnowledgeBase(V2_API_SPEC, "open-api.json", API_SPEC_DIR, true);
}

main();