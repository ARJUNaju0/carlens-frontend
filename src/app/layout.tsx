import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
        <body >
            <Navbar/>
            {children}
            <Footer/>
        </body>
        </html>
    );
    }