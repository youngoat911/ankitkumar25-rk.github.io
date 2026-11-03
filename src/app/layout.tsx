import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youngoat.dev"),
  title: "Ankit Kumar | Full-Stack Developer",
  description: "Ankit Kumar is an IIT Jodhpur student building practical products across AI, web platforms, developer tools, IoT, and Linux systems.",
  keywords: [
    "Ankit Kumar",
    "Portfolio",
    "Full-Stack Developer",
    "AI Applications",
    "Developer Tools",
    "IoT",
    "Linux",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Ankit Kumar", url: "https://youngoat.dev" }],
  creator: "Ankit Kumar",
  openGraph: {
    title: "Ankit Kumar | Full-Stack Developer",
    description: "IIT Jodhpur student building practical products across AI, web platforms, developer tools, IoT, and Linux systems.",
    url: "https://youngoat.dev",
    siteName: "Ankit Kumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Kumar | Full-Stack Developer",
    description: "IIT Jodhpur student building practical products across AI, web platforms, developer tools, IoT, and Linux systems.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking inline script — runs before paint, eliminates flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='light'||(!t&&!d)){document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
