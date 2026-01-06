import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { cleanLinks, DEFAULT_LINKS, LinkItem } from "@/lib/links";

const LINKS_KEY = "linktree:links";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stored = await kv.get<LinkItem[] | null>(LINKS_KEY);
    if (stored === null) {
      return NextResponse.json({ links: DEFAULT_LINKS });
    }
    if (!Array.isArray(stored)) {
      return NextResponse.json({ links: DEFAULT_LINKS });
    }
    const cleaned = cleanLinks(stored);
    if (stored.length > 0 && cleaned.length === 0) {
      return NextResponse.json({ links: DEFAULT_LINKS });
    }
    return NextResponse.json({ links: cleaned });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load links." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || !Array.isArray(body.links)) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const cleaned = cleanLinks(body.links);
    await kv.set(LINKS_KEY, cleaned);
    return NextResponse.json({ links: cleaned });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save links." },
      { status: 500 }
    );
  }
}
