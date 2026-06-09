import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import "./globals.css";
export const viewport: Viewport = {
  themeColor: '#4b0404',
}
 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helpdesk TGCC",
  description: "Portail de Services Interne TGCC",
  icons:'/icon/logo.svg' ,
  openGraph:{
    images:'/icon/opengraph.png',
    title:'Helpdesk TGCC.',
    description:'Pour vos demandes informatiques, veuillez utiliser le Helpdesk TGCC.'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        
        variables: {
          colorPrimary: "#7e1212",
          colorText: "#202020",
          colorTextSecondary: "#646464",
          borderRadius: "0.75rem",
        },
        
      }}
    >
      <html
        lang="fr"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-canvas/30 text-ink selection:bg-primary/30">
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
