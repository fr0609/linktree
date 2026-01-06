import Link from "next/link";
import LinkList from "./components/LinkList";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <div className="profile">
          <div className="avatar">LR</div>
          <h1>Frarlon Rodriguez</h1>
          <p>
            A quick hub for the projects, writing, and collaborations I care
            about right now.
          </p>
        </div>
        <LinkList />
      </section>
      <div className="footer-link">
        <Link href="/admin">Open admin dashboard</Link>
      </div>
    </main>
  );
}
