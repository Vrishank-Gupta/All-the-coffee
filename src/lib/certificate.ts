export function certificateId(userId: string) {
  return `ATC-${userId.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function certificateUrl(userId: string) {
  return `${window.location.origin}/certificate/${userId}`;
}

// LinkedIn's documented "Add to Profile" deep link for certifications:
// https://www.linkedin.com/help/linkedin/answer/a566216
export function linkedInAddToProfileUrl({
  userId,
  completedAt,
}: {
  userId: string;
  completedAt: string;
}) {
  const d = new Date(completedAt);
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: "Practical AI & Automation — All The Coffee Core Course",
    organizationName: "All The Coffee",
    issueYear: String(d.getFullYear()),
    issueMonth: String(d.getMonth() + 1),
    certUrl: certificateUrl(userId),
    certId: certificateId(userId),
  });
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

export function twitterShareUrl(userId: string) {
  const params = new URLSearchParams({
    text: "I just completed All The Coffee's Practical AI & Automation course — built real tools with AI, no coding background needed.",
    url: certificateUrl(userId),
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
