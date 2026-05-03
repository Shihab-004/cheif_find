import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChefFind | AI Chef Matching",
  description: "Find the most relevant home chef based on customer preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}