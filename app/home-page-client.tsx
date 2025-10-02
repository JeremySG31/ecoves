'use client'

import { useState, useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './page.module.css';
import { saveReport, registerForEvent, incrementShareCount } from './actions';

// --- ICONS ---
const ArrowPrevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>;
const ArrowNextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.64 5.64c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L5.64 5.64zm12.73 12.73c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.06-1.06zM5.64 18.36l1.06-1.06c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0zm12.73-12.73l1.06-1.06c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0z"/></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.3 4.88c.16.02.32.05.49.09.13.03.25.07.38.11.38.13.75.31 1.1.54.48.31.91.7.12.87-.2.06-.41.04-.6-.05-.18-.08-.35-.2-.53-.33-.2-.14-.4-.3-.62-.46-.3-.22-.6-.4-.94-.52-.2-.07-.4-.1-.6-.1-.56 0-1.03.39-1.03.91s.47.91 1.03.91H12c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6c0-2.02 1-3.83 2.54-4.9-.13-.3-.2-.63-.2-.98 0-.4.08-.79.24-1.15.05-.11.1-.22.15-.32.14-.28.32-.54.52-.78.3-.34.65-.64 1.03-.88.13-.08.26-.15.39-.22.2-.11.41-.2.63-.28.16-.06.33-.1.49-.13z"/></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 8.81C7.5 8.31 6.79 8 6 8c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>;
const ReportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>;
const PeopleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;

// --- FORM BUTTONS ---
function ReportSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.formButton}>
      {pending ? 'Enviando Reporte...' : 'Enviar Reporte Confidencial'}
    </button>
  );
}

function EventSubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={styles.eventButton}>
            {pending ? 'Inscribiendo...' : '¡Confirmar Inscripción!'}
        </button>
    );
}

// --- REPORT FORM ---
function ReportForm({ onReportSubmit }) {
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(saveReport, initialState);
  const formRef = useRef(null)

  useEffect(() => {
      if (state.success) {
          onReportSubmit();
          formRef.current.reset()
      }
  }, [state.success, onReportSubmit]);

  return (
    <form ref={formRef} action={dispatch} className={styles.form}>
      <textarea 
        name="report"
        placeholder="Ej: Acumulación de basura en el cruce de Av. Sol con Av. Revolución."
        aria-describedby="report-error"
        required
      />
      <ReportSubmitButton />
      {state.message && <p className={styles.formMessage}>{state.message}</p>}
      {state.errors?.report && 
        <p id="report-error" className={styles.formError}>{state.errors.report.join(', ')}</p> }
    </form>
  );
}

// --- EVENT CARD ---
function EventCard({ event, onRegisterClick }) {
    return (
        <div className={styles.eventCard}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Fecha:</strong> {event.date}</p>
            <p><strong>Lugar:</strong> {event.location}</p>
            <button onClick={() => onRegisterClick(event)} className={styles.eventButton}>
                ¡Quiero Apuntarme!
            </button>
        </div>
    );
}

