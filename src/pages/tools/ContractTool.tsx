import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { ContractCheck } from "../../components/tools/ContractCheck";
import { toolBySlug } from "../../lib/tools/registry";

export default function ContractTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("contract-check")!}
      intro={<>A vendor sends a twelve-page agreement and wants it signed by Friday. Paste it in and see the clauses worth a second look: auto-renewals, notice periods, exit penalties, one-sided liability, and where disputes would go.</>}
      howItWorks={
        <>
          <p>
            Risky clauses tend to use the same words: "renew automatically", "days' notice", "remainder of the term",
            "indemnify", "without limit", "exclusive jurisdiction". The tool reads each sentence, flags the ones that
            match, pulls out the number that matters (90 days, 24%, Kolkata) and quotes the sentence exactly, so you
            can find it in the document.
          </p>
          <p>
            It doesn't use AI, so it never invents a clause, but it can miss one written in unusual words. Use it to
            know where to look, then read those parts properly. For anything important, ask a lawyer.
          </p>
        </>
      }
    >
      <ContractCheck />
    </ToolPageLayout>
  );
}
