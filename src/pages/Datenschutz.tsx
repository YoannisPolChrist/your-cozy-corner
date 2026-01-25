import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";

const Datenschutz = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
                <header className="mb-12 border-b border-primary/10 pb-8">
                    <h1 className="typ-h1 text-primary mb-4">
                        {t.legal?.datenschutz?.title}
                    </h1>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="typ-h2 text-primary mb-3">{t.legal?.datenschutz?.intro?.title}</h2>
                        <p className="typ-body text-foreground/80 leading-relaxed">{t.legal?.datenschutz?.intro?.content}</p>
                    </section>

                    <section>
                        <h2 className="typ-h2 text-primary mb-3">{t.legal?.datenschutz?.rights?.title}</h2>
                        <p className="typ-body text-foreground/80 leading-relaxed">{t.legal?.datenschutz?.rights?.content}</p>
                    </section>

                    <section className="bg-secondary/50 p-8 rounded-2xl border-l-4 border-primary">
                        <h2 className="typ-h2 text-primary mb-3">{t.legal?.datenschutz?.hosting?.title}</h2>
                        <p className="typ-body text-foreground/80 leading-relaxed whitespace-pre-line">{t.legal?.datenschutz?.hosting?.content}</p>
                    </section>

                    <section>
                        <h2 className="typ-h3 font-bold text-primary mb-2 tracking-tight">{t.legal?.datenschutz?.googleFonts?.title}</h2>
                        <p className="typ-body text-foreground/80 leading-relaxed italic">{t.legal?.datenschutz?.googleFonts?.content}</p>
                    </section>

                    <section>
                        <h2 className="typ-h3 font-bold text-primary mb-2 tracking-tight">{t.legal?.datenschutz?.encryption?.title}</h2>
                        <p className="typ-body text-foreground/80 leading-relaxed">{t.legal?.datenschutz?.encryption?.content}</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Datenschutz;
