import type { Metadata } from "next"
import { sans, mono, serif } from "./fonts"
import { cn } from "@/lib/utils"
import "./globals.css"
import Template from "./template"
import { SanityLive } from "@/sanity/lib/live"
import { PreviewBar } from "@/components/preview-bar"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AppProvider } from '@/context/app'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Wiggelrhum",
  description: "Wiggelrhum",
}

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled } = await draftMode()

  return (
    <div className={cn(sans.variable, mono.variable, serif.variable, "min-h-screen antialiased bg-background text-foreground font-sans", isEnabled && "body-preview-mode")}>
        <AppProvider>
          {isEnabled && <PreviewBar />}
          <Header />
          <Template>
            {children}
            <SanityLive />
            {isEnabled && <VisualEditing zIndex={999999} />}
          </Template>
          <Footer />
        </AppProvider>
    </div>
  )
}
