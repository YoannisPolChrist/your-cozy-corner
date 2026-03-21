import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Phone, Mail, Clock, Brain, Dumbbell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { fadeUp, staggerContainer, cardStagger, cardItem, viewportSettings } from "@/lib/animations";
import { useLanguage } from "@/i18n";
import { SEO } from "@/components/SEO";
import {
  buildContactPrefill,
  getLocalizedSubjectLabel,
  isContactSubjectId,
  submitContactForm,
} from "@/lib/contact";
import { fieldOrder, type ContactField, type ContactValidationErrorMap, validateContactForm } from "@/lib/contactSchema";
import { useCallback, useRef } from "react";
import { scrollNodeIntoView } from "@/lib/scroll";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const Kontakt = () => {
  const { t, language, getLocalizedPath } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [lastPrefill, setLastPrefill] = useState("");
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const fieldRefs = useRef<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>({
    name: null,
    email: null,
    phone: null,
    message: null,
    website: null,
  });

  const homeLabel = t.nav.home || (t.shared?.homeLabel ?? "Home");
  const subjectId = useMemo(() => {
    const subject = new URLSearchParams(location.search).get("subject");
    return isContactSubjectId(subject) ? subject : null;
  }, [location.search]);

  useEffect(() => {
    if (!subjectId) {
      setLastPrefill("");
      return;
    }

    const nextPrefill = buildContactPrefill(t, subjectId);
    if (nextPrefill === lastPrefill) {
      return;
    }

    setFormData((current) => {
      const shouldReplace = !current.message || current.message === lastPrefill;
      return shouldReplace ? { ...current, message: nextPrefill } : current;
    });
    setLastPrefill(nextPrefill);
  }, [lastPrefill, subjectId, t]);

  const inlineErrorMessages = t.kontakt.form.inlineErrors || {};

  const resolveInlineError = useCallback(
    (key?: string) => {
      if (!key) {
        return inlineErrorMessages.generic || "";
      }
      return inlineErrorMessages[key as keyof typeof inlineErrorMessages] || inlineErrorMessages.generic || "";
    },
    [inlineErrorMessages],
  );

  const focusFirstError = useCallback((errorMap: Partial<Record<ContactField, string>>) => {
    for (const field of fieldOrder) {
      if (errorMap[field]) {
        const node = fieldRefs.current[field];
        if (node) {
          node.focus();
          scrollNodeIntoView(node, { block: "center" });
        }
        break;
      }
    }
  }, []);

  const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field as ContactField]) {
      setErrors((current) => {
        const next = { ...current };
        next[field as ContactField] = undefined;
        return next;
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const validationInput = {
      ...formData,
      language,
      sourcePage: location.pathname,
      subject: subjectId ? getLocalizedSubjectLabel(t, subjectId) : undefined,
    };

    const validation = validateContactForm(validationInput);
    if (!validation.success) {
      const localizedErrors = Object.entries(validation.errors).reduce((acc, [field, code]) => {
        acc[field as ContactField] = resolveInlineError(code);
        return acc;
      }, {} as Partial<Record<ContactField, string>>);
      setErrors(localizedErrors);
      focusFirstError(localizedErrors);
      setStatus("idle");
      return;
    }

    try {
      await submitContactForm(validation.data);

      toast({
        title: t.kontakt.form.successTitle,
        description: t.kontakt.form.successMessage,
      });

      const resetPrefill = subjectId ? buildContactPrefill(t, subjectId) : "";
      setLastPrefill(resetPrefill);
      setFormData({ ...initialFormData, message: resetPrefill });
      setErrors({});
    } catch (error) {
      const errorCode = typeof error === "object" && error && "code" in error ? String(error.code) : "";
      const errorField = typeof error === "object" && error && "field" in error ? String(error.field) : "";

      if (errorField) {
        const mappedField = errorField as ContactField;
        const inlineMessage = resolveInlineError();
        const nextErrors: Partial<Record<ContactField, string>> = { [mappedField]: inlineMessage };
        setErrors((current) => ({ ...current, ...nextErrors }));
        focusFirstError(nextErrors);
      }

      const errorMessage =
        errorCode === "invalid-payload"
          ? t.kontakt.form.errors.invalidPayload
          : errorCode === "email-send-failed"
            ? t.kontakt.form.errors.emailSendFailed
            : errorCode === "missing-config"
              ? t.kontakt.form.errors.missingConfig
              : t.kontakt.form.errors.generic;

      toast({
        title: t.kontakt.form.errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <SEO
        title={t.seo?.kontakt.title}
        description={t.seo?.kontakt.description}
        keywords={t.seo?.kontakt.keywords}
        breadcrumbs={[
          { name: homeLabel, url: `/${language}` },
          { name: t.nav.kontakt, url: getLocalizedPath("/kontakt") },
        ]}
        dateModified="2026-03-13"
      />
      <Navigation />
      <main id="main-content" className="pt-20">
        <motion.section initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="pt-20 pb-8 bg-off-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-6xl mb-6 text-primary">{t.kontakt.hero.title}</motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">{t.kontakt.hero.subtitle}</motion.p>
            </div>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="pt-8 pb-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8">
                <motion.div variants={cardStagger} className="space-y-6">
                  <motion.div variants={cardItem}>
                    <Card className="p-8 shadow-soft">
                      <h2 className="typ-h3 mb-6 text-primary">{t.kontakt.form.title}</h2>
                      <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "submitting"} noValidate>
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.kontakt.form.name}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange("name")}
                            required
                            ref={(node) => {
                              fieldRefs.current.name = node;
                            }}
                            autoComplete="name"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "contact-name-error" : undefined}
                            className="transition-all focus:ring-2 focus:ring-primary"
                          />
                          {errors.name && (
                            <p id="contact-name-error" className="text-sm text-destructive" role="alert">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.kontakt.form.email}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange("email")}
                            required
                            ref={(node) => {
                              fieldRefs.current.email = node;
                            }}
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "contact-email-error" : undefined}
                            className="transition-all focus:ring-2 focus:ring-primary"
                          />
                          {errors.email && (
                            <p id="contact-email-error" className="text-sm text-destructive" role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.kontakt.form.phone}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange("phone")}
                            ref={(node) => {
                              fieldRefs.current.phone = node;
                            }}
                            autoComplete="tel"
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                            className="transition-all focus:ring-2 focus:ring-primary"
                          />
                          {errors.phone && (
                            <p id="contact-phone-error" className="text-sm text-destructive" role="alert">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2 sr-only" aria-hidden="true">
                          <Label htmlFor="website">{t.kontakt.form.honeypot}</Label>
                          <Input
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange("website")}
                            autoComplete="off"
                            tabIndex={-1}
                            ref={(node) => {
                              fieldRefs.current.website = node;
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">{t.kontakt.form.message}</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange("message")}
                            required
                            rows={5}
                            placeholder={t.kontakt.form.messagePlaceholder}
                            ref={(node) => {
                              fieldRefs.current.message = node;
                            }}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? "contact-message-error" : undefined}
                            className="transition-all focus:ring-2 focus:ring-primary resize-none"
                          />
                          {errors.message && (
                            <p id="contact-message-error" className="text-sm text-destructive" role="alert">
                              {errors.message}
                            </p>
                          )}
                        </div>
                        <Button type="submit" variant="gold" size="lg" className="w-full font-semibold" disabled={status === "submitting"}>
                          {status === "submitting" ? t.kontakt.form.submitting : t.kontakt.form.submit}
                        </Button>
                      </form>
                    </Card>
                  </motion.div>
                  <motion.div variants={cardItem} className="flex flex-col gap-6">
                    <Card className="p-6 bg-primary border-none shadow-soft text-white transition-all hover:shadow-xl hover:-translate-y-1">
                      <h3 className="font-heading text-lg mb-3 text-white">{t.kontakt.erstgespraech.title}</h3>
                      <p className="text-white/90 leading-relaxed">{t.kontakt.erstgespraech.description}</p>
                    </Card>
                    <Card className="p-6 bg-primary border-none shadow-soft text-white transition-all hover:shadow-xl hover:-translate-y-1">
                      <h3 className="font-heading text-lg mb-3 text-white">{t.kontakt.online.title}</h3>
                      <p className="text-white/90 leading-relaxed">{t.kontakt.online.description}</p>
                    </Card>
                  </motion.div>
                </motion.div>

                <motion.div variants={cardStagger} className="space-y-6">
                  <motion.div variants={cardItem}>
                    <Card className="p-8 bg-gradient-teal text-white">
                      <h2 className="font-heading text-2xl mb-6">{t.kontakt.info.title}</h2>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-6 h-6 flex-shrink-0 mt-1" aria-hidden="true" />
                          <div>
                            <p className="font-semibold mb-1">{t.kontakt.info.standort}</p>
                            <p>{t.kontakt.info.locationValue}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Phone className="w-6 h-6 flex-shrink-0 mt-1" aria-hidden="true" />
                          <div>
                            <p className="font-semibold mb-1">{t.kontakt.info.telefon}</p>
                            <a href="tel:+491621709979" className="hover:underline">+49 162 170 9979</a>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Mail className="w-6 h-6 flex-shrink-0 mt-1" aria-hidden="true" />
                          <div>
                            <p className="font-semibold mb-1">{t.kontakt.info.email}</p>
                            <a href="mailto:contact@johanneschrist.com" className="break-all hover:underline">contact@johanneschrist.com</a>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Clock className="w-6 h-6 flex-shrink-0 mt-1" aria-hidden="true" />
                          <div>
                            <p className="font-semibold mb-1">{t.kontakt.info.erreichbarkeit}</p>
                            <p>{t.kontakt.info.erreichbarkeitZeiten}</p>
                            <p className="text-white/80 text-sm">{t.kontakt.info.erreichbarkeitTermine}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                  <motion.div variants={cardItem}>
                    <Card className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-accent/10">
                      <div className="text-center mb-4">
                        <h4 className="font-heading text-xl text-primary mb-1.5 flex items-center justify-center gap-2"><Brain className="w-5 h-5 text-accent" aria-hidden="true" />{t.angebot.formate.map.therapie.title}</h4>
                        <div className="inline-block px-3 py-1.5 bg-accent/10 text-accent font-medium text-xs rounded-lg mb-4">{t.gestalttherapie.location?.description}</div>
                      </div>
                      <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-inner border border-accent/20">
                        <iframe src="https://maps.google.com/maps?q=IZICure,+47+All.+Jean+Jaur%C3%A8s,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t.ui.therapyMapTitle} />
                      </div>
                    </Card>
                  </motion.div>
                  <motion.div variants={cardItem}>
                    <Card className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-accent/10">
                      <div className="text-center mb-4">
                        <h4 className="font-heading text-xl text-primary mb-1.5 flex items-center justify-center gap-2"><Dumbbell className="w-5 h-5 text-accent" aria-hidden="true" />{t.angebot.formate.map.training.title}</h4>
                        <div className="inline-block px-3 py-1.5 bg-accent/10 text-accent font-medium text-xs rounded-lg mb-4">{t.personalTraining.location.city}</div>
                      </div>
                      <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-inner border border-accent/20">
                        <iframe src="https://maps.google.com/maps?q=12+Rue+Jean-Palaprat,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t.ui.trainingMapTitle} />
                      </div>
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
