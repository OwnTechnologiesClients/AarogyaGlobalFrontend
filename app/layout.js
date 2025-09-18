import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/layout/LayoutContent";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aarogya Global",
  description: "Aarogya Global world best health care",
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
