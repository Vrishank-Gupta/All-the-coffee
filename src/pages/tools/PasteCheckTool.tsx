import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { PasteCheck } from "../../components/tools/PasteCheck";
import { toolBySlug } from "../../lib/tools/registry";

export default function PasteCheckTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("paste-check")!}
      intro={<>About to paste something into ChatGPT, Claude or Gemini? Answer four questions and see whether it's fine, what to strip out first, and a safer way to get the same help.</>}
      howItWorks={
        <>
          <p>It follows the safety checklist from Chapter 7 and our guide to <a href="/blog/ai-data-privacy-india" className="font-semibold text-caramel-700 underline">AI and data privacy in India</a>: what's generally fine to paste, what isn't, and why the account you use matters as much as the data.</p>
          <p>Passwords and keys, or a policy that says no, stop everything. Real people's details in a personal account need stripping first. Your company's approved tool on your work login is the right place for work data, and even there you share only what the task needs.</p>
          <p>One habit covers most cases: would you be comfortable if the person this is about saw exactly what you typed?</p>
        </>
      }
    >
      <PasteCheck />
    </ToolPageLayout>
  );
}
