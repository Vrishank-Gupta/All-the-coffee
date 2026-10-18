import { type ComponentType, lazy } from "react";

// Only slugs with real, finished articles go here. BlogPost.tsx falls back
// to a "coming soon" state for any BLOG_POSTS entry not yet present, so the
// listing can safely show all ten without ever rendering fake content.
export const BLOG_CONTENT: Record<string, ComponentType> = {
  "ai-agents-explained": lazy(() => import("./blog/aiAgentsExplained")),
  "shadow-ai-your-team": lazy(() => import("./blog/shadowAiYourTeam")),
  "ai-data-privacy-india": lazy(() => import("./blog/aiDataPrivacyIndia")),
  "ai-hiring-hr-guide": lazy(() => import("./blog/aiHiringHrGuide")),
  "prompt-engineering-is-dying": lazy(() => import("./blog/promptEngineeringIsDying")),
  "ai-subscription-costs": lazy(() => import("./blog/aiSubscriptionCosts")),
  "ai-sales-without-sounding-robotic": lazy(() => import("./blog/aiSalesWithoutSoundingRobotic")),
  "ai-cant-do-your-job-yet": lazy(() => import("./blog/aiCantDoYourJobYet")),
  "skills-that-matter-ai-world": lazy(() => import("./blog/skillsThatMatterAiWorld")),
  "ai-marketing-practical-guide": lazy(() => import("./blog/aiMarketingPracticalGuide")),
};
