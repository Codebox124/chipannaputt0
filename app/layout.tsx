import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { CartProvider } from "@/components/cart/cart-context";

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
        <ClerkProvider>
          <CartProvider>
            <Header />
            <main className="pt-32">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