// --- SHARE MODAL ---
function ShareModal({ onClose, onShare, pageUrl, theme }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setIsCopied(true);
            onShare(); // Call the callback
            setTimeout(() => setIsCopied(false), 2500);
        });
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}><CloseIcon /></button>
                <h2>Amplifica el Mensaje</h2>
                <p>El cambio es contagioso. Escanea o comparte el enlace para movilizar a tu comunidad.</p>
                <div className={styles.qrContainer}>
                    <QRCodeCanvas value={pageUrl} size={160} bgColor={theme === 'dark' ? '#252525' : '#ffffff'} fgColor={theme === 'dark' ? '#e0e0e0' : '#333'} />
                </div>
                <div className={styles.copyContainer}>
                    <input type="text" value={pageUrl} readOnly />
                    <button onClick={handleCopy} className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}>
                        {isCopied ? '¡Copiado!' : <CopyIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- EVENT REGISTRATION MODAL ---
function EventRegistrationModal({ event, onClose, onRegistrationSuccess }) {
    const initialState = { message: null, errors: {}, success: false };
    const [state, dispatch] = useActionState(registerForEvent, initialState);

    useEffect(() => {
        if (state.success) {
            onRegistrationSuccess();
            const timer = setTimeout(() => onClose(), 2500);
            return () => clearTimeout(timer);
        }
    }, [state.success, onRegistrationSuccess, onClose]);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <form action={dispatch} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button type="button" className={styles.modalCloseButton} onClick={onClose}><CloseIcon /></button>
                <h2>Inscripción: {event.title}</h2>
                <p>¡Qué bueno tenerte! Déjanos tus datos para confirmar tu asistencia.</p>
                
                <input type="hidden" name="eventName" value={event.title} />
                
                <div className={styles.formField}>
                    <label htmlFor="name">Nombre Completo</label>
                    <input type="text" id="name" name="name" required />
                    {state.errors?.name && <p className={styles.formError}>{state.errors.name.join(', ')}</p>}
                </div>

                <div className={styles.formField}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required />
                    {state.errors?.email && <p className={styles.formError}>{state.errors.email.join(', ')}</p>}
                </div>

                {state.message ? (
                     <p className={`${styles.formMessage} ${styles.centeredMessage}`}>{state.message}</p>
                ) : (
                    <EventSubmitButton />
                )}
            </form>
        </div>
    )
}

// --- IMPACT COUNTER SECTION ---
const useIntersectionObserver = (options) => {
    const [entry, setEntry] = useState(null);
    const [node, setNode] = useState(null);

    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new window.IntersectionObserver(([entry]) => setEntry(entry), options);

        const { current: currentObserver } = observer;
        if (node) currentObserver.observe(node);

        return () => currentObserver.disconnect();
    }, [node, options]);

    return [setNode, entry];
};

