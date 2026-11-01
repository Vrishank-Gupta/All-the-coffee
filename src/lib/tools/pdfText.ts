// Turns a PDF into plain text, line by line, with pdf.js. pdf.js gives back separate pieces of text
// with their positions; pieces at the same height are joined (left to right) into one line, so a
// label and its amount in another column end up on the same line: "Taxable Value: 22,000.00".
// A scanned invoice is only a picture, so it comes back empty.

interface TextItem { str: string; transform: number[] }
interface PdfJs {
  getDocument(src: { data: Uint8Array }): { promise: Promise<{ numPages: number; getPage(n: number): Promise<{ getTextContent(): Promise<{ items: unknown[] }> }> }> };
}

export async function pdfToText(pdfjs: PdfJs, data: Uint8Array): Promise<string> {
  const doc = await pdfjs.getDocument({ data }).promise;
  const out: string[] = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const content = await (await doc.getPage(n)).getTextContent();
    const rows = new Map<number, { x: number; s: string }[]>();
    for (const item of content.items as TextItem[]) {
      if (!item.str?.trim()) continue;
      const y = Math.round(item.transform[5] / 3) * 3; // pieces within 3 points share a line
      const row = rows.get(y) ?? [];
      row.push({ x: item.transform[4], s: item.str });
      rows.set(y, row);
    }
    // PDF heights count up from the bottom of the page, so the top line has the largest y
    for (const y of [...rows.keys()].sort((a, b) => b - a)) {
      out.push(rows.get(y)!.sort((a, b) => a.x - b.x).map((p) => p.s.trim()).join("  "));
    }
  }
  return out.join("\n");
}

// Loads pdf.js only when someone actually opens a PDF, so the rest of the site stays light.
export async function loadPdfJs(): Promise<PdfJs> {
  const [pdfjs, worker] = await Promise.all([import("pdfjs-dist"), import("pdfjs-dist/build/pdf.worker.min.mjs?url")]);
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs as unknown as PdfJs;
}
