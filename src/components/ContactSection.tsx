import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export const ContactSection = () => {
  const { toast } = useToast();
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
    <section id="kontakt" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl text-gold-accent mb-4">Kontakt</h2>
            <p className="text-muted-foreground text-lg">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Ich freue mich auf Ihre Nachricht.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-soft">
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
              <Card className="p-8 bg-gradient-teal text-white">
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
                      <p>+49 162 170 9979</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">EMAIL</p>
                      <p className="break-all">ps.johanenschirst@gmail.com</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gray-light border-none">
                <p className="text-muted-foreground leading-relaxed">
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
