'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Involvement.module.css';

const Involvement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc1, setImgSrc1] = useState('/involucrate-1.png');
  const [imgSrc2, setImgSrc2] = useState('/involucrate-2.png');
  const sectionRef = useRef(null);

  useEffect(() => {
    // Client-side only check to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      setImgSrc1(`/involucrate-1.png?${new Date().getTime()}`);
      setImgSrc2(`/involucrate-2.png?${new Date().getTime()}`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    let currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.involvementSection} ${isVisible ? styles.visible : ''}`}>
      <div className={`${styles.involvementItem} ${styles.involvementItemLeft}`}>
        <div className={styles.textBlock}>
          <h3>Organiza y Participa en Eventos</h3>
          <p>Desde jornadas de limpieza y arborización en parques zonales y lomas, hasta talleres de reciclaje y compostaje comunitario. Tu participación activa es la fuerza que transforma nuestro distrito. Anímate a unirte a eventos existentes o crea tus propias iniciativas para generar un impacto visible y duradero en Villa El Salvador.</p>
        </div>
        <div className={styles.imageBlock}>
          <Image key="involucrate-1" src={imgSrc1} alt="Persona participando en un evento de limpieza" width={500} height={300} />
        </div>
      </div>
      <div className={`${styles.involvementItem} ${styles.involvementItemRight}`}>
        <div className={styles.textBlock}>
          <h3>Educa y Concientiza a Tu Comunidad</h3>
          <p>El cambio más profundo nace del conocimiento. Conviértete en un embajador ambiental en tu barrio. Organiza charlas, crea contenido digital, o simplemente comparte datos interesantes sobre sostenibilidad en tus redes sociales. Cada persona informada es un aliado más en la construcción de un Villa El Salvador más verde y consciente.</p>
        </div>
        <div className={styles.imageBlock}>
          <Image key="involucrate-2" src={imgSrc2} alt="Grupo de personas en una charla sobre medio ambiente" width={500} height={300} />
        </div>
      </div>
    </section>
  );
};

export default Involvement;
