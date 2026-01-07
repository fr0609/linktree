import Image from "next/image";
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
            <Link href="/admin" prefetch={false}>Admin</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="profile">
            <p className="eyebrow"><strong>Fitness Explorer</strong>, Personal Training</p>
            <div className="profile-photo">
              <Image
                src="/assets/coach/empieza-hoy.jpeg"
                alt="Charles animándote a empezar hoy"
                width={520}
                height={520}
                priority
              />
            </div>
            <h1>Entrena conmigo, Charles</h1>
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

        <section className="coach-highlight">
          <div className="coach-media">
            <Image
              src="/assets/coach/charles-modelando.jpeg"
              alt="Charles mostrando resultados de entrenamiento"
              fill
              sizes="(min-width: 900px) 55vw, 100vw"
              priority
            />
          </div>
          <div className="coach-copy">
            <p className="eyebrow">Empieza hoy</p>
            <h2>Haz de tu objetivo una realidad</h2>
            <p>
              Entrenamientos claros, hábitos que se sostienen y acompañamiento real. He ayudado a cientos de clientes
              a recomponer su cuerpo sin métodos extremos.
            </p>
            <div className="coach-points">
              <div>
                <strong>✔ Plan a medida</strong>
                <span>Según tu tiempo, equipo y nivel.</span>
              </div>
              <div>
                <strong>✔ Seguimiento cercano</strong>
                <span>Feedback semanal y ajustes constantes.</span>
              </div>
              <div>
                <strong>✔ Resultados visibles</strong>
                <span>Foco en fuerza, pérdida de grasa y confianza.</span>
              </div>
            </div>
            <div className="button-row">
              <a className="button" href="https://wa.me/15551234567" target="_blank" rel="noreferrer">Agenda tu llamada</a>
              <a className="button ghost" href="#links">Explora los enlaces</a>
            </div>
          </div>
        </section>
        
        <footer className="footer-link">
          <Link href="/admin" prefetch={false}>Admin Dashboard</Link>
        </footer>
      </main>
    </>
  );
}
