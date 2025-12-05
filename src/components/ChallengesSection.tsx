import { Card } from "@/components/ui/card";
import { Heart, Brain, Compass } from "lucide-react";

const challenges = [
  {
    icon: Heart,
    title: "Psychosomatische Signale",
    description: "Wenn Stress, Heimweh oder Überforderung sich durch körperliche Symptome wie Verspannungen, Schlafstörungen oder Unruhe bemerkbar machen.",
  },
  {
    icon: Brain,
    title: "Emotionale Isolation",
    description: "Das Gefühl, trotz Menschen um sich herum innerlich allein zu sein. Sprachbarrieren und kulturelle Unterschiede können einsam machen.",
  },
  {
    icon: Compass,
    title: "Orientierung & Identität",
    description: "Wer bin ich hier? Die Frage nach dem eigenen Platz und der beruflichen oder persönlichen Rolle in der neuen Umgebung.",
  },
];

export const ChallengesSection = () => {
  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-6 text-primary">
            Was belastet Sie?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Das Leben im Ausland bringt besondere Herausforderungen mit sich. Oft zeigen sich 
            seelische Belastungen auch körperlich. Erkennen Sie sich hier wieder?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-card border-none shadow-soft hover:shadow-teal transition-all duration-300 animate-fade-in opacity-0 [animation-fill-mode:forwards] hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-primary">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
