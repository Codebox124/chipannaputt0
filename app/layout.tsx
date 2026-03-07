import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import CartModal from "@/components/CartModal";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chip Anna Putt",
  description: "Chip Anna Putt - For golfers of all skill levels",
};

// Sample product data
const product = {
    id: 'chip-anna-putt-kit',
    name: 'Chip Anna Putt Kit',
    price: 149.99,
    image: '/images/product1.png', // Replace with actual image
    description: 'Master your short game with the ultimate training kit. Includes premium putting mat, alignment tools, and expert video tutorials.'
}

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
        <Header />
        <main>
          {children}
          <CartModal />
        </main>
        <Footer />
      </body>
    </html>
  );
}
