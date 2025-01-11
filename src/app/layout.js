import './globals.css';

export const metadata = {
  title: 'TypeArcade',
  description: 'A typing speed testing platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
