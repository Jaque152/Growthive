"use client";

import { useEffect } from "react";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { Grain } from "@/components/site/grain";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CartDrawer />
        <Grain />
        <Toaster />
      </CartProvider>
      
    </LanguageProvider>
    
  );
}
