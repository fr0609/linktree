import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { cleanLinks, DEFAULT_LINKS, LinkItem } from "@/lib/links";

const BLOB_KEY = "links.json";
const BLOB_BASE_URL = (process.env.BLOB_BASE_URL || "https://c6w3nqm4lv3zlwxc.public.blob.vercel-storage.com").replace(/\/$/, "");
export const dynamic = "force-dynamic";

let memoryLinks: LinkItem[] | null = null;

function getSafeLinks(candidate: unknown): LinkItem[] {
  if (!Array.isArray(candidate)) {
    return DEFAULT_LINKS;
  }

  const cleaned = cleanLinks(candidate as LinkItem[]);
  if ((candidate as LinkItem[]).length > 0 && cleaned.length === 0) {
    return DEFAULT_LINKS;
  }

  return cleaned.length === 0 ? DEFAULT_LINKS : cleaned;
}

function getBlobUrl(key: string): string {
  return `${BLOB_BASE_URL}/${key}`;
}

async function readLinksFromBlob(): Promise<LinkItem[] | null> {
  try {
    const response = await fetch(getBlobUrl(BLOB_KEY), { cache: "no-cache" });
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const payload = Array.isArray(data) ? data : (data as { links?: unknown }).links;
    return getSafeLinks(payload ?? []);
  } catch {
    return null;
  }
}

export async function GET() {
  const blobLinks = await readLinksFromBlob();
  if (blobLinks) {
    memoryLinks = blobLinks;
    return NextResponse.json({ links: blobLinks });
  }

  if (memoryLinks !== null) {
    return NextResponse.json({
      links: memoryLinks,
      warning: "Using cached links; blob unavailable."
    });
  }

  const defaults = getSafeLinks(DEFAULT_LINKS);
  memoryLinks = defaults;
  return NextResponse.json({ links: defaults });
}

export async function PUT(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !Array.isArray((body as { links: unknown }).links)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const safeLinks = getSafeLinks((body as { links: unknown }).links);
  memoryLinks = safeLinks;

  try {
    await put(BLOB_KEY, JSON.stringify({ links: safeLinks }), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json"
    });

    return NextResponse.json({ links: safeLinks, url: getBlobUrl(BLOB_KEY) });
  } catch {
    return NextResponse.json({
      links: safeLinks,
      warning: "Saved locally; blob storage not reachable."
    });
  }
}
