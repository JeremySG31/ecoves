import HomePageClient from './home-page-client';

export default function HomePage() {
  const initialCounters = { 
    reportes_ciudadanos: 0, 
    voces_amplificadas: 0, 
    participantes_online: 0 
  };

  return <HomePageClient initialCounters={initialCounters} />;
}
