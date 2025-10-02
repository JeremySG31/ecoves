
import './globals.css';

export const metadata = {
  title: 'ECOVES',
  description: 'Fomentando el desarrollo sostenible en Villa El Salvador',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
