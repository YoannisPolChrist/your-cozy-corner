import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";

const Impressum = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
                <header className="mb-12 border-b border-primary/10 pb-8">
                    <h1 className="typ-h1 text-primary mb-4">{t.legal?.impressum?.title}</h1>
                </header>
                <div className="space-y-12">
                    <section>
                        <h2 className="typ-h2 text-primary mb-4">{t.legal?.impressum?.angaben?.title}</h2>
                        <div className="typ-body text-foreground/80 space-y-1">
                            <p className="font-semibold">{t.legal?.impressum?.angaben?.name}</p>
                            <p>{t.legal?.impressum?.angaben?.address}</p>
                            {t.legal?.impressum?.angaben?.businessId && (<p className="text-accent mt-2">{t.legal?.impressum?.angaben?.businessId}</p>)}
                        </div>
                    </section>
                    <section>
                        <h3 className="typ-h4 font-bold text-primary mb-3 uppercase tracking-wider">{t.legal?.impressum?.angaben?.contact}</h3>
                        <div className="typ-body text-foreground/80 space-y-1">
                            <a href="tel:+491621709979" className="block hover:text-primary transition-colors">{t.legal?.impressum?.angaben?.phone}</a>
                            <a href="mailto:contact@johanneschrist.com" className="block hover:text-primary transition-colors">{t.legal?.impressum?.angaben?.email}</a>
                        </div>
                    </section>
                    <section className="bg-secondary/50 p-6 rounded-2xl border-l-4 border-accent">
                        <h3 className="typ-h4 font-bold text-primary mb-2">{t.legal?.impressum?.publication?.title}</h3>
                        <p className="typ-body text-foreground/80">{t.legal?.impressum?.publication?.name}</p>
                    </section>
                    <section>
                        <h3 className="typ-h4 font-bold text-primary mb-3">{t.legal?.impressum?.dispute?.title}</h3>
                        <p className="typ-body text-foreground/80 leading-relaxed">{t.legal?.impressum?.dispute?.content}</p>
                    </section>
                    <section>
                        <h3 className="typ-h4 font-bold text-primary mb-3">{t.legal?.impressum?.disclaimer?.title}</h3>
                        <p className="typ-small text-foreground/70 leading-relaxed whitespace-pre-line">{t.legal?.impressum?.disclaimer?.content}</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default Impressum;
