// Sample files for the GSTR-2B reconciler in Chapter 5. Suppliers and GSTINs are made up: every
// GSTIN has "TEST" where the PAN's letters go, so none can belong to a real business. The 2B file
// keeps the column names of the B2B sheet in the GST portal's GSTR-2B Excel, minus the columns the
// reconciler doesn't need.

export const PURCHASE_REGISTER_CSV = `Supplier GSTIN,Supplier Name,Invoice No,Invoice Date,Taxable Value,IGST,CGST,SGST
27TESTA1001A1Z1,Sharma Office Supplies,SOS-1041,02/09/2026,12500,0,1125,1125
27TESTA1001A1Z1,Sharma Office Supplies,SOS-1058,16/09/2026,8400,0,756,756
27TESTB1002B1Z2,Deccan Logistics,INV/023,05/09/2026,46000,0,4140,4140
27TESTB1002B1Z2,Deccan Logistics,INV/031,21/09/2026,38500,0,3465,3465
29TESTC1003C1Z3,Bengaluru Cloud Services,BCS/26-27/0412,01/09/2026,60000,10800,0,0
27testd1004d1z4,Patel Printing Works,ppw-88,09/09/2026,15000,0,1350,1350
27TESTD1004D1Z4,Patel Printing Works,PPW-95,23/09/2026,22000,0,1980,1980
07TESTE1005E1Z5,Delhi Furniture House,DFH/2026/117,11/09/2026,140000,25200,0,0
27TESTF1006F1Z6,Mumbai Cleaning Co,MCC-2209,30/09/2026,18000,0,1620,1620
24TESTG1007G1Z7,Gujarat Packaging,GP/0915,15/09/2026,52000,9360,0,0
24TESTG1007G1Z7,Gujarat Packaging,GP/0928,28/09/2026,47500,8550,0,0
27TESTA1001A1Z1,Sharma Office Supplies,SOS-1066,25/09/2026,9600,0,864,864
29TESTC1003C1Z3,Bengaluru Cloud Services,BCS/26-27/0455,30/09/2026,60000,10800,0,0
27TESTF1006F1Z6,Mumbai Cleaning Co,MCC-2187,03/09/2026,18000,0,1620,1620`;

export const GSTR_2B_CSV = `GSTIN of supplier,Trade/Legal name,Invoice number,Invoice type,Invoice Date,Invoice Value(₹),Place of supply,Taxable Value (₹),Integrated Tax(₹),Central Tax(₹),State/UT Tax(₹)
07TESTE1005E1Z5,DELHI FURNITURE HOUSE,DFH/2026/117,Regular,11-09-2026,165200,Maharashtra,140000,25200,0,0
24TESTG1007G1Z7,GUJARAT PACKAGING,GP-915,Regular,15-09-2026,61360,Maharashtra,52000,9360,0,0
27TESTA1001A1Z1,SHARMA OFFICE SUPPLIES,SOS-1041,Regular,02-09-2026,14750,Maharashtra,12500,0,1125,1125
27TESTA1001A1Z1,SHARMA OFFICE SUPPLIES,SOS-1058,Regular,16-09-2026,9912,Maharashtra,8400,0,756,756
27TESTA1001A1Z1,SHARMA OFFICE SUPPLIES,SOS-1066,Regular,25-09-2026,11328,Maharashtra,9600,0,864,864
27TESTB1002B1Z2,DECCAN LOGISTICS,INV-23,Regular,05-09-2026,54280,Maharashtra,46000,0,4140,4140
27TESTD1004D1Z4,PATEL PRINTING WORKS,PPW/0088,Regular,09-09-2026,17700,Maharashtra,15000,0,1350,1350
27TESTD1004D1Z4,PATEL PRINTING WORKS,PPW-95,Regular,23-09-2026,23600,Maharashtra,20000,0,1800,1800
27TESTF1006F1Z6,MUMBAI CLEANING CO,MCC-2187,Regular,03-09-2026,21240,Maharashtra,18000,0,1620,1620
27TESTF1006F1Z6,MUMBAI CLEANING CO,MCC-2209,Regular,30-09-2026,21240,Maharashtra,18000,0,1620,1620
27TESTH1008H1Z8,PUNE STATIONERY MART,PSM/552,Regular,19-09-2026,4956,Maharashtra,4200,0,378,378
29TESTC1003C1Z3,BENGALURU CLOUD SERVICES,BCS/26-27/0412,Regular,01-09-2026,70800,Maharashtra,60000,10800,0,0
29TESTC1003C1Z3,BENGALURU CLOUD SERVICES,BCS/26-27/0455,Regular,30-09-2026,7080,Maharashtra,6000,1080,0,0`;

export type ReconGroup = "matched" | "mismatch" | "missing" | "only2b";

export interface ReconRow {
  group: ReconGroup;
  gstin: string;
  supplier: string;
  invoice: string;
  booksTax: number | null;
  portalTax: number | null;
}

export interface ReconResult {
  rows: ReconRow[];
  counts: Record<ReconGroup, number>;
  atRisk: number;
}

export const GROUP_LABELS: Record<ReconGroup, string> = {
  matched: "Matched",
  mismatch: "Amount mismatch",
  missing: "Missing in 2B",
  only2b: "Only in 2B",
};

function parse(csv: string) {
  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => line.split(","));
}

// "INV/023", "inv-23" and "INV 0023" are the same invoice: ignore capitals, separators and
// leading zeros. A strict match (the first build's usual mistake) compares the text as typed.
export function invoiceKey(gstin: string, invoice: string, strict: boolean) {
  if (strict) return `${gstin}|${invoice}`;
  const inv = invoice
    .toUpperCase()
    .split(/[^A-Z0-9]+/)
    .map((part) => part.replace(/\d+/g, (n) => String(Number(n))))
    .join("");
  return `${gstin.trim().toUpperCase()}|${inv}`;
}

export function reconcile(strict: boolean): ReconResult {
  const books = parse(PURCHASE_REGISTER_CSV).map(([gstin, name, inv, , , igst, cgst, sgst]) => ({
    gstin, name, inv, tax: Number(igst) + Number(cgst) + Number(sgst),
  }));
  const portal = new Map(
    parse(GSTR_2B_CSV).map(([gstin, name, inv, , , , , , igst, cgst, sgst]) => [
      invoiceKey(gstin, inv, strict),
      { gstin, name, inv, tax: Number(igst) + Number(cgst) + Number(sgst) },
    ]),
  );
  const rows: ReconRow[] = [];
  let atRisk = 0;
  for (const b of books) {
    const key = invoiceKey(b.gstin, b.inv, strict);
    const p = portal.get(key);
    if (!p) {
      rows.push({ group: "missing", gstin: b.gstin, supplier: b.name, invoice: b.inv, booksTax: b.tax, portalTax: null });
      atRisk += b.tax;
      continue;
    }
    portal.delete(key);
    const group: ReconGroup = Math.abs(b.tax - p.tax) <= 1 ? "matched" : "mismatch";
    if (group === "mismatch" && p.tax < b.tax) atRisk += b.tax - p.tax;
    rows.push({ group, gstin: b.gstin, supplier: b.name, invoice: b.inv, booksTax: b.tax, portalTax: p.tax });
  }
  for (const p of portal.values()) {
    rows.push({ group: "only2b", gstin: p.gstin, supplier: p.name, invoice: p.inv, booksTax: null, portalTax: p.tax });
  }
  const counts = { matched: 0, mismatch: 0, missing: 0, only2b: 0 };
  for (const r of rows) counts[r.group]++;
  return { rows, counts, atRisk };
}
