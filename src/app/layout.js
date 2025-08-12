import './globals.css';
import { GameProvider } from './context/page.js';

export const metadata = {
  title: 'TypeArcade – Multiplayer Typing Speed Challenge',
  description:
    'Play fast-paced multiplayer typing games online. Challenge friends and track your typing speed in real-time with TypeArcade.',
  
  verification: {
    google: 'cdybsdjmLNMGnriiAKQgl77lnFfvYuVqE7oj_tx9m9w',
  },

  openGraph: {
    title: 'TypeArcade – Multiplayer Typing Speed Challenge',
    description:
      'Compete in real-time typing battles. Invite friends, track scores, and improve your speed!',
    url: 'https://typearcade.vercel.app', 
    siteName: 'TypeArcade',
    images: [
      {
        url: 'https://typearcade.vercel.app/logo.webp', 
        width: 1200,
        height: 630,
        alt: 'TypeArcade Game Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  
  twitter: {
    card: 'summary_large_image',
    title: 'TypeArcade – Multiplayer Typing Speed Challenge',
    description:
      'Play multiplayer typing speed games and challenge your friends online.',
    images: ['https://typearcade.vercel.app/preview.jpg'], 
  },

  keywords: [
    'typing game',
    'multiplayer typing',
    'typing speed test',
    'online typing challenge',
    'TypeArcade',
  ],
  authors: [{ name: 'Shubham Sharma' }],
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
