# -*- coding: utf-8 -*-
import sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import fitz

doc = fitz.open(r'c:\Users\groha\DEV\ClaudeCode\ToolBoxData.pdf')
outdir = r'c:\Users\groha\DEV\ClaudeCode\pdf_pages'
os.makedirs(outdir, exist_ok=True)

# Save in chunks of ~10 pages
chunk_size = 10
for start in range(0, doc.page_count, chunk_size):
    end = min(start + chunk_size, doc.page_count)
    chunk_text = ""
    for i in range(start, end):
        text = doc[i].get_text('text').strip()
        if text:
            chunk_text += f"\n=== עמוד {i+1} ===\n{text}\n"

    fname = os.path.join(outdir, f"pages_{start+1}_{end}.txt")
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(chunk_text)
    print(f"Saved {fname} ({len(chunk_text)} chars)")

print("Done!")
