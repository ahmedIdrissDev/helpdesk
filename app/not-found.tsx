"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas/30 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center blur-3xl opacity-20">
            <div className="h-32 w-32 bg-primary rounded-full" />
          </div>
          <div className="relative flex justify-center">
            <div className="h-24 w-24 rounded-full bg-white border border-hairline flex items-center justify-center shadow-sm">
              <FileQuestion className="h-12 w-12 text-primary" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-display font-bold text-ink">404</h1>
          <h2 className="text-2xl font-display font-semibold text-charcoal">Page non trouvée</h2>
          <p className="text-mute max-w-xs mx-auto">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
          </Button>
          <Button asChild className="w-full sm:w-auto gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        <div className="pt-12">
          <Link href="/" className="font-display text-xl font-bold tracking-tight opacity-50 grayscale hover:grayscale-0 transition-all">
            <svg className="w-24 mx-auto" width="414" height="40" viewBox="0 0 414 131" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M413.1 64.4V48H347.3H330V64.4V113.8V130.3H347.3H413.1V113.8H347.3V64.4H413.1Z" fill="#363636"/>
              <path d="M312.1 64.4V48H246.4H229V64.4V113.8V130.3H246.4H312.1V113.8H246.4V64.4H312.1Z" fill="#363636"/>
              <path d="M139.5 113.8V64.4H205.3V48H139.5H123V64.4V113.8V130.3H139.5H188.8H205.3V113.8V97.3V80.9V80.8H188.8V80.9H155.8V97.3H188.8V113.8H139.5Z" fill="#363636"/>
              <path d="M0 30.9V129.5H40.6V63.8H7.7V47.2H90.2V63.8H57.7V129.5H99.3V0L0 30.9Z" fill="#7E1212"/>
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
