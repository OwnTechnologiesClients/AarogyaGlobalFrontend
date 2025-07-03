import { Poppins } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/navbar/TopBar";
import BottomFooter from "@/components/footer/BottomFooter";
import Footer from "@/components/footer/Footer";
import Wrapper from "@/components/layout/Wrapper";
import NavbarToFilterLayout from "@/components/layout/NavbarToFilterLayout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aarogya Global",
  description: "Aarogya Global world best health care",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {/* TopBar outside the main wrapper */}
        <TopBar />
        {/* Main content wrapper with consistent padding and rounded corners */}
        <div className="w-full px-4 md:px-6 lg:px-8">
          <Wrapper padding="none">
            <NavbarToFilterLayout />
            {children}
            <Footer />
          </Wrapper>
        </div>

        {/* Bottom footer outside the main wrapper */}
        <BottomFooter />
      </body>
    </html>
  );
}
