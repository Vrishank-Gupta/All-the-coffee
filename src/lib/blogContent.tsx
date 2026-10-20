import { type ComponentType, lazy } from "react";

// Only slugs with real, finished articles go here. BlogPost.tsx falls back
// to a "coming soon" state for any BLOG_POSTS entry not yet present, so the
// listing can safely show every entry without ever rendering fake content.
export const BLOG_CONTENT: Record<string, ComponentType> = {
  "chatgpt-go-free-year-ending": lazy(() => import("./blog/chatgptGoFreeYearEnding")),
  "ai-work-appraisal-self-review": lazy(() => import("./blog/aiWorkAppraisalSelfReview")),
  "free-ai-offers-india-work": lazy(() => import("./blog/freeAiOffersIndiaWork")),
  "automated-my-job-tell-manager": lazy(() => import("./blog/automatedMyJobTellManager")),
  "free-ai-tool-builders-compared": lazy(() => import("./blog/freeAiToolBuildersCompared")),
  "copilot-excel-worth-it-india": lazy(() => import("./blog/copilotInExcelIndia")),
  "yuva-ai-for-all-free-government-ai-course": lazy(() => import("./blog/yuvaAiForAllGuide")),
  "resume-job-description-match-checker": lazy(() => import("./blog/resumeJdMatchChecker")),
  "gstr-2b-reconciliation-ai": lazy(() => import("./blog/gstReconciliationAi")),
  "ai-browser-work-accounts-safety": lazy(() => import("./blog/aiBrowserWorkAccountsSafety")),
  "ai-hindi-indian-languages-work": lazy(() => import("./blog/aiIndianLanguagesWork")),
  "fewer-junior-hires-grunt-work": lazy(() => import("./blog/fewerJuniorHiresGruntWork")),
  "dpdp-employee-data-hr": lazy(() => import("./blog/dpdpEmployeeDataHr")),
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
