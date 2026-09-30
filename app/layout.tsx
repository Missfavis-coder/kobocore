import type { Metadata } from "next";
import { Poppins, Instrument_Serif,  Instrument_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import Providers from "@/components/layout/provider";
import { ThemeProvider } from "@/lib/hooks/use-theme";
import Script from "next/script";



//const poppins = Poppins({
 //// subsets: ["latin"],
 // variable: "--font-sans",
 // weight: ["400", "500", "600", "700"]
//});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
display: "swap",
  weight: "400",
  style: ["normal", "italic"],
 variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "KoboCore",
  description: "Safe Transaction Always.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`  ${instrumentSans.variable} ${instrumentSerif.variable} h-full antialiased dark `}
    >
<body className="min-h-full flex flex-col dark:text-white">
  <Providers>
    <ThemeProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  </Providers>
{/**  <Script
    id="tawk-chat"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),
          s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/69f5cfe6b402371c38a6801a/1jnk3875b';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `,
    }}
  /> */}

</body>
    </html>
  );
}
