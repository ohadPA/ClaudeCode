# -*- coding: utf-8 -*-
import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import fitz

doc = fitz.open(r'c:\Users\groha\DEV\ClaudeCode\ToolBoxData.pdf')
output = {"page_count": doc.page_count, "pages": {}}

for i in range(doc.page_count):
    page = doc[i]
    text = page.get_text('text')
    if text.strip():
        output["pages"][str(i+1)] = text

# Save to file
with open(r'c:\Users\groha\DEV\ClaudeCode\pdf_content.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(output['pages'])} pages out of {doc.page_count}")
