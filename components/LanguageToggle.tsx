'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हि', full: 'Hindi' },
  { code: 'ta', label: 'த', full: 'Tamil' },
  { code: 'te', label: 'తె', full: 'Telugu' },
  { code: 'bn', label: 'বাং', full: 'Bengali' },
];

export default function LanguageToggle() {
  const [active, setActive] = useState('en');

  const translateTo = (code: string) => {
    setActive(code);
    
    // Wait for widget to be ready
    const tryTranslate = () => {
      const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
      } else {
        setTimeout(tryTranslate, 500);
      }
    };
    tryTranslate();
  };

  return (
    <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1">
        <Globe className="h-3.5 w-3.5 text-slate-400 ml-1" />
        {languages.map((lang) => (
        <button
            key={lang.code}
            onClick={() => translateTo(lang.code)}
            title={lang.full}
            className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
            active === lang.code
                ? 'bg-blue-600 text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
        >
            {lang.label}
        </button>
        ))}
    </div>
    );
}