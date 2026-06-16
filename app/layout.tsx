import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./Cursor";
import Preloader from "./Preloader";

export const metadata: Metadata = {
  title: "A11 Product Studio — Work",
  description: "A11 Product Studio of the Ambitious",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Cursor />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
