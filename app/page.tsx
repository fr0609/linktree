import Link from "next/link";
import LinkList from "./components/LinkList";

export default function HomePage() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar__left">
            <span>💪🏽 Mejorar tu estado físico es mi propósito</span>
            <span className="dot">•</span>
            <span>👨🏾‍💼 Online · Presencial</span>
          </div>
          <div className="topbar__right">
            <a className="link" href="mailto:fitnessxplorerft@gmail.com">fitnessxplorerft@gmail.com</a>
            <span className="dot">•</span>
            <a className="link" href="https://www.instagram.com/fitnesssxplorer/" target="_blank" rel="noopener">@fitnesssxplorer</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="header__inner">
          <Link className="brand" href="/">Fitness Explorer</Link>
          <nav className="nav">
            <Link href="#links">Links</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="profile">
            <p className="eyebrow"><strong>Fitness Explorer</strong>, Personal Training</p>
            <div className="avatar">FE</div>
            <h1>Fitness Explorer</h1>
            <p className="lead">
              Ayudo a personas ocupadas a ganar fuerza, perder grasa y sentirse seguras con un método simple: entrenamientos inteligentes, técnica adecuada y consistencia.
            </p>
            <ul className="badges">
              <li>Entrenamientos Personalizados</li>
              <li>Seguimiento Semanal</li>
              <li>Soporte por Chat</li>
              <li>Online · Presencial</li>
            </ul>
          </div>
          <div id="links">
            <LinkList />
          </div>
        </section>
        
        <footer className="footer-link">
          <Link href="/admin">Admin Dashboard</Link>
        </footer>
      </main>
    </>
  );
}
