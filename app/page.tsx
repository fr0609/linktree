import Link from "next/link";
import LinkList from "./components/LinkList";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <div className="profile">
          <div className="avatar">FR</div>
          <h1>FitLife Gym</h1>
          <p>
            Transform your body, elevate your mind. Join the strongest community in town. All your fitness resources in one place.
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
