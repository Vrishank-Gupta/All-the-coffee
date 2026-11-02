import { Navigate, useParams } from "react-router-dom";
import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { Runner } from "../../components/playbooks/Runner";
import { toolBySlug } from "../../lib/tools/registry";
import { PLAYBOOKS } from "../../lib/playbooks";

// A free tool powered by a playbook build's reference implementation, at /tools/<slug>
export default function PlaybookTool() {
  const { slug = "" } = useParams();
  const tool = toolBySlug(slug);
  const build = PLAYBOOKS.flatMap((p) => p.builds).find((b) => b.id === tool?.build);
  if (!tool || !build) return <Navigate to="/tools" replace />;
  return (
    <ToolPageLayout tool={tool} intro={<>{tool.intro}</>} howItWorks={<>{tool.how?.map((h) => <p key={h}>{h}</p>)}</>}>
      <Runner files={build.files} run={build.run} label="Make it" autoRun />
      <p className="text-[11px] leading-snug text-espresso-700/60">
        Edit the sample, or use your own file with the same columns. Everything runs in your browser; nothing is uploaded.
      </p>
    </ToolPageLayout>
  );
}
