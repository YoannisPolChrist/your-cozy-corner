import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MapPin, Phone, Mail, Brain, Dumbbell } from "lucide-react";
import { useLanguage } from "@/i18n";

export const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank für Ihre Nachricht. Ich melde mich bald bei Ihnen.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="kontakt" className="py-14 sm:py-20 bg-background overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="typ-h2 text-gold-accent mb-3 sm:mb-4">Kontakt</h2>
            <p className="typ-body text-muted-foreground">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Ich freue mich auf Ihre Nachricht.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
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
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="transition-all focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold-accent hover:bg-gold-accent/90 font-semibold"
                >
                  Nachricht senden
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 sm:p-8 bg-gradient-teal text-white">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">ORT</p>
                      <p>Toulouse</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">TELEFON</p>
                      <a href="tel:+491621709979" className="hover:underline">+49 162 170 9979</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">EMAIL</p>
                      <a href="mailto:contact@johanneschrist.com" className="break-all hover:underline">contact@johanneschrist.com</a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Karte Gestalttherapie */}
              <Card className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-accent/10 flex flex-col transition-shadow duration-200 hover:shadow-2xl">
                <div className="text-center mb-4">
                  <h4 className="font-heading text-[21px] sm:text-xl md:text-2xl text-primary mb-1.5 flex items-center justify-center gap-2">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                    {t.angebot?.formate?.map?.therapie?.title || "Gestalttherapie & Coaching"}
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                    {t.angebot?.formate?.map?.therapie?.description || "Hier finden die Sitzungen in einem sicheren Rahmen statt."}
                  </p>
                  <div className="inline-block px-3 py-1.5 bg-accent/10 text-accent font-medium text-xs sm:text-sm rounded-lg mb-4 break-words">
                    IZICure, 47 Allées Jean Jaurès, 31000 Toulouse
                  </div>
                </div>
                <div className="w-full h-[200px] sm:h-[250px] rounded-xl overflow-hidden shadow-inner border border-accent/20 relative bg-muted/20">
                  <iframe
                    src="https://maps.google.com/maps?q=IZICure,+47+All.+Jean+Jaur%C3%A8s,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="IZICure Location"
                  ></iframe>
                </div>
              </Card>

              {/* Karte Personal Training */}
              <Card className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-accent/10 flex flex-col transition-shadow duration-200 hover:shadow-2xl">
                <div className="text-center mb-4">
                  <h4 className="font-heading text-[21px] sm:text-xl md:text-2xl text-primary mb-1.5 flex items-center justify-center gap-2">
                    <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                    {t.angebot?.formate?.map?.training?.title || "Personal Training"}
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                    {t.angebot?.formate?.map?.training?.description || "Outdoor, im Studio oder bei dir zu Hause."}
                  </p>
                  <div className="inline-block px-3 py-1.5 bg-accent/10 text-accent font-medium text-xs sm:text-sm rounded-lg mb-4 break-words">
                    12 Rue Jean-Palaprat, 31000 Toulouse
                  </div>
                </div>
                <div className="w-full h-[200px] sm:h-[250px] rounded-xl overflow-hidden shadow-inner border border-accent/20 relative bg-muted/20">
                  <iframe
                    src="https://maps.google.com/maps?q=12+Rue+Jean-Palaprat,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Personal Training Location"
                  ></iframe>
                </div>
              </Card>

              <Card className="p-5 sm:p-6 bg-gray-light border-none">
                <p className="typ-body text-muted-foreground">
                  Ich biete Online-Sitzungen und persönliche Termine an.
                  Vereinbaren Sie ein kostenloses 20-minütiges Kennenlerngespräch,
                  um herauszufinden, wie ich Sie unterstützen kann.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
