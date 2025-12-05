import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import conversationWindow from "@/assets/conversation-window.jpg";
import johannesLaughing from "@/assets/johannes-laughing.png";
import { Footer } from "@/components/Footer";
import { 
  fadeUp, 
  staggerContainer, 
  goldFrameVariants, 
  imageVariants,
  iconStagger,
  iconItem,
  viewportSettings,
  cinematicEase
} from "@/lib/animations";

const UeberMich = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Section 1: Hero - White Background */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportSettings}
          variants={staggerContainer} 
          className="py-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Image with Gold Frame - Cinematic Parallax */}
                <motion.div className="relative">
                  {/* Gold Frame - Slides out from behind with delay */}
                  <motion.div 
                    variants={goldFrameVariants}
                    className="absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] w-full h-full bg-[#c5a065] rounded-2xl" 
                  />
                  {/* Main Image */}
                  <motion.div 
                    variants={imageVariants}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img 
                      alt="Johannes Christ - Gestalttherapeut" 
                      className="w-full h-full object-scale-down" 
                      src="/lovable-uploads/344b749b-e6b8-4454-94e0-5ad41901e13b.jpg" 
                    />
                  </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div variants={staggerContainer} className="space-y-6 order-first md:order-last">
                  <motion.span 
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    JOHANNES CHRIST — M.SC. PSYCHOLOGIE (i.A.)
                  </motion.span>
                  <motion.h1 
                    variants={fadeUp}
                    className="font-heading text-[calc(2.25rem+3px)] md:text-[calc(3rem+3px)] text-primary leading-tight"
                  >
                    Fundiert durch Wissenschaft. Geerdet durch Erfahrung.
                  </motion.h1>
                  <motion.div 
                    variants={fadeUp}
                    className="space-y-4 text-muted-foreground leading-relaxed"
                  >
                    <p>
                      Hi, ich bin Johannes. Mein Weg begann in der Bewegungswissenschaft (B.A.), wo ich lernte, 
                      wie der Körper funktioniert. Doch echte Veränderung braucht mehr als Trainingspläne. 
                      Seit 2018 vertiefe ich mein Wissen in Gestalttherapie.
                    </p>
                    <p>
                      Aktuell verbinde ich diese Welten in meinem Masterstudium der Angewandten Psychologie 
                      (M.Sc. i.A.). Ich biete keine Schablonen, sondern fundierte Begleitung auf Augenhöhe.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Process - Deep Teal Background */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportSettings}
          variants={staggerContainer} 
          className="py-32 bg-primary"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Text Content */}
                <motion.div variants={staggerContainer} className="space-y-6 order-2 md:order-1">
                  <motion.span 
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    MEINE ARBEITSWEISE
                  </motion.span>
                  <motion.h2 
                    variants={fadeUp}
                    className="font-heading text-[calc(1.875rem+3px)] md:text-[calc(2.25rem+3px)] text-white leading-tight"
                  >
                    Raum für das, was ist.
                  </motion.h2>
                  <motion.div 
                    variants={fadeUp}
                    className="space-y-4 text-white/90 leading-relaxed"
                  >
                    <p>
                      In über 40 intensiven Einzelprozessen durfte ich erleben, was passiert, wenn wir dem 
                      Körper und den Emotionen gleichermaßen Raum geben. Ob früher als Trainer oder heute 
                      als Coach und Berater: Ich bin dein Sparringspartner.
                    </p>
                    <p>
                      Ich halte den Raum, gebe Struktur und stelle die Fragen, die dich wirklich weiterbringen.
                    </p>
                  </motion.div>
                  
                  {/* Gold Icons with Staggered Animation */}
                  <motion.div 
                    variants={iconStagger} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-6 pt-6"
                  >
                    <motion.div variants={iconItem} className="text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-[#c5a065]/30 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-[#c5a065]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white">Körper</span>
                    </motion.div>
                    <motion.div variants={iconItem} className="text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-[#c5a065]/30 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-[#c5a065]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white">Psyche</span>
                    </motion.div>
                    <motion.div variants={iconItem} className="text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full border border-[#c5a065]/30 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-[#c5a065]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white">Resonanz</span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Image with Gold Frame - Cinematic Parallax */}
                <motion.div className="order-1 md:order-2 relative">
                  {/* Gold Frame - Slides out from behind with delay */}
                  <motion.div 
                    variants={goldFrameVariants}
                    className="absolute bottom-[10px] left-[10px] md:bottom-[20px] md:left-[20px] w-full h-full bg-[#c5a065] rounded-2xl" 
                  />
                  {/* Main Image */}
                  <motion.div 
                    variants={imageVariants}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img 
                      src={conversationWindow} 
                      alt="Therapeutische Arbeit" 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Personal - Off-White Background */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportSettings}
          variants={staggerContainer} 
          className="py-32 bg-[#f9f9f7]"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8">
                <motion.h2 
                  variants={fadeUp}
                  className="font-heading text-[calc(1.875rem+3px)] md:text-[calc(2.25rem+3px)] text-primary"
                >
                  Und sonst so?
                </motion.h2>
                
                {/* Circular Image with Gold Frame - Cinematic Parallax */}
                <motion.div className="relative mx-auto w-48 h-48 md:w-64 md:h-64">
                  {/* Gold Frame - Slides out with delay */}
                  <motion.div 
                    variants={goldFrameVariants}
                    className="absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] w-full h-full bg-[#c5a065] rounded-full" 
                  />
                  {/* Main Image */}
                  <motion.div 
                    variants={imageVariants}
                    className="relative w-full h-full rounded-full overflow-hidden shadow-xl"
                  >
                    <img 
                      src={johannesLaughing} 
                      alt="Johannes Christ lachend" 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                </motion.div>

                <motion.div 
                  variants={fadeUp}
                  className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed"
                >
                  <p>
                    Wer mich kennt, weiß: Ich nehme meine Arbeit ernst, aber mich selbst nicht zu sehr. 
                    Ich glaube an die Kraft von Humor, Leichtigkeit und echten Begegnungen.
                  </p>
                  <p>
                    Abseits der Therapie findest du mich beim Wandern in den Bergen, beim Kochen mit 
                    Freunden oder versunken in ein gutes Buch. Ich bin überzeugt, dass ein erfülltes 
                    Leben aus vielen kleinen Momenten der Verbundenheit besteht – mit uns selbst und 
                    mit anderen.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportSettings}
          variants={staggerContainer} 
          className="py-20 relative overflow-hidden"
        >
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-teal" />
          <div 
            className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full opacity-20" 
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary-light)) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)'
            }} 
          />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2 
              variants={fadeUp}
              className="font-heading text-3xl md:text-4xl mb-6 text-white"
            >
              Neugierig geworden?
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
            >
              In einem kostenlosen Erstgespräch können wir herausfinden, 
              ob die Chemie stimmt und wie ich dich am besten unterstützen kann.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/kontakt">
                <Button 
                  size="lg" 
                  className="bg-[#c5a065] hover:bg-[#c5a065]/90 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default UeberMich;
