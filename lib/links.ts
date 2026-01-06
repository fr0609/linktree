export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export const DEFAULT_LINKS: LinkItem[] = [
  {
    id: "welcome",
    title: "Portfolio",
    url: "https://example.com",
    description: "Projects, case studies, and experiments."
  },
  {
    id: "newsletter",
    title: "Newsletter",
    url: "https://example.com/newsletter",
    description: "Monthly deep dives and resources."
  },
  {
    id: "contact",
    title: "Contact",
    url: "https://example.com/contact",
    description: "Collaborations, talks, and consulting."
  }
];

export function createLink(input: {
  title: string;
  url: string;
  description?: string;
}): LinkItem {
  return {
    id: createId(),
    title: input.title.trim(),
    url: normalizeUrl(input.url),
    description: input.description?.trim() || undefined
  };
}

export function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function cleanLinks(value: unknown): LinkItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter(isValidLink)
    .map((link) => ({
      id: link.id,
      title: link.title.trim(),
      url: normalizeUrl(link.url),
      description: link.description?.trim() || undefined
    }));
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `link_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function isValidLink(value: unknown): value is LinkItem {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value as LinkItem;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.url === "string"
  );
}
