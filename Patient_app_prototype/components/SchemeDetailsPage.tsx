import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  Clock, 
  Phone, 
  MapPin, 
  Download,
  AlertCircle,
  Users,
  IndianRupee,
  Calendar
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface SchemeDetailsPageProps {
  onBack: () => void;
  schemeId: number;
}

const schemeDetails = {
  1: {
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    titleHi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
    titleMl: 'ആയുഷ്മാൻ ഭാരത് പ്രധാനമന്ത്രി ജൻ ആരോഗ്യ യോജന',
    description: 'Free healthcare coverage up to ₹5 lakh per family per year',
    descriptionHi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त स्वास्थ्य कवरेज',
    descriptionMl: 'പ്രതി കുടുംബത്തിന് പ്രതിവർഷം ₹5 ലക്ഷം വരെ സൗജന്യ ആരോഗ്യ കവറേജ്',
    coverage: '₹5,00,000',
    processingTime: '15-30 days',
    eligibility: {
      en: ['Annual family income below ₹2.5 lakh', 'BPL card holder', 'Listed in SECC 2011 database'],
      hi: ['वार्षिक पारिवारिक आय ₹2.5 लाख से कम', 'BPL कार्ड धारक', 'SECC 2011 डेटाबेस में सूचीबद्ध'],
      ml: ['വാർഷിക കുടുംബ വരുമാനം ₹2.5 ലക്ഷത്തിൽ താഴെ', 'BPL കാർഡ് ഉടമ', 'SECC 2011 ഡാറ്റാബേസിൽ ലിസ്റ്റ് ചെയ്തിട്ടുള്ളത്']
    },
    documents: {
      en: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Bank Account Details', 'Mobile Number'],
      hi: ['आधार कार्ड', 'राशन कार्ड', 'आय प्रमाण पत्र', 'बैंक खाते की जानकारी', 'मोबाइल नंबर'],
      ml: ['ആധാർ കാർഡ്', 'റേഷൻ കാർഡ്', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'ബാങ്ക് അക്കൗണ്ട് വിശദാംശങ്ങൾ', 'മൊബൈൽ നമ്പർ']
    },
    steps: {
      en: [
        'Visit nearest Common Service Center (CSC)',
        'Fill application form with required details',
        'Submit documents for verification',
        'Biometric authentication',
        'Pay application fee (if applicable)',
        'Receive acknowledgment receipt',
        'Wait for verification process',
        'Collect Ayushman card from CSC'
      ],
      hi: [
        'निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं',
        'आवश्यक विवरण के साथ आवेदन पत्र भरें',
        'सत्यापन के लिए दस्तावेज जमा करें',
        'बायोमेट्रिक प्रमाणीकरण',
        'आवेदन शुल्क का भुगतान करें (यदि लागू हो)',
        'पावती रसीद प्राप्त करें',
        'सत्यापन प्रक्रिया की प्रतीक्षा करें',
        'CSC से आयुष्मान कार्ड एकत्र करें'
      ],
      ml: [
        'അടുത്തുള്ള കോമൺ സർവീസ് സെന്റർ (CSC) സന്ദർശിക്കുക',
        'ആവശ്യമായ വിവരങ്ങൾ സഹിതം അപേക്ഷാ ഫോം പൂരിപ്പിക്കുക',
        'സാക്ഷ്യപത്രീകരണത്തിനായി രേഖകൾ സമർപ്പിക്കുക',
        'ബയോമെട്രിക് ആധികാരികത',
        'അപേക്ഷാ ഫീസ് അടയ്ക്കുക (ബാധകമെങ്കിൽ)',
        'സ്വീകാര്യത രസീത് സ്വീകരിക്കുക',
        'സാക്ഷ്യപത്രീകരണ പ്രക്രിയയ്ക്കായി കാത്തിരിക്കുക',
        'CSC-യിൽ നിന്ന് ആയുഷ്മാൻ കാർഡ് ശേഖരിക്കുക'
      ]
    }
  },
  2: {
    title: 'Kerala State Health Insurance Scheme',
    titleHi: 'केरल राज्य स्वास्थ्य बीमा योजना',
    titleMl: 'കേരള സംസ്ഥാന ആരോഗ്യ ഇൻഷുറൻസ് പദ്ധതി',
    description: 'Comprehensive health insurance for Kerala residents',
    descriptionHi: 'केरल निवासियों के लिए व्यापक स्वास्थ्य बीमा',
    descriptionMl: 'കേരള നിവാസികൾക്ക് സമഗ്ര ആരോഗ്യ ഇൻഷുറൻസ്',
    coverage: '₹2,00,000',
    processingTime: '7-15 days',
    eligibility: {
      en: ['Kerala resident', 'Income below specified limit', 'Age between 18-65 years'],
      hi: ['केरल निवासी', 'निर्दिष्ट सीमा से कम आय', '18-65 वर्ष की आयु'],
      ml: ['കേരള നിവാസി', 'നിർദ്ദിഷ്ട പരിധിയിൽ താഴെയുള്ള വരുമാനം', '18-65 വയസ് പ്രായം']
    },
    documents: {
      en: ['Aadhaar Card', 'Kerala Residence Certificate', 'Income Certificate', 'Passport Size Photos'],
      hi: ['आधार कार्ड', 'केरल निवास प्रमाण पत्र', 'आय प्रमाण पत्र', 'पासपोर्ट साइज फोटो'],
      ml: ['ആധാർ കാർഡ്', 'കേരള റെസിഡൻസ് സർട്ടിഫിക്കറ്റ്', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'പാസ്പോർട്ട് സൈസ് ഫോട്ടോകൾ']
    },
    steps: {
      en: [
        'Visit Kerala Health Insurance portal online',
        'Create account with mobile number',
        'Fill online application form',
        'Upload required documents',
        'Pay premium amount',
        'Submit application for review',
        'Get policy confirmation via SMS',
        'Download policy document'
      ],
      hi: [
        'केरल स्वास्थ्य बीमा पोर्टल पर ऑनलाइन जाएं',
        'मोबाइल नंबर से खाता बनाएं',
        'ऑनलाइन आवेदन पत्र भरें',
        'आवश्यक दस्तावेज अपलोड करें',
        'प्रीमियम राशि का भुगतान करें',
        'समीक्षा के लिए आवेदन जमा करें',
        'SMS के द्वारा पॉलिसी की पुष्टि प्राप्त करें',
        'पॉलिसी दस्तावेज डाउनलोड करें'
      ],
      ml: [
        'കേരള ഹെൽത്ത് ഇൻഷുറൻസ് പോർട്ടൽ ഓൺലൈനായി സന്ദർശിക്കുക',
        'മൊബൈൽ നമ്പർ ഉപയോഗിച്ച് അക്കൗണ്ട് സൃഷ്ടിക്കുക',
        'ഓൺലൈൻ അപേക്ഷാ ഫോം പൂരിപ്പിക്കുക',
        'ആവശ്യമായ രേഖകൾ അപ്ലോഡ് ചെയ്യുക',
        'പ്രീമിയം തുക അടയ്ക്കുക',
        'അവലോകനത്തിനായി അപേക്ഷ സമർപ്പിക്കുക',
        'SMS വഴി പോളിസി സ്ഥിരീകരണം നേടുക',
        'പോളിസി രേഖ ഡൗൺലോഡ് ചെയ്യുക'
      ]
    }
  },
  3: {
    title: 'Migrant Worker Health Scheme',
    titleHi: 'प्रवासी श्रमिक स्वास्थ्य योजना',
    titleMl: 'കുടിയേറ്റ തൊഴിലാളി ആരോഗ്യ പദ്ധതി',
    description: 'Special health coverage for migrant workers in Kerala',
    descriptionHi: 'केरल में प्रवासी श्रमिकों के लिए विशेष स्वास्थ्य कवरेज',
    descriptionMl: 'കേരളത്തിലെ കുടിയേറ്റ തൊഴിലാളികൾക്ക് പ്രത്യേക ആരോഗ്യ കവറേജ്',
    coverage: '₹1,00,000',
    processingTime: '3-7 days',
    eligibility: {
      en: ['Migrant worker in Kerala', 'Valid employment certificate', 'Age between 18-60 years'],
      hi: ['केरल में प्रवासी श्रमिक', 'वैध रोजगार प्रमाण पत्र', '18-60 वर्ष की आयु'],
      ml: ['കേരളത്തിലെ കുടിയേറ്റ തൊഴിലാളി', 'സാധുവായ തൊഴിൽ സർട്ടിഫിക്കറ്റ്', '18-60 വയസ് പ്രായം']
    },
    documents: {
      en: ['Aadhaar Card', 'Employment Certificate', 'Labour Card', 'Address Proof in Kerala'],
      hi: ['आधार कार्ड', 'रोजगार प्रमाण पत्र', 'श्रमिक कार्ड', 'केरल में पता प्रमाण'],
      ml: ['ആധാർ കാർഡ്', 'തൊഴിൽ സർട്ടിഫിക്കറ്റ്', 'ലേബർ കാർഡ്', 'കേരളത്തിലെ വിലാസ പ്രൂഫ്']
    },
    steps: {
      en: [
        'Visit nearest Primary Health Center (PHC)',
        'Meet with health worker or ANM',
        'Fill registration form',
        'Submit employment and identity documents',
        'Get health card issued immediately',
        'Receive SMS confirmation',
        'Start using benefits at registered hospitals'
      ],
      hi: [
        'निकटतम प्राथमिक ���्वास्थ्य केंद्र (PHC) पर जाएं',
        'स्वास्थ्य कार्यकर्ता या ANM से मिलें',
        'पंजीकरण फॉर्म भरें',
        'रोजगार और पहचान दस्तावेज जमा करें',
        'तुरंत स्वास्थ्य कार्ड जारी करवाएं',
        'SMS पुष्टि प्राप्त करें',
        'पंजीकृत अस्पतालों में लाभ का उपयोग शुरू करें'
      ],
      ml: [
        'അടുത്തുള്ള പ്രൈമറി ഹെൽത്ത് സെന്റർ (PHC) സന്ദർശിക്കുക',
        'ഹെൽത്ത് വർക്കർ അല്ലെങ്കിൽ ANM-നെ കാണുക',
        'രജിസ്ട്രേഷൻ ഫോം പൂരിപ്പിക്കുക',
        'തൊഴിൽ, ഐഡന്റിറ്റി രേഖകൾ സമർപ്പിക്കുക',
        'ഉടനടി ഹെൽത്ത് കാർഡ് നേടുക',
        'SMS സ്ഥിരീകരണം സ്വീകരിക്കുക',
        'രജിസ്റ്റർ ചെയ്ത ആശുപത്രികളിൽ ആനുകൂല്യങ്ങൾ ഉപയോഗിക്കാൻ തുടങ്ങുക'
      ]
    }
  },
  4: {
    title: 'Janani Suraksha Yojana',
    titleHi: 'जननी सुरक्षा योजना',
    titleMl: 'ജനനി സുരക്ഷാ യോജന',
    description: 'Maternity benefit scheme for safe delivery',
    descriptionHi: 'सुरक्षित प्रसव के लिए मातृत्व लाभ योजना',
    descriptionMl: 'സുരക്ഷിത പ്രസവത്തിനായുള്ള മാതൃത്വ ആനുകൂല്യ പദ്ധതി',
    coverage: '₹1,400 - ₹6,000',
    processingTime: 'Immediate',
    eligibility: {
      en: ['Pregnant woman', 'BPL family', 'Age 19 years or above'],
      hi: ['गर्भवती महिला', 'BPL परिवार', '19 वर्ष या उससे अधिक आयु'],
      ml: ['ഗർഭിണി', 'BPL കുടുംബം', '19 വയസ് അല്ലെങ്കിൽ അതിനു മുകളിൽ പ്രായം']
    },
    documents: {
      en: ['Aadhaar Card', 'BPL Card', 'Pregnancy Certificate', 'Bank Account Details'],
      hi: ['आधार कार्ड', 'BPL कार्ड', 'गर्भावस्था प्रमाण पत्र', 'बैंक खाते की जानकारी'],
      ml: ['ആധാർ കാർഡ്', 'BPL കാർഡ്', 'ഗർഭാവസ്ഥാ സർട്ടിഫിക്കറ്റ്', 'ബാങ്ക് അക്കൗണ്ട് വിശദാംശങ്ങൾ']
    },
    steps: {
      en: [
        'Visit ASHA worker during pregnancy',
        'Register for ante-natal care',
        'Fill JSY registration form',
        'Submit required documents',
        'Attend regular check-ups',
        'Deliver at government facility',
        'Receive cash incentive after delivery',
        'Continue post-natal care'
      ],
      hi: [
        'गर्भावस्था के दौरान ASHA कार्यकर्ता से मिलें',
        'प्रसवपूर्व देखभाल के लिए पंजीकरण करें',
        'JSY पंजीकरण फॉर्म भरें',
        'आवश्यक दस्तावेज जमा करें',
        'नियमित जांच में भाग लें',
        'सरकारी सुविधा में प्रसव करें',
        'प्रसव के बाद नकद प्रोत्साहन प्राप्त करें',
        'प्रसवोत्तर देखभाल जारी रखें'
      ],
      ml: [
        'ഗർഭകാലത്ത് ASHA വർക്കറെ കാണുക',
        'പ്രസവത്തിനു മുമ്പുള്ള പരിചരണത്തിനായി രജിസ്റ്റർ ചെയ്യുക',
        'JSY രജിസ്ട്രേഷൻ ഫോം പൂരിപ്പിക്കുക',
        'ആവശ്യമായ രേഖകൾ സമർപ്പിക്കുക',
        'പതിവ് പരിശോധനകളിൽ പങ്കെടുക്കുക',
        'സർക്കാർ സൗകര്യത്തിൽ പ്രസവിക്കുക',
        'പ്രസവത്തിനു ശേഷം പണ പ്രോത്സാഹനം സ്വീകരിക്കുക',
        'പ്രസവാനന്തര പരിചരണം തുടരുക'
      ]
    }
  }
};

