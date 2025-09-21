import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Phone, Shield, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface PatientAccessScreenProps {
  onBack: () => void;
  onAccessHistory: () => void;
  selectedLanguage: string;
  onLanguageSelect: () => void;
}

const translations = {
  English: {
    title: "Request Patient Access",
    subtitle: "Get patient consent to view medical records",
    phoneNumber: "Patient's Phone Number",
    phonePlaceholder: "+91 XXXXX XXXXX",
    sendOTP: "Send OTP Request",
    otpSent: "OTP sent to patient",
    enterOTP: "Enter OTP received from patient",
    otpPlaceholder: "XXXXXX",
    accessHistory: "Access Patient History",
    consentNote: "Patient consent is required to access medical records",
    invalidOTP: "Invalid OTP. Please try again.",
    back: "Back"
  },
  Hindi: {
    title: "रोगी की पहुंच का अनुरोध",
    subtitle: "चिकित्सा रिकॉर्ड देखने के लिए रोगी की सहमति प्राप्त करें",
    phoneNumber: "रोगी का फोन नंबर",
    phonePlaceholder: "+91 XXXXX XXXXX",
    sendOTP: "OTP अनुरोध भेजें",
    otpSent: "रोगी को OTP भेजा गया",
    enterOTP: "रोगी से प्राप्त OTP दर्ज करें",
    otpPlaceholder: "XXXXXX",
    accessHistory: "रोगी का इतिहास देखें",
    consentNote: "चिकित्सा रिकॉर्ड तक पहुंचने के लिए रोगी की सहमति आवश्यक है",
    invalidOTP: "अमान्य OTP। कृपया पुनः प्रयास करें।",
    back: "वापस"
  },
  Malayalam: {
    title: "രോഗിയുടെ ആക്സസ് അഭ്യർത്ഥന",
    subtitle: "മെഡിക്കൽ റെക്കോർഡുകൾ കാണാൻ രോഗിയുടെ സമ്മതം നേടുക",
    phoneNumber: "രോഗിയുടെ ഫോൺ നമ്പർ",
    phonePlaceholder: "+91 XXXXX XXXXX",
    sendOTP: "OTP അഭ്യർത്ഥന അയയ്ക്കുക",
    otpSent: "രോഗിക്ക് OTP അയച്ചു",
    enterOTP: "രോഗിയിൽ നിന്ന് ലഭിച്ച OTP നൽകുക",
    otpPlaceholder: "XXXXXX",
    accessHistory: "രോഗിയുടെ ചരിത്രം കാണുക",
    consentNote: "മെഡിക്കൽ റെക്കോർഡുകൾ ആക്സസ് ചെയ്യാൻ രോഗിയുടെ സമ്മതം ആവശ്യമാണ്",
    invalidOTP: "അസാധുവായ OTP. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    back: "തിരികെ"
  }
};

export function PatientAccessScreen({ onBack, onAccessHistory, selectedLanguage, onLanguageSelect }: PatientAccessScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  const t = translations[selectedLanguage as keyof typeof translations];

  const handleSendOTP = () => {
    if (phoneNumber) {
      setOtpSent(true);
      setError('');
    }
  };

  const handleAccessHistory = () => {
    if (otp === '123456' || otp.length === 6) {
      onAccessHistory();
    } else {
      setError(t.invalidOTP);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1>{t.title}</h1>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {/* Language Selection */}
        <div className="flex gap-2 mb-6 justify-center">
          {['English', 'हिंदी', 'മലയാളം'].map((lang, index) => {
            const langKey = ['English', 'Hindi', 'Malayalam'][index];
            return (
              <Button
                key={lang}
                variant={selectedLanguage === langKey ? "default" : "outline"}
                size="sm"
                onClick={onLanguageSelect}
                className="min-w-[60px] text-xs"
              >
                {lang}
              </Button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              {t.consentNote}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {!otpSent ? t.phoneNumber : t.enterOTP}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!otpSent ? (
                <>
                  <Input
                    placeholder={t.phonePlaceholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={15}
                  />
                  <Button 
                    onClick={handleSendOTP} 
                    className="w-full"
                    disabled={!phoneNumber}
                  >
                    {t.sendOTP}
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">{t.otpSent}</span>
                  </div>
                  
                  <div>
                    <label className="block mb-2">{t.enterOTP}</label>
                    <Input
                      placeholder={t.otpPlaceholder}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                    />
                  </div>

                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    onClick={handleAccessHistory} 
                    className="w-full"
                    disabled={!otp}
                  >
                    {t.accessHistory}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Mock Patient Info Preview */}
          {otpSent && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-2">Preview:</div>
                <div className="space-y-1">
                  <div><strong>Patient:</strong> രാജു കുമാർ (Raju Kumar)</div>
                  <div><strong>Age:</strong> 32</div>
                  <div><strong>Phone:</strong> {phoneNumber}</div>
                  <div><strong>Worker ID:</strong> KL-MW-2024-1234</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}