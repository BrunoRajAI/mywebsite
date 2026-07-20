import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { resumeData } from "@/lib/resume-data";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const url = "https://brunolionelraj.com";

export const metadata: Metadata = {
  title: `${resumeData.name} — ${resumeData.title}`,
  description: resumeData.professionalSummary,
  keywords: ["Digital Marketing Specialist", "Marketing Automation", "Local SEO", "Technical SEO", "AEO", "GEO", "n8n", "AI Automation", "Lead Generation", "Email Marketing", resumeData.name],
  authors: [{ name: resumeData.name }],
  creator: resumeData.name,
  metadataBase: new URL(url),
  alternates: { canonical: "/" },
  openGraph: { title: `${resumeData.name} — ${resumeData.title}`, description: resumeData.professionalSummary, url, siteName: resumeData.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title: `${resumeData.name} — ${resumeData.title}`, description: resumeData.professionalSummary },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

function JsonLd() {
  const d = { "@context":"https://schema.org","@type":"Person",name:resumeData.name,jobTitle:resumeData.title,email:resumeData.email,telephone:resumeData.phone,url,sameAs:[resumeData.linkedin],address:{"@type":"PostalAddress",addressLocality:"Coimbatore",addressCountry:"IN"},knowsAbout:["Digital Marketing","Marketing Automation","Local SEO","Technical SEO","AEO","GEO","Email Marketing","Lead Generation","AI Automation","n8n"] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground noise`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}