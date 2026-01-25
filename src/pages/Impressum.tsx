import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";

const Impressum = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-24 pb-16 container mx-auto px-4">
                <h1 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                    {t.legal?.impressum?.title}
                </h1>

                <div className="prose prose-lg max-w-none text-foreground/80">
                    <h2 className="text-xl font-bold text-primary mb-4">{t.legal?.impressum?.angaben?.title}</h2>
                    <p className="mb-6">
                        {t.legal?.impressum?.angaben?.name}<br />
                        {t.legal?.impressum?.angaben?.address}
                    </p>

                    <h3 className="text-lg font-semibold text-primary mb-2">{t.legal?.impressum?.angaben?.contact}</h3>
                    <p className="mb-8">
                        {t.legal?.impressum?.angaben?.phone}<br />
                        {t.legal?.impressum?.angaben?.email}
                    </p>

                    <h3 className="text-lg font-semibold text-primary mb-2">{t.legal?.impressum?.disclaimer?.title}</h3>
                    <p className="whitespace-pre-line">
                        {t.legal?.impressum?.disclaimer?.content}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Impressum;
