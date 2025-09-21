import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Heart, Shield, Stethoscope, Baby } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface HealthcarePoliciesPageProps {
  onBack: () => void;
  onApplyScheme: (schemeId: number) => void;
}

const healthSchemes = [
  {
    id: 1,
    icon: Heart,
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    titleHi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
    titleMl: 'ആയുഷ്മാൻ ഭാരത് പ്രധാനമന്ത്രി ജൻ ആരോഗ്യ യോജന',
    description: 'Free healthcare coverage up to ₹5 lakh per family per year',
    descriptionHi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त स्वास्थ्य कवरेज',
    descriptionMl: 'പ്രതി കുടുംബത്തിന് പ്രതിവർഷം ₹5 ലക്ഷം വരെ സൗജന്യ ആരോഗ്യ കവറേജ്',
    howToApply: 'Visit nearest Common Service Center (CSC) with Aadhaar card, ration card, and mobile number',
    howToApplyHi: 'आधार कार्ड, राशन कार्ड और मोबाइल नंबर के साथ निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं',
    howToApplyMl: 'ആധാർ കാർഡ്, റേഷൻ കാർഡ്, മൊബൈൽ നമ്പർ എന്നിവയുമായി അടുത്തുള്ള കോമൺ സർവീസ് സെന്റർ (CSC) സന്ദർശിക്കുക',
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 2,
    icon: Shield,
    title: 'Kerala State Health Insurance Scheme',
    titleHi: 'केरल राज्य स्वास्थ्य बीमा योजना',
    titleMl: 'കേരള സംസ്ഥാന ആരോഗ്യ ഇൻഷുറൻസ് പദ്ധതി',
    description: 'Comprehensive health insurance for Kerala residents',
    descriptionHi: 'केरल निवासियों के लिए व्यापक स्वास्थ्य बीमा',
    descriptionMl: 'കേരള നിവാസികൾക്ക് സമഗ്ര ആരോഗ്യ ഇൻഷുറൻസ്',
    howToApply: 'Apply online at official Kerala Health Insurance portal or visit district health office',
    howToApplyHi: 'आधिकारिक केरल स्वास्थ्य बीमा पोर्टल पर ऑनलाइन आवेदन करें या जिला स्वास्थ्य कार्यालय में जाएं',
    howToApplyMl: 'ഔദ്യോഗിക കേരള ഹെൽത്ത് ഇൻഷുറൻസ് പോർട്ടലിൽ ഓൺലൈനായി അപേക്ഷിക്കുക അല്ലെങ്കിൽ ജില്ലാ ആരോഗ്യ ഓഫീസ് സന്ദർശിക്കുക',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    icon: Stethoscope,
    title: 'Migrant Worker Health Scheme',
    titleHi: 'प्रवासी श्रमिक स्वास्थ्य योजना',
    titleMl: 'കുടിയേറ്റ തൊഴിലാളി ആരോഗ്യ പദ്ധതി',
    description: 'Special health coverage for migrant workers in Kerala',
    descriptionHi: 'केरल में प्रवासी श्रमिकों के लिए विशेष स्वास्थ्य कवरेज',
    descriptionMl: 'കേരളത്തിലെ കുടിയേറ്റ തൊഴിലാളികൾക്ക് പ്രത്യേക ആരോഗ്യ കവറേജ്',
    howToApply: 'Register at local PHC with employment certificate and identity proof',
    howToApplyHi: 'रोजगार प्रमाणपत्र और पहचान प्रमाण के साथ स्थानीय PHC में पंजीकरण कराएं',
    howToApplyMl: 'തൊഴിൽ സർട്ടിഫിക്കറ്റും ഐഡന്റിറ്റി പ്രൂഫും സഹിതം പ്രാദേശിക PHC-യിൽ രജിസ്റ്റർ ചെയ്യുക',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    icon: Baby,
    title: 'Janani Suraksha Yojana',
    titleHi: 'जननी सुरक्षा योजना',
    titleMl: 'ജനനി സുരക്ഷാ യോജന',
    description: 'Maternity benefit scheme for safe delivery',
    descriptionHi: 'सुरक्षित प्रसव के लिए मातृत्व लाभ योजना',
    descriptionMl: 'സുരക്ഷിത പ്രസവത്തിനായുള്ള മാതൃത്വ ആനുകൂല്യ പദ്ധതി',
    howToApply: 'Register during pregnancy at ANM or ASHA worker',
    howToApplyHi: 'गर्भावस्था के दौरान ANM या ASHA कार्यकर्ता के पास पंजीकरण कराएं',
    howToApplyMl: 'ഗർഭാവസ്ഥയിൽ ANM അല്ലെങ്കിൽ ASHA വർക്കറിൽ രജിസ്റ്റർ ചെയ്യുക',
    color: 'bg-pink-100 text-pink-600'
  }
];

export function HealthcarePoliciesPage({ onBack, onApplyScheme }: HealthcarePoliciesPageProps) {
  const { t, language } = useLanguage();

  const getLocalizedTitle = (scheme: typeof healthSchemes[0]) => {
    switch (language) {
      case 'hi': return scheme.titleHi;
      case 'ml': return scheme.titleMl;
      default: return scheme.title;
    }
  };

  const getLocalizedDescription = (scheme: typeof healthSchemes[0]) => {
    switch (language) {
      case 'hi': return scheme.descriptionHi;
      case 'ml': return scheme.descriptionMl;
      default: return scheme.description;
    }
  };

  const getLocalizedHowToApply = (scheme: typeof healthSchemes[0]) => {
    switch (language) {
      case 'hi': return scheme.howToApplyHi;
      case 'ml': return scheme.howToApplyMl;
      default: return scheme.howToApply;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">{t('availableSchemes')}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {healthSchemes.map((scheme) => {
          const Icon = scheme.icon;
          return (
            <Card key={scheme.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-full ${scheme.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight">
                      {getLocalizedTitle(scheme)}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {getLocalizedDescription(scheme)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-700">
                    {t('howToApply')}:
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {getLocalizedHowToApply(scheme)}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onApplyScheme(scheme.id)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          );
        })}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            Contact your nearest health center or call the helpline: 1800-111-565
          </p>
        </div>
      </div>
    </div>
  );
}