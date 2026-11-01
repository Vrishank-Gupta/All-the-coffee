"""Make the sample vendor invoices for the Chapter 11 PDF starter and the free invoice tool.

Usage: python scripts/make_sample_invoices.py   (needs fpdf2 and Pillow)

Writes public/downloads/sample-invoices/*.pdf and public/downloads/sample-invoices.zip.
Every vendor and GSTIN is made up (each GSTIN has TEST where the PAN letters go). Labels are worded
differently from vendor to vendor, as on real invoices. Two invoices are traps: PPW-112's total is
Rs 1,000 more than its amounts add up to, and the Hyderabad Electricals invoice is a scan with no
text layer, so a script can't read it and must say so instead of skipping it quietly.
"""
import io
import pathlib
import zipfile

from fpdf import FPDF
from PIL import Image, ImageDraw, ImageFont

OUT = pathlib.Path(__file__).resolve().parents[1] / "public/downloads/sample-invoices"


def inr(n):
    s = f"{n:.2f}"
    whole, paise = s.split(".")
    last3, rest = whole[-3:], whole[:-3]
    groups = []
    while len(rest) > 2:
        groups.insert(0, rest[-2:])
        rest = rest[:-2]
    if rest:
        groups.insert(0, rest)
    return ",".join(groups + [last3]) + "." + paise


# vendor, GSTIN, (number label, number), (date label, date), taxable, gst rate, interstate, total label, total override
INVOICES = [
    ("BrightPack Solutions Pvt Ltd", "27TESTA2001A1Z1", ("Invoice No", "BP-2026-0512"), ("Date", "03-11-2026"), 50000, 18, False, "Total", None),
    ("Sharma Stationers", "27TESTB2002B1Z2", ("Invoice No", "INV-7781"), ("Invoice Date", "04-11-2026"), 12500, 18, False, "Total Amount", None),
    ("CloudNine IT Services", "29TESTC2003C1Z3", ("Bill #", "CN/889"), ("Dated", "05-11-2026"), 100000, 18, True, "Grand Total", None),
    ("Deccan Logistics", "27TESTD2004D1Z4", ("Invoice Number", "DL-4471"), ("Date", "06-11-2026"), 38500, 18, False, "Total", None),
    ("Gujarat Packaging", "24TESTE2005E1Z5", ("Invoice No", "GP/1102"), ("Invoice Date", "07-11-2026"), 52000, 18, True, "Total Amount Payable", None),
    ("Mumbai Cleaning Co", "27TESTF2006F1Z6", ("Inv. No", "MCC-2301"), ("Date", "07-11-2026"), 18000, 18, False, "Total", None),
    ("Patel Printing Works", "27TESTG2007G1Z7", ("Invoice No", "PPW-112"), ("Date", "10-11-2026"), 22000, 18, False, "Grand Total", 26960),
    ("Delhi Furniture House", "07TESTH2008H1Z8", ("Invoice No", "DFH/2026/208"), ("Invoice Date", "11-11-2026"), 140000, 18, True, "Total", None),
    ("Pune Stationery Mart", "27TESTJ2009J1Z9", ("Bill #", "PSM/601"), ("Dated", "12-11-2026"), 4200, 18, False, "Total Amount", None),
    ("Bengaluru Cloud Services", "29TESTK2010K1Z1", ("Invoice No", "BCS/26-27/0511"), ("Date", "13-11-2026"), 60000, 18, True, "Total", None),
    ("Kerala Coffee Traders", "32TESTL2011L1Z2", ("Invoice Number", "KCT-77"), ("Invoice Date", "14-11-2026"), 8000, 5, True, "Grand Total", None),
]
SCANNED = ("Hyderabad Electricals", "36TESTM2012M1Z3", "HE-5520", "15-11-2026", 9000, 18)

BUYER = ["Bill to: Your Company Pvt Ltd", "GSTIN: 27TESTZ9999Z1Z9", "Mumbai, Maharashtra"]


def lines_for(v, gstin, num, date, taxable, rate, inter, total_label, total_override):
    tax = taxable * rate / 100
    rows = [(f"Taxable Value", taxable)]
    rows += [(f"IGST @ {rate}%", tax)] if inter else [(f"CGST @ {rate / 2:g}%", tax / 2), (f"SGST @ {rate / 2:g}%", tax / 2)]
    total = total_override if total_override is not None else taxable + tax
    return rows, total


def make_pdf(v, gstin, num, date, taxable, rate, inter, total_label, total_override):
    rows, total = lines_for(v, gstin, num, date, taxable, rate, inter, total_label, total_override)
    pdf = FPDF(format="A4")
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, v, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 6, f"GSTIN: {gstin}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 13)
    pdf.cell(0, 8, "TAX INVOICE", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 6, f"{num[0]}: {num[1]}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 6, f"{date[0]}: {date[1]}", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)
    for b in BUYER:
        pdf.cell(0, 6, b, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(120, 8, "Description", border="B")
    pdf.cell(60, 8, "Amount (Rs.)", border="B", align="R", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(120, 8, "Goods / services as per order")
    pdf.cell(60, 8, inr(taxable), align="R", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    for label, amount in rows:
        pdf.cell(120, 7, label + ":", align="R")
        pdf.cell(60, 7, inr(amount), align="R", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(120, 9, total_label + ":", align="R")
    pdf.cell(60, 9, "Rs. " + inr(total), align="R", new_x="LMARGIN", new_y="NEXT")
    return bytes(pdf.output())


def make_scanned(v, gstin, num, date, taxable, rate):
    # A photo of a printed invoice: just pixels, no text a program can read.
    img = Image.new("L", (1240, 1754), 250)
    d = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("DejaVuSans.ttf", 34)
    except OSError:
        font = ImageFont.load_default(size=34)
    tax = taxable * rate / 100
    y = 120
    for line in [v, f"GSTIN: {gstin}", "", "TAX INVOICE", f"Invoice No: {num}", f"Date: {date}", "",
                 f"Taxable Value: {inr(taxable)}", f"CGST @ 9%: {inr(tax / 2)}", f"SGST @ 9%: {inr(tax / 2)}",
                 f"Total: Rs. {inr(taxable + tax)}"]:
        d.text((110, y), line, fill=40, font=font)
        y += 60
    img = img.rotate(0.8, fillcolor=250)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=70)
    pdf = FPDF(format="A4")
    pdf.add_page()
    pdf.image(io.BytesIO(buf.getvalue()), x=0, y=0, w=210, h=297)
    return bytes(pdf.output())


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    files = {}
    for inv in INVOICES:
        files[f"{inv[3][1][6:]}{inv[3][1][3:5]}{inv[3][1][:2]}_{inv[0].split()[0].lower()}.pdf"] = make_pdf(*inv)
    s = SCANNED
    files[f"{s[3][6:]}{s[3][3:5]}{s[3][:2]}_{s[0].split()[0].lower()}.pdf"] = make_scanned(*s)
    for name, data in files.items():
        (OUT / name).write_bytes(data)
    with zipfile.ZipFile(OUT.parent / "sample-invoices.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for name, data in sorted(files.items()):
            z.writestr(f"invoices/{name}", data)
    print(f"Wrote {len(files)} invoices to {OUT} and sample-invoices.zip")


if __name__ == "__main__":
    main()
