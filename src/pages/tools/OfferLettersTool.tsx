import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { OfferLetters } from "../../components/tools/OfferLetters";
import { toolBySlug } from "../../lib/tools/registry";

export default function OfferLettersTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("offer-letters")!}
      intro={<>Eight joiners this month, one letter each, and every name, date and CTC has to be right. Paste the list once and get every letter, with amounts written the Indian way.</>}
      howItWorks={
        <>
          <p>
            Your letter is a template with blanks in curly brackets, like {"{designation}"} and {"{joining_date}"}.
            Each row of your CSV fills the blanks once, so eight rows give eight letters.
          </p>
          <p>
            Amounts come out the Indian way: ₹12,50,000 and "Rupees Twelve Lakh Fifty Thousand Only", never "1.25
            million". Dates read as 1 December 2026. A row with an empty cell gets no letter and is listed instead,
            so a letter with a blank designation never goes out.
          </p>
          <p>"Save all as PDF" opens every letter, one per page, in your browser's print window. Choose "Save as PDF" there.</p>
        </>
      }
    >
      <OfferLetters />
    </ToolPageLayout>
  );
}
