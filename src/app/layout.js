

import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Dynamic Forms/Tables ",
  description: "Converts json form definitions into dynamic forms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
       {children}
       
       
      </body>
    </html>
  );
}
