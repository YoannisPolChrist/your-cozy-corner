import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import johannesProfile from "@/assets/johannes-profile.png";

export const Hero = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Portrait Column - First on mobile */}
      <div className="lg:w-1/2 h-[60vh] lg:h-screen order-first">
        <img
          src={johannesProfile}
          alt="Johannes - Gestalttherapie & Coaching"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Text Column */}
      <div className="lg:w-1/2 bg-primary flex items-center order-last">
        <div className="px-8 py-16 md:px-12 lg:px-16 xl:px-24 max-w-xl mx-auto lg:mx-0">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6 leading-tight">
            Veränderung beginnt im{" "}
            <span className="italic">Hier und Jetzt</span>
          </h1>
          
          <p className="text-primary-foreground/85 text-lg md:text-xl mb-10 leading-relaxed">
            Begleitung auf Ihrem Weg zu mehr Klarheit und Erfüllung – 
            durch humanistische Gestalttherapie und modernes Coaching.
          </p>

          <Link to="/kontakt" onClick={scrollToTop}>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-6 text-base"
            >
              Kennenlerngespräch vereinbaren
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
