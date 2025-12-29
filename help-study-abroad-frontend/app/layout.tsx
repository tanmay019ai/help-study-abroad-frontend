import "./globals.css";

export const metadata = {
  title: "Help Study Abroad",
  description: "Frontend Technical Assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
