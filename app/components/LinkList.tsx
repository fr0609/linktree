"use client";

import { useEffect, useState } from "react";
import { cleanLinks, DEFAULT_LINKS, LinkItem } from "@/lib/links";

export default function LinkList() {
  const [links, setLinks] = useState<LinkItem[]>(DEFAULT_LINKS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/links");
        if (!response.ok) {
          throw new Error("Failed to load links");
        }
        const data = await response.json();
        if (Array.isArray(data.links)) {
          if (isMounted) {
            setLinks(cleanLinks(data.links));
          }
        } else if (isMounted) {
          setLinks(DEFAULT_LINKS);
        }
      } catch {
        if (isMounted) {
          setLinks(DEFAULT_LINKS);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="links">
        <div className="link-card">
          <h3>Loading links...</h3>
          <p>Fetching the latest updates.</p>
        </div>
      </div>
    );
  }

  if (!links.length) {
    return (
      <div className="links">
        <div className="link-card">
          <h3>No links yet</h3>
          <p>Add your first link from the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="links">
      {links.map((link, index) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="link-card"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <h3>{link.title}</h3>
          {link.description ? <p>{link.description}</p> : null}
          <span>Visit link</span>
        </a>
      ))}
    </div>
  );
}
