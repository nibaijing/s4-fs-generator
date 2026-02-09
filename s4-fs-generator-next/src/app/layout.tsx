import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAP S/4HANA FS Generator",
  description: "AI-powered Functional Specification Generator for SAP S/4HANA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
