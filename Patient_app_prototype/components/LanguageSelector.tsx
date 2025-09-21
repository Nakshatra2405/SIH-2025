import React from 'react';
import { useLanguage, Language } from './LanguageContext';
import { Button } from './ui/button';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className="text-sm px-3 py-2"
        >
          {lang.nativeName}
        </Button>
      ))}
    </div>
  );
}