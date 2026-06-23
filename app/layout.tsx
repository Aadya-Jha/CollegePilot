import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import type { Viewport } from 'next';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
};

export const metadata: Metadata = {
  title: "CollegePilot",
  description: "Discover and compare the best colleges in India",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        {children}
        <script async src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
        <script dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi,ta,te,bn,mr,gu',
                layout: google.translate.TranslateElement.InlineLayout.DROPDOWN
              }, 'google_translate_element');
            }
          `
        }} />
      </body>
    </html>
  );
}