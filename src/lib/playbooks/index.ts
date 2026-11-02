import type { Playbook } from "./types.ts";
import { SALES } from "./sales.ts";
import { MARKETING } from "./marketing.ts";
import { FINANCE } from "./finance.ts";
import { PRODUCT } from "./product.ts";
import { HR } from "./hr.ts";
import { LEGAL } from "./legal.ts";
import { OPS } from "./ops.ts";

// The Role Playbooks, in the order they're listed. Included with the one-time payment that unlocks
// Chapters 4 to 11.
export const PLAYBOOKS: Playbook[] = [SALES, MARKETING, FINANCE, PRODUCT, HR, LEGAL, OPS];

export const playbookBySlug = (slug: string) => PLAYBOOKS.find((p) => p.slug === slug);
export const BUILD_COUNT = () => PLAYBOOKS.reduce((n, p) => n + p.builds.length, 0);
