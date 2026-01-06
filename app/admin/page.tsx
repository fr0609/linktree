import Link from "next/link";
import AdminLinkManager from "../components/AdminLinkManager";

export default function AdminPage() {
  return (
    <main className="container">
      <div className="admin-header">
        <div>
          <h1>Admin dashboard</h1>
          <p className="helper">
            Add, edit, and reorder the links on your landing page.
          </p>
        </div>
        <Link className="button ghost" href="/">
          View landing page
        </Link>
      </div>
      <AdminLinkManager />
    </main>
  );
}
