import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Shield, Scan } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onLanguageSelect: () => void;
  selectedLanguage: string;
}

const translations = {
  English: {
    title: "Healthcare App",
    subtitle: "Kerala Migrant Workers Health Portal",
    enterCredentials: "Enter Credentials",
    aadhaarNumber: "Aadhaar Number",
    aadhaarPlaceholder: "XXXX XXXX XXXX",
    mobileNumber: "Mobile Number",
    mobilePlaceholder: "+91 XXXXX XXXXX",
    sendOTP: "Send OTP",
    faceScan: "Face Scan Authentication",
    faceScanBtn: "Start Face Scan",
    faceScanComplete: "Face scan completed ✓",
    login: "Login",
    secureLogin: "Secure login with Two-Factor Authentication",
    otpFace: "OTP + Face Scan"
  },
  Hindi: {
    title: "स्वास्थ्य सेवा ऐप",
    subtitle: "केरल प्रवासी श्रमिक स्वास्थ्य पोर्टल",
    enterCredentials: "प्रमाण पत्र दर्ज करें",
    aadhaarNumber: "आधार संख्या",
    aadhaarPlaceholder: "XXXX XXXX XXXX",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "+91 XXXXX XXXXX",
    sendOTP: "OTP भेजें",
    faceScan: "चेहरा स्कैन प्रमाणीकरण",
    faceScanBtn: "चेहरा स्कैन शुरू करें",
    faceScanComplete: "चेहरा स्कैन पूरा ✓",
    login: "लॉगिन",
    secureLogin: "दो-कारक प्रमाणीकरण के साथ सुरक्षित लॉगिन",
    otpFace: "OTP + चेहरा स्कैन"
  },
  Malayalam: {
    title: "ആരോഗ്യ സേവന ആപ്പ്",
    subtitle: "കേരള കുടിയേറ്റ തൊഴിലാളികളുടെ ആരോഗ്യ പോർട്ടൽ",
    enterCredentials: "ക്രെഡൻഷ്യലുകൾ നൽകുക",
    aadhaarNumber: "ആധാർ നമ്പർ",
    aadhaarPlaceholder: "XXXX XXXX XXXX",
    mobileNumber: "മൊബൈൽ നമ്പർ",
    mobilePlaceholder: "+91 XXXXX XXXXX",
    sendOTP: "OTP അയയ്ക്കുക",
    faceScan: "മുഖം സ്കാൻ പ്രാമാണീകരണം",
    faceScanBtn: "മുഖം സ്കാൻ ആരംഭിക്കുക",
    faceScanComplete: "മുഖം സ്കാൻ പൂർത്തിയായി ✓",
    login: "ലോഗിൻ",
    secureLogin: "രണ്ട്-ഘടക പ്രാമാണീകരണത്തോടെ സുരക്ഷിത ലോഗിൻ",
    otpFace: "OTP + മുഖം സ്കാൻ"
  }
};

export function LoginScreen({ onLogin, onLanguageSelect, selectedLanguage }: LoginScreenProps) {
  const [aadhaar, setAadhaar] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [faceScanComplete, setFaceScanComplete] = useState(false);
  
  const t = translations[selectedLanguage as keyof typeof translations];

  const handleSendOTP = () => {
    if (aadhaar && mobile) {
      setOtpSent(true);
    }
  };

  const handleFaceScan = () => {
    setTimeout(() => {
      setFaceScanComplete(true);
    }, 2000);
  };

  const handleLogin = () => {
    if (otp && faceScanComplete) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
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
                className="min-w-[70px]"
              >
                {lang}
              </Button>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <h3>{t.enterCredentials}</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-2">{t.aadhaarNumber}</label>
              <Input
                placeholder={t.aadhaarPlaceholder}
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                maxLength={14}
              />
            </div>

            <div>
              <label className="block mb-2">{t.mobileNumber}</label>
              <Input
                placeholder={t.mobilePlaceholder}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={15}
              />
            </div>

            {!otpSent ? (
              <Button onClick={handleSendOTP} className="w-full" disabled={!aadhaar || !mobile}>
                {t.sendOTP}
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Enter OTP</label>
                  <Input
                    placeholder="XXXXXX"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="mb-3">{t.faceScan}</h4>
                  {!faceScanComplete ? (
                    <Button
                      onClick={handleFaceScan}
                      variant="outline"
                      className="w-full"
                      disabled={!otp}
                    >
                      <Scan className="w-4 h-4 mr-2" />
                      {t.faceScanBtn}
                    </Button>
                  ) : (
                    <div className="text-green-600 text-center">
                      {t.faceScanComplete}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full"
                  disabled={!otp || !faceScanComplete}
                >
                  {t.login}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          {t.secureLogin}<br />
          {t.otpFace}
        </div>
      </div>
    </div>
  );
}