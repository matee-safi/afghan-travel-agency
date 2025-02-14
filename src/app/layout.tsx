import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afghan Travel Agency",
  description:
    "We are your reliable partner in your Journeys, at Afghan Travel Agency we provide you with the best services for your travels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black`}>
        <div className="min-h-screen bg-black text-gray-100">
          <ToastContainer theme="dark" draggable position="bottom-right" />
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
