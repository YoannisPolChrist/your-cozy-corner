import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { 
  fadeUp, 
  staggerContainer, 
  cardStagger,
  cardItem,
  viewportSettings 
} from "@/lib/animations";

const Kontakt = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-20 bg-gradient-to-b from-gray-light to-background"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                variants={fadeUp}
                className="font-heading text-4xl md:text-6xl mb-6 text-primary"
              >
                Kontakt
              </motion.h1>
              <motion.p 
                variants={fadeUp}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
                Ich freue mich auf Ihre Nachricht.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-20 bg-background"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                variants={cardStagger}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Contact Form */}
                <motion.div variants={cardItem}>
                  <Card className="p-8 shadow-soft">
                    <h2 className="font-heading text-2xl mb-6 text-primary">
                      Schreiben Sie mir
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="transition-all focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="transition-all focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon (optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="transition-all focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Ihre Nachricht *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={5}
                          placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                          className="transition-all focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        className="w-full font-semibold"
                      >
                        Nachricht senden
                      </Button>
                    </form>
                  </Card>
                </motion.div>

                {/* Contact Info */}
                <motion.div variants={cardStagger} className="space-y-6">
                  <motion.div variants={cardItem}>
                    <Card className="p-8 bg-gradient-teal text-white">
                      <h2 className="font-heading text-2xl mb-6">Kontaktdaten</h2>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold mb-1">Standort</p>
                            <p>Toulouse, Frankreich</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold mb-1">Telefon</p>
                            <p>+49 162 170 9979</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold mb-1">E-Mail</p>
                            <p className="break-all">ps.johanneschrist@gmail.com</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold mb-1">Erreichbarkeit</p>
                            <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
                            <p className="text-white/80 text-sm">Termine nach Vereinbarung</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardItem}>
                    <Card className="p-6 bg-gray-light border-none">
                      <h3 className="font-heading text-lg mb-3 text-primary">
                        Kostenloses Erstgespräch
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Ich biete ein kostenloses 20-minütiges Kennenlerngespräch an, 
                        in dem wir gemeinsam schauen können, ob und wie ich Sie unterstützen kann. 
                        Melden Sie sich gerne!
                      </p>
                    </Card>
                  </motion.div>

                  <motion.div variants={cardItem}>
                    <Card className="p-6 bg-gray-light border-none">
                      <h3 className="font-heading text-lg mb-3 text-primary">
                        Online-Sitzungen
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Alle Sitzungen können auch online per Video stattfinden – 
                        ideal für Menschen im Ausland oder mit wenig Zeit.
                      </p>
                    </Card>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Kontakt;
