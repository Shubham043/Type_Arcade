import './globals.css';
import { GameProvider } from './context/page.js'; 

export const metadata = {
  title: 'TypeArcade',
  description: 'A typing speed testing platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
