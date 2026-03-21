import { useLanguage } from "@/i18n";

interface SkipToContentProps {
  targetId?: string;
}

export const SkipToContent = ({ targetId = "main-content" }: SkipToContentProps) => {
  const { t } = useLanguage();
  return (
    <a className="skip-to-content" href={`#${targetId}`}>
      {t.ui.skipToContent}
    </a>
  );
};
