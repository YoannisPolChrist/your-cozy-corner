import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import coachingImg from "@/assets/johannes-coaching-new.webp";
import { useLanguage } from "@/i18n";
import { Link } from "react-router-dom";

export const AboutSection = () => {
  const { t, getLocalizedPath } = useLanguage();

  return (
    <section id="uebermich" className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={coachingImg}
                  alt="Portrait Johannes Christ Coaching und Therapie in Toulouse"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="typ-h2 mb-6 text-primary">
                {t.landingAbout.title}
              </h2>

              <p className="typ-lead text-muted-foreground italic mb-8">
                {t.landingAbout.description}
              </p>

              <Card className="p-6 bg-background mb-8">
                <p className="typ-body text-foreground">
                  {t.landingAbout.cardText}
                </p>
              </Card>

              <Link to={getLocalizedPath('/ueber-mich')}>
                <Button variant="gold" className="font-semibold">
                  {t.landingAbout.button} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
