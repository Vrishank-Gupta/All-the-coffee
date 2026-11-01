import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { InvoiceReader } from "../../components/tools/InvoiceReader";
import { toolBySlug } from "../../lib/tools/registry";

export default function InvoiceTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("invoice-reader")!}
      intro={<>A folder of vendor invoices, and someone has to type every GSTIN, invoice number and amount into Excel. Drop the PDFs here instead, and see which ones don't add up.</>}
      howItWorks={
        <>
          <p>
            Each PDF is opened in your browser, its text is read, and the tool looks for the labels invoices use:
            Invoice No or Bill #, Date, Taxable Value, CGST, SGST or IGST, and Total. The GSTIN is found by its
            15-character pattern.
          </p>
          <p>
            Every row is checked: taxable value plus GST should equal the total. If it doesn't, the row turns red and
            shows by how much. A scanned invoice is only a picture, with no text to read, so it's listed as
            unreadable instead of being skipped quietly.
          </p>
          <p>"Copy for Excel" pastes straight into a sheet, with one column per detail.</p>
        </>
      }
    >
      <InvoiceReader />
    </ToolPageLayout>
  );
}
