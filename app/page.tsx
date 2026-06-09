import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <main className="flex-1">
      {/* Navigation */}
      <nav className="h-[60px] bg-canvas px-4 sm:px-6 flex items-center justify-between">
        <div className="font-display text-xl font-bold tracking-tight">
          <svg className="w-24 sm:w-32 h-auto" viewBox="0 0 414 131" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M413.1 64.4V48H347.3H330V64.4V113.8V130.3H347.3H413.1V113.8H347.3V64.4H413.1Z" fill="#363636"/>
            <path d="M312.1 64.4V48H246.4H229V64.4V113.8V130.3H246.4H312.1V113.8H246.4V64.4H312.1Z" fill="#363636"/>
            <path d="M139.5 113.8V64.4H205.3V48H139.5H123V64.4V113.8V130.3H139.5H188.8H205.3V113.8V97.3V80.9V80.8H188.8V80.9H155.8V97.3H188.8V113.8H139.5Z" fill="#363636"/>
            <path d="M0 30.9V129.5H40.6V63.8H7.7V47.2H90.2V63.8H57.7V129.5H99.3V0L0 30.9Z" fill="#7E1212"/>
          </svg>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {!isSignedIn ? (
            <>
              <Link 
                href="/sign-in" 
                className="text-xs sm:text-sm font-semibold text-ink hover:text-charcoal transition-colors"
              >
                Se connecter
              </Link>
              <Link 
                href="/sign-up" 
                className="bg-primary text-on-primary h-8 sm:h-9 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold flex items-center hover:bg-primary-deep transition-colors"
              >
                Créer un compte
              </Link>
            </>
          ) : (
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8 sm:h-9 sm:w-9 rounded-full",
                  userButtonTrigger: "rounded-full border border-hairline p-0.5",
                }
              }}
            />
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-hero-warm/5 py-16 sm:py-24 px-4 sm:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-hero-warm mb-6 max-w-5xl leading-tight">
          Portail de Services Interne TGCC
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-sans max-w-3xl mb-12 px-4 sm:px-0">
          Centralisez vos demandes, signalez vos incidents et suivez leur traitement en temps réel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link 
            href={isSignedIn ? "/requests" : "/sign-up"} 
            className="bg-surface-card text-ink h-11 px-8 rounded-full text-base font-semibold flex items-center justify-center hover:bg-surface-bone transition-colors w-full sm:w-auto"
          >
            Créer une demande
          </Link>
          {!isSignedIn && (
            <Link 
              href="/sign-in"
              className="border bg-primary border-on-dark text-on-dark h-11 px-8 rounded-full text-base font-semibold flex items-center justify-center transition-colors w-full sm:w-auto"
            >
              Se connecter
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-canvas py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 bg-hero-warm text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-3">Gestion des Demandes</h3>
            <p className="opacity-80 text-sm">Créez et suivez vos demandes facilement.</p>
          </div>
          <div className="p-6 sm:p-8 bg-hero-warm text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-3">Signalement d&apos;Incidents</h3>
            <p className="opacity-80 text-sm">Déclarez rapidement tout problème ou incident.</p>
          </div>
          <div className="p-6 sm:p-8 bg-hero-warm text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-3">Suivi en Temps Réel</h3>
            <p className="opacity-80 text-sm">Consultez l&apos;état d&apos;avancement de vos demandes.</p>
          </div>
          <div className="p-6 sm:p-8 bg-hero-warm text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-3">Notifications</h3>
            <p className="opacity-80 text-sm">Recevez des mises à jour automatiques.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-surface-dark text-on-dark py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-display font-bold mb-2">450+</div>
            <div className="text-on-dark-mute text-xs sm:text-sm uppercase tracking-widest font-semibold">Demandes traitées</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-display font-bold mb-2">&lt; 2h</div>
            <div className="text-on-dark-mute text-xs sm:text-sm uppercase tracking-widest font-semibold">Temps de réponse</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-display font-bold mb-2">98%</div>
            <div className="text-on-dark-mute text-xs sm:text-sm uppercase tracking-widest font-semibold">Taux de résolution</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-display font-bold mb-2">1.2k</div>
            <div className="text-on-dark-mute text-xs sm:text-sm uppercase tracking-widest font-semibold">Utilisateurs actifs</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-dark text-on-dark py-12 px-4 sm:px-8 border-t border-divider-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display text-xl font-bold tracking-tight text-on-dark text-center md:text-left">HELPDESK TGCC</div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-on-dark-mute text-center">
            <Link href="#" className="hover:text-on-dark transition-colors">Contact Support</Link>
            <Link href="#" className="hover:text-on-dark transition-colors">Conditions d&apos;utilisation</Link>
            <Link href="#" className="hover:text-on-dark transition-colors">Politique de confidentialité</Link>
          </div>
          <div className="text-sm text-stone">Version 1.0.0</div>
        </div>
      </footer>
    </main>
  );
}
