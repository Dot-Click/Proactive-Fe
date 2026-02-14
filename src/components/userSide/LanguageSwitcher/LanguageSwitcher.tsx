import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const currentLanguage = i18n.language || 'es';
  const languageNames: Record<string, string> = {
    es: 'Español',
    en: 'English',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-black hover:text-white hover:bg-[#000000] rounded-full px-4 py-2 font-semibold transition-all"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden lg:inline text-sm">{languageNames[currentLanguage]}</span>
          <span className="lg:hidden">{currentLanguage.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white min-w-[140px]">
        <DropdownMenuItem
          onClick={() => changeLanguage('es')}
          className={`cursor-pointer ${currentLanguage === 'es' ? 'bg-[#0DAC87]/10 text-[#0DAC87] font-semibold' : ''}`}
        >
          <span className="flex items-center gap-2">
            <span>🇪🇸</span>
            <span>Español</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer ${currentLanguage === 'en' ? 'bg-[#0DAC87]/10 text-[#0DAC87] font-semibold' : ''}`}
        >
          <span className="flex items-center gap-2">
            <span>🇬🇧</span>
            <span>English</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
