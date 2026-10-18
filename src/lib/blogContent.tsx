import { type ComponentType, lazy } from "react";

// Only slugs with real, finished articles go here. BlogPost.tsx falls back
// to a "coming soon" state for any BLOG_POSTS entry not yet present, so the
// listing can safely show all ten without ever rendering fake content.
export const BLOG_CONTENT: Record<string, ComponentType> = {
  "ai-agents-explained": lazy(() => import("./blog/aiAgentsExplained")),
  "shadow-ai-your-team": lazy(() => import("./blog/shadowAiYourTeam")),
};