export function SchemeDetailsPage({ onBack, schemeId }: SchemeDetailsPageProps) {
  const { t, language } = useLanguage();
  const [applicationStep, setApplicationStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const scheme = schemeDetails[schemeId as keyof typeof schemeDetails];
  
  if (!scheme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2>Scheme not found</h2>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  const getLocalizedTitle = () => {
    switch (language) {
      case 'hi': return scheme.titleHi;
      case 'ml': return scheme.titleMl;
      default: return scheme.title;
    }
  };

  const getLocalizedDescription = () => {
    switch (language) {
      case 'hi': return scheme.descriptionHi;
      case 'ml': return scheme.descriptionMl;
      default: return scheme.description;
    }
  };

  const getLocalizedArray = (arrayObj: { en: string[], hi: string[], ml: string[] }) => {
    switch (language) {
      case 'hi': return arrayObj.hi;
      case 'ml': return arrayObj.ml;
      default: return arrayObj.en;
    }
  };

  const handleStartApplication = () => {
    setApplicationStep(1);
  };

  const handleNextStep = () => {
    const totalSteps = getLocalizedArray(scheme.steps).length;
    if (applicationStep < totalSteps) {
      setApplicationStep(applicationStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handleCompleteApplication = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto p-4">
          <div className="text-center py-12">
            <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-xl mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your application has been submitted. You will receive updates via SMS.
            </p>
            <div className="space-y-3">
              <Button onClick={onBack} className="w-full">
                Back to Schemes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (applicationStep > 0) {
    const steps = getLocalizedArray(scheme.steps);
    const progress = (applicationStep / steps.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setApplicationStep(0)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1>Application Process</h1>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              Step {applicationStep} of {steps.length}
            </p>
          </div>
        </div>

        {/* Application Step */}
        <div className="max-w-md mx-auto p-4">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-base">
                  {steps[applicationStep - 1]}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Complete this step to continue with your application.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Make sure you have all required documents ready before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={handleNextStep}
              className="w-full"
            >
              {applicationStep === steps.length ? 'Complete Application' : 'Mark as Complete & Continue'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setApplicationStep(0)}
              className="w-full"
            >
              Back to Details
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1>Scheme Details</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Scheme Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base leading-tight">
              {getLocalizedTitle()}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {getLocalizedDescription()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <IndianRupee className="h-5 w-5 text-green-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Coverage</p>
                <p className="font-medium text-green-600">{scheme.coverage}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Processing</p>
                <p className="font-medium text-blue-600">{scheme.processingTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Eligibility Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {getLocalizedArray(scheme.eligibility).map((criteria, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {criteria}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {getLocalizedArray(scheme.documents).map((document, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  {document}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Keep both original and photocopies of all documents ready.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Application Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Application Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getLocalizedArray(scheme.steps).map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Helpline</p>
                  <p className="text-sm text-gray-600">1800-111-565</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Visit Center</p>
                  <p className="text-sm text-gray-600">Nearest CSC or Health Center</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button 
            onClick={handleStartApplication}
            className="w-full"
            size="lg"
          >
            Start Application Process
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Application Form
          </Button>
        </div>
      </div>
    </div>
  );
}