"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Users, 
  BarChart3, 
  HelpCircle,
  LogOut
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

interface SidebarProps {
  role: "employee" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const employeeLinks = [
    { label: "Mes Demandes", href: "/requests", icon: FileText },
    { label: "Nouvelle Demande", href: "/requests/new", icon: PlusCircle },
  ];

  const adminLinks = [
    { label: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
    { label: "Toutes les Demandes", href: "/admin/requests", icon: FileText },
    { label: "Utilisateurs", href: "/admin/users", icon: Users },
  ];

  const links = role === "admin" ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 border-r border-hairline bg-canvas h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-hairline">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          <svg className="w-30" width="414" height="40" viewBox="0 0 414 131" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M413.1 64.4V48H347.3H330V64.4V113.8V130.3H347.3H413.1V113.8H347.3V64.4H413.1Z" fill="#363636"/>
<path d="M312.1 64.4V48H246.4H229V64.4V113.8V130.3H246.4H312.1V113.8H246.4V64.4H312.1Z" fill="#363636"/>
<path d="M139.5 113.8V64.4H205.3V48H139.5H123V64.4V113.8V130.3H139.5H188.8H205.3V113.8V97.3V80.9V80.8H188.8V80.9H155.8V97.3H188.8V113.8H139.5Z" fill="#363636"/>
<path d="M0 30.9V129.5H40.6V63.8H7.7V47.2H90.2V63.8H57.7V129.5H99.3V0L0 30.9Z" fill="#7E1212"/>
</svg>

        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center h-11 gap-3 px-4 py-2 rounded-[2px] text-sm font-semibold transition-colors",
                isActive 
                  ? "bg-primary text-on-primary" 
                  : "text-ink hover:bg-surface-bone"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-hairline space-y-2">
        <Link
          href="/help"
          className="flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold text-charcoal hover:bg-surface-bone transition-colors"
        >
          <HelpCircle size={18} />
          Support
        </Link>
        <SignOutButton>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-full text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            Déconnexion
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
