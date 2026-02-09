import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#221E33] mb-6">{t('pages.privacy.title')}</h1>
      <p className="text-[#565070] leading-relaxed">
        {t('pages.privacy.content')}
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