function ImpactCounter({ target, label, icon }) {
    const [count, setCount] = useState(0);
    const [node, entry] = useIntersectionObserver({ threshold: 0.5 });
    const hasAnimated = useRef(false);
    const animationFrameRef = useRef();

    useEffect(() => {
        if (entry && entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const end = target;
            if (start === end) {
                setCount(end);
                return;
            }

            const duration = 1500; // ms
            const startTime = Date.now();

            const animate = () => {
                const currentTime = Date.now();
                const progress = Math.min(1, (currentTime - startTime) / duration);
                const currentCount = Math.floor(progress * (end - start) + start);
                setCount(currentCount);

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        } else if (!entry || !entry.isIntersecting) {
            // Optional: Reset animation when out of view
            // hasAnimated.current = false;
            // setCount(0);
        }

        return () => cancelAnimationFrame(animationFrameRef.current);

    }, [entry, target]);
    
    // This effect ensures the count visually updates when the target prop changes
    useEffect(() => {
      if(hasAnimated.current) { // only animate if initial animation has happened
        // You could re-trigger the animation here if you want it to animate every time.
        // For now, we'll just jump to the new target.
        setCount(target);
      } 
    }, [target]);


    return (
        <div ref={node} className={styles.impactItem}>
            <div className={styles.impactIcon}>{icon}</div>
            <div className={styles.impactNumber}>{count.toLocaleString()}</div>
            <div className={styles.impactLabel}>{label}</div>
        </div>
    );
}

// --- MAIN CLIENT PAGE ---
export default function HomePageClient({ initialCounters }) {
  const [theme, setTheme] = useState('dark');
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [counters, setCounters] = useState(initialCounters);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const events = [
    { id: 1, title: "Webinar: Introducción a la Sostenibilidad", description: "Un seminario online para entender los conceptos básicos del desarrollo sostenible y cómo aplicarlos en tu día a día.", date: "Miércoles, 15 de Octubre - 7:00 PM", location: "Online (Zoom)"},
    { id: 2, title: "Taller Virtual de Reciclaje Creativo", description: "Aprende a transformar objetos cotidianos en arte y decoración. ¡Una segunda vida para tus residuos!", date: "Sábado, 25 de Octubre - 11:00 AM", location: "Online (Google Meet)"},
    { id: 3, title: "Charla: El Futuro de la Energía Limpia", description: "Expertos discuten el potencial de las energías renovables en nuestra comunidad y cómo podemos ser parte del cambio.", date: "Jueves, 6 de Noviembre - 6:30 PM", location: "Online (YouTube Live)"},
    { id: 4, title: "Grupo de Lectura: 'Primavera Silenciosa'", description: "Únete a nuestro club de lectura virtual para discutir este libro fundamental del ecologismo moderno.", date: "Martes, 18 de Noviembre - 8:00 PM", location: "Online (Discord)"},
    { id: 5, title: "Cine al Aire Libre: Documentales que Inspiran", description: "Proyectaremos una selección de documentales sobre medio ambiente bajo las estrellas. ¡Trae tu manta!", date: "Viernes, 28 de Noviembre - 7:30 PM", location: "Anfiteatro del Parque Zonal"},
    { id: 6, title: "Competencia de Fotografía: #MiBarrioVerde", description: "Captura la belleza natural de tu entorno, desde un árbol solitario hasta un jardín comunitario. ¡Habrá premios!", date: "Todo el mes de Diciembre", location: "Online (vía Instagram)"}
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleRegisterClick = (event) => {
      setSelectedEvent(event);
      setEventModalOpen(true);
  }

  const handleReportSubmit = () => {
      setCounters(prev => ({...prev, reportes_ciudadanos: prev.reportes_ciudadanos + 1}));
  }

  const handleRegistrationSuccess = () => {
      setCounters(prev => ({...prev, participantes_online: prev.participantes_online + 1}));
  }

  const handleShare = () => {
      incrementShareCount(); // Call server action
      setCounters(prev => ({...prev, voces_amplificadas: prev.voces_amplificadas + 1}));
  }

  const renderCustomArrow = (onClickHandler, hasNext, label, direction) => (
    <button type="button" onClick={onClickHandler} disabled={!hasNext} className={`${styles.customArrow} ${direction === 'prev' ? styles.prevArrow : styles.nextArrow}`} aria-label={label}>
      {direction === 'prev' ? <ArrowPrevIcon /> : <ArrowNextIcon />}
    </button>
  );

  return (
    <div className={`${styles.container} ${theme === 'light' ? styles.lightTheme : ''}`}>
      {isShareModalOpen && <ShareModal onClose={() => setShareModalOpen(false)} onShare={handleShare} pageUrl={pageUrl} theme={theme} />}
      {isEventModalOpen && <EventRegistrationModal event={selectedEvent} onClose={() => setEventModalOpen(false)} onRegistrationSuccess={handleRegistrationSuccess} />}
      
      <header className={styles.header}>
        <div className={styles.logo}>ECOVES</div>
        <nav className={styles.nav}>
          <a href="#noticias">Noticias</a>
          <a href="#denuncias">Buzón</a>
          <a href="#eventos">Eventos</a>
          <button onClick={() => setShareModalOpen(true)} className={styles.navButton}><ShareIcon/> Compartir</button>
        </nav>
        <button onClick={toggleTheme} className={styles.themeToggler} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main>
        <section className={styles.hero}>
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5500} renderArrowPrev={(onClickHandler, hasPrev, label) => renderCustomArrow(onClickHandler, hasPrev, label, 'prev')} renderArrowNext={(onClickHandler, hasNext, label) => renderCustomArrow(onClickHandler, hasNext, label, 'next')}>
            <div className={styles.heroSlide}>
              <img src="https://picsum.photos/seed/code/1920/1080" alt="Líneas de código en un monitor"/>
              <div className={styles.heroContent}>
                  <h1>Programa el Cambio</h1>
                  <p>Tu participación online es la fuerza que impulsa la conciencia ambiental en nuestra comunidad.</p>
                  <a href="#impacto" className={styles.heroButton}>Ver Impacto Digital</a>
              </div>
            </div>
            <div className={styles.heroSlide}>
              <img src="https://picsum.photos/seed/connect/1920/1080" alt="Red de nodos interconectados"/>
              <div className={styles.heroContent}>
                  <h1>Conecta. Comparte. Concientiza.</h1>
                  <p>Cada vez que compartes, tu voz se une a un coro digital por un futuro más verde.</p>
                  <a href="#eventos" className={styles.heroButton}>Únete a la Conversación</a>
              </div>
            </div>
            <div className={styles.heroSlide}>
              <img src="https://picsum.photos/seed/report/1920/1080" alt="Dedo apuntando a un mapa digital"/>
              <div className={styles.heroContent}>
                  <h1>Tu Reporte, Nuestra Acción</h1>
                  <p>Conviértete en un guardián digital. Tu reporte es el primer paso para la solución.</p>
                  <a href="#denuncias" className={styles.heroButton}>Reporta Ahora</a>
              </div>
            </div>
          </Carousel>
        </section>
        
        <section id="impacto" className={`${styles.section} ${styles.impactSection}`}>
            <ImpactCounter target={counters.reportes_ciudadanos} label="Reportes Ciudadanos" icon={<ReportIcon />} />
            <ImpactCounter target={counters.voces_amplificadas} label="Voces Amplificadas" icon={<ShareIcon />} />
            <ImpactCounter target={counters.participantes_online} label="Participantes Online" icon={<PeopleIcon />} />
        </section>

        <section id="noticias" className={styles.section}>
          <h2>Iniciativas que Inspiran</h2>
          <div className={styles.grid}>
            <div className={styles.card}><img src="https://picsum.photos/seed/garden/800/600" alt="Huerto urbano comunitario en la azotea" /><div className={styles.cardContent}><h3>Huertos en el Cielo</h3><p>Vecinos transforman azoteas en prósperos huertos urbanos, cultivando alimentos frescos y comunidad.</p></div></div>
            <div className={styles.card}><img src="https://picsum.photos/seed/repair/800/600" alt="Taller de reparación de electrónicos" /><div className={styles.cardContent}><h3>Repara y Reutiliza</h3><p>Lanzamos talleres para dar una segunda vida a tus aparatos. ¡Combatamos juntos la basura electrónica!</p></div></div>
            <div className={styles.card}><img src="https://picsum.photos/seed/market/800/600" alt="Mercado local con productos sin empaque" /><div className={styles.cardContent}><h3>Mercados Cero Residuos</h3><p>Promovemos la compra a granel y el uso de envases reutilizables en los mercados locales. ¡Menos plástico, más vida!</p></div></div>
            <div className={styles.card}><img src="https://picsum.photos/seed/solar/800/600" alt="Paneles solares en techos de casas" /><div className={styles.cardContent}><h3>Sol para Todos</h3><p>Conoce los nuevos programas de microcréditos para instalar paneles solares en tu hogar y ahorra en tu recibo de luz.</p></div></div>
            <div className={styles.card}><img src="https://picsum.photos/seed/water/800/600" alt="Sistema de recolección de agua de lluvia" /><div className={styles.cardContent}><h3>Cosecha de Lluvia</h3><p>Implementamos sistemas de recolección de agua pluvial en parques y áreas comunes para el riego sostenible.</p></div></div>
            <div className={styles.card}><img src="https://picsum.photos/seed/art/800/600" alt="Mural hecho con tapas de plástico recicladas" /><div className={styles.cardContent}><h3>Arte que Transforma</h3><p>Artistas locales convierten residuos en impresionantes obras de arte urbano, embelleciendo el distrito y creando conciencia.</p></div></div>
          </div>
        </section>

        <section id="denuncias" className={`${styles.section} ${styles.darkSection}`}>
          <h2>Conviértete en un Guardián Ambiental</h2>
          <p className={styles.sectionDescription}>¿Ves un problema? No te quedes en silencio. Tu reporte anónimo es la herramienta más poderosa para el cambio.</p>
          <ReportForm onReportSubmit={handleReportSubmit} />
        </section>

        <section id="eventos" className={styles.section}>
          <h2>Agenda Verde 100% Online</h2>
           <p className={styles.sectionDescription}>Participa, aprende y conecta desde la comodidad de tu casa. El cambio empieza con un clic.</p>
          <div className={styles.grid}>
            {events.map((event) => (
                <EventCard key={event.id} event={event} onRegisterClick={handleRegisterClick} />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 ECOVES. Creado con ❤️ para Villa El Salvador.</p>
      </footer>
    </div>
  );
}
