# Combine the 12 monthly sales files into one workbook with totals by region
from pathlib import Path

import pandas as pd


# Show rupees the Indian way, e.g. 1278000 as ₹12,78,000
def rupees(amount):
    digits = str(int(amount))
    head, tail = digits[:-3], digits[-3:]
    groups = []
    while len(head) > 2:
        groups.insert(0, head[-2:])
        head = head[:-2]
    if head:
        groups.insert(0, head)
    return "₹" + ",".join(groups + [tail])


# Read every monthly file; July calls the column "Amt", so rename it
frames = []
for path in sorted(Path("data").glob("sales_2026_*.xlsx")):
    df = pd.read_excel(path).rename(columns={"Amt": "Amount"})
    if "Amount" not in df.columns:
        raise SystemExit(f"{path.name} has no Amount column")
    df["Month"] = path.stem[-7:]
    frames.append(df)

# Stack them into one table and add up each region
sales = pd.concat(frames, ignore_index=True)
totals = sales.groupby("Region", as_index=False)["Amount"].sum().sort_values("Amount", ascending=False)

# Save both sheets into one Excel file
with pd.ExcelWriter("combined_sales.xlsx") as xl:
    sales.to_excel(xl, sheet_name="All sales", index=False)
    totals.to_excel(xl, sheet_name="Totals by region", index=False)

print(f"Combined {len(sales)} rows from {len(frames)} files")
for _, row in totals.iterrows():
    print(f"{row.Region}: {rupees(row.Amount)}")
print(f"Grand total: {rupees(sales.Amount.sum())}")
