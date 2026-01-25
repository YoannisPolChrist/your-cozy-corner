import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";

const Datenschutz = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-24 pb-16 container mx-auto px-4">
                <h1 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                    {t.legal?.datenschutz?.title}
                </h1>

                <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">

                    <section>
                        <h2 className="text-xl font-bold text-primary mb-2">{t.legal?.datenschutz?.intro?.title}</h2>
                        <p>{t.legal?.datenschutz?.intro?.content}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-primary mb-2">{t.legal?.datenschutz?.rights?.title}</h2>
                        <p>{t.legal?.datenschutz?.rights?.content}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-primary mb-2">{t.legal?.datenschutz?.hosting?.title}</h2>
                        <p>{t.legal?.datenschutz?.hosting?.content}</p>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Datenschutz;
