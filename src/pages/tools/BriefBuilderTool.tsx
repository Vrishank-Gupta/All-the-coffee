import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { BriefBuilder } from "../../components/tools/BriefBuilder";
import { toolBySlug } from "../../lib/tools/registry";

export default function BriefBuilderTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("brief-builder")!}
      intro={<>Describe a task you repeat at work. Get back whether it's worth a tool, where to build it, a brief you can paste into any AI chat, how to check its answer, and the traps to test for.</>}
      howItWorks={
        <>
          <p>It walks you through <a href="/method" className="font-semibold text-caramel-700 underline">the Builder's Method</a>: spot the task, size it, choose where to build it, brief it, and know the right answer before the tool exists.</p>
          <p>The brief follows the four parts every chapter uses: who it's for, what it does (with every rule written out), what good looks like, and what to avoid.</p>
          <p>The traps come from what you tick about your data. Dates, money, blanks and totals rows each have their own ways of going quietly wrong.</p>
        </>
      }
    >
      <BriefBuilder />
    </ToolPageLayout>
  );
}
