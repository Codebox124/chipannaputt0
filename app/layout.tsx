import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import { ShopifyProvider } from "./components/ui/shopify-provider";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chip Anna Putt",
  description: "Chip Anna Putt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cabin.className} antialiased`}
      >
        <ShopifyProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ShopifyProvider>
      </body>
    </html>
  );
}
