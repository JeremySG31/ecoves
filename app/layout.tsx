
import './globals.css';
import ThemeProvider from './components/theme-provider';

export const metadata = {
  title: 'ECOVES',
  description: 'Fomentando el desarrollo sostenible en Villa El Salvador',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
