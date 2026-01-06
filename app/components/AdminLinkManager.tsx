"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  cleanLinks,
  createLink,
  DEFAULT_LINKS,
  LinkItem,
  normalizeUrl
} from "@/lib/links";

const emptyLink = {
  title: "",
  url: "",
  description: ""
};

export default function AdminLinkManager() {
  const [links, setLinks] = useState<LinkItem[]>(DEFAULT_LINKS);
  const [newLink, setNewLink] = useState(emptyLink);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLink, setEditLink] = useState(emptyLink);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const skipInitialSave = useRef(true);

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
          setLoadError("Unable to load saved links. Showing defaults.");
          setLinks(DEFAULT_LINKS);
        }
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    fetchLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (skipInitialSave.current) {
      skipInitialSave.current = false;
      return;
    }

    const persistLinks = async () => {
      try {
        setSaveStatus("saving");
        const response = await fetch("/api/links", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ links })
        });
        if (!response.ok) {
          throw new Error("Failed to save");
        }
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    };

    persistLinks();
  }, [links, isLoaded]);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newLink.title.trim() || !newLink.url.trim()) {
      return;
    }

    const created = createLink({
      title: newLink.title,
      url: newLink.url,
      description: newLink.description || undefined
    });

    setLinks((prev) => [...prev, created]);
    setNewLink(emptyLink);
  };

  const startEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setEditLink({
      title: link.title,
      url: link.url,
      description: link.description || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditLink(emptyLink);
  };

  const saveEdit = () => {
    if (!editingId) {
      return;
    }

    if (!editLink.title.trim() || !editLink.url.trim()) {
      return;
    }

    setLinks((prev) =>
      prev.map((link) =>
        link.id === editingId
          ? {
              ...link,
              title: editLink.title.trim(),
              url: normalizeUrl(editLink.url),
              description: editLink.description.trim() || undefined
            }
          : link
      )
    );

    setEditingId(null);
    setEditLink(emptyLink);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const moveLink = (index: number, direction: -1 | 1) => {
    setLinks((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) {
        return prev;
      }
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const resetDefaults = () => {
    setLinks(DEFAULT_LINKS.map((link) => ({ ...link })));
  };

  const statusMessage =
    saveStatus === "saving"
      ? "Saving changes..."
      : saveStatus === "saved"
        ? "All changes saved."
        : saveStatus === "error"
          ? "Could not save changes. Check your connection."
          : "";

  return (
    <div className="admin-shell">
      {loadError ? <p className="helper">{loadError}</p> : null}
      {statusMessage ? <p className="helper">{statusMessage}</p> : null}
      <section className="admin-card">
        <form className="admin-form" onSubmit={handleAdd}>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={newLink.title}
              onChange={(event) =>
                setNewLink((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="Link title"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="url">URL</label>
            <input
              id="url"
              value={newLink.url}
              onChange={(event) =>
                setNewLink((prev) => ({ ...prev, url: event.target.value }))
              }
              placeholder="https://"
              required
            />
            <span className="helper">
              URLs without http/https will be saved with https://
            </span>
          </div>
          <div className="field">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={newLink.description}
              onChange={(event) =>
                setNewLink((prev) => ({ ...prev, description: event.target.value }))
              }
              placeholder="Short context for the link"
            />
          </div>
          <div className="button-row">
            <button type="submit">Add link</button>
            <button type="button" className="secondary" onClick={resetDefaults}>
              Reset to defaults
            </button>
          </div>
        </form>
      </section>

      <section className="admin-card">
        <h3>Manage links</h3>
        <p className="helper">
          Reorder links with the arrows. Changes are saved to Vercel KV.
        </p>
        {links.length === 0 ? (
          <p className="helper">No links yet. Add one above to get started.</p>
        ) : (
          links.map((link, index) => (
            <div key={link.id} className="link-row">
              {editingId === link.id ? (
                <div className="admin-form">
                  <div className="field">
                    <label htmlFor={`edit-title-${link.id}`}>Title</label>
                    <input
                      id={`edit-title-${link.id}`}
                      value={editLink.title}
                      onChange={(event) =>
                        setEditLink((prev) => ({
                          ...prev,
                          title: event.target.value
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`edit-url-${link.id}`}>URL</label>
                    <input
                      id={`edit-url-${link.id}`}
                      value={editLink.url}
                      onChange={(event) =>
                        setEditLink((prev) => ({
                          ...prev,
                          url: event.target.value
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor={`edit-desc-${link.id}`}>Description</label>
                    <textarea
                      id={`edit-desc-${link.id}`}
                      value={editLink.description}
                      onChange={(event) =>
                        setEditLink((prev) => ({
                          ...prev,
                          description: event.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="button-row">
                    <button type="button" onClick={saveEdit}>
                      Save changes
                    </button>
                    <button type="button" className="secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h4>{link.title}</h4>
                    {link.description ? (
                      <p className="link-meta">{link.description}</p>
                    ) : null}
                    <p className="link-meta">{link.url}</p>
                  </div>
                  <div className="inline-actions">
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => startEdit(link)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => removeLink(link.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => moveLink(index, -1)}
                      aria-label="Move up"
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => moveLink(index, 1)}
                      aria-label="Move down"
                    >
                      Down
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
