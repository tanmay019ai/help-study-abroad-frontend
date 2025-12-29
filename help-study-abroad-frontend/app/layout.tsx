import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";

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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
