import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasyaf CV",
  description: "Muhammad Kasyaf Anugrah | Cv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <style>{`
          /* Sembunyikan elemen Google agar tidak merusak UI Cikawan Gb */
          #google_translate_element, .skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame {
            display: none !important;
          }
          body { top: 0 !important; }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div id="google_translate_element"></div>

        {children}

        <Script id="google-translate-logic" strategy="beforeInteractive">
          {`
            (function() {
              const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
              const target = browserLang.split('-')[0];
              const isIndo = target === 'id' || target === 'in';

              if (!isIndo) {
                // Tembak cookie secara instan sebelum script google dimuat
                // Format: /bahasa_asal/bahasa_tujuan
                document.cookie = "googtrans=/id/" + target + "; path=/";
                document.cookie = "googtrans=/id/" + target + "; path=/; domain=." + window.location.hostname;
              } else {
                // Hapus cookie jika user orang Indonesia
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
              }
            })();
          `}
        </Script>

        <Script id="google-translate-config" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'id',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              }, 'google_translate_element');
            }
          `}
        </Script>

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}