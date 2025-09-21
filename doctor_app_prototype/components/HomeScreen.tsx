import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, History, LogOut, Shield, Users } from 'lucide-react';

interface HomeScreenProps {
  onPatientAccess: () => void;
  onPrescriptionForm: () => void;
  onLogout: () => void;
  selectedLanguage: string;
  onLanguageSelect: () => void;
}

const translations = {
  English: {
    welcome: "Welcome, Dr. ",
    doctorName: "Priya Nair",
    subtitle: "Kerala Migrant Workers Health Portal",
    todayStats: "Today's Statistics",
    patientsConsulted: "Patients Consulted",
    prescriptionsIssued: "Prescriptions Issued",
    quickActions: "Quick Actions",
    accessPatientHistory: "Access Patient History",
    accessPatientDesc: "View patient medical records with consent",
    fillPrescription: "Fill Prescription & Diagnosis",
    fillPrescriptionDesc: "Create new medical prescriptions",
    logout: "Logout"
  },
  Hindi: {
    welcome: "स्वागत है, डॉ. ",
    doctorName: "प्रिया नायर",
    subtitle: "केरल प्रवासी श्रमिक स्वास्थ्य पोर्टल",
    todayStats: "आज के आंकड़े",
    patientsConsulted: "परामर्श लिए गए मरीज़",
    prescriptionsIssued: "जारी की गई दवाएं",
    quickActions: "त्वरित कार्य",
    accessPatientHistory: "रोगी का इतिहास देखें",
    accessPatientDesc: "सहमति के साथ रोगी के चिकित्सा रिकॉर्ड देखें",
    fillPrescription: "नुस्खा और निदान भरें",
    fillPrescriptionDesc: "नए चिकित्सा नुस्खे बनाएं",
    logout: "लॉगआउट"
  },
  Malayalam: {
    welcome: "സ്വാഗതം, ഡോ. ",
    doctorName: "പ്രിയ നായർ",
    subtitle: "കേരള കുടിയേറ്റ തൊഴിലാളികളുടെ ആരോഗ്യ പോർട്ടൽ",
    todayStats: "ഇന്നത്തെ സ്ഥിതിവിവരക്കണക്കുകൾ",
    patientsConsulted: "കൺസൾട്ട് ചെയ്ത രോഗികൾ",
    prescriptionsIssued: "നൽകിയ കുറിപ്പടികൾ",
    quickActions: "പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ",
    accessPatientHistory: "രോഗിയുടെ ചരിത്രം കാണുക",
    accessPatientDesc: "സമ്മതത്തോടെ രോഗിയുടെ മെഡിക്കൽ റെക്കോർഡുകൾ കാണുക",
    fillPrescription: "കുറിപ്പടിയും രോഗനിർണയും പൂരിപ്പിക്കുക",
    fillPrescriptionDesc: "പുതിയ മെഡിക്കൽ കുറിപ്പടികൾ സൃഷ്ടിക്കുക",
    logout: "ലോഗൗട്ട്"
  }
};

export function HomeScreen({ onPatientAccess, onPrescriptionForm, onLogout, selectedLanguage, onLanguageSelect }: HomeScreenProps) {
  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h1>{t.welcome}{t.doctorName}</h1>
                <p className="text-sm text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Language Selection */}
          <div className="flex gap-2 mb-4 justify-center">
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
        </div>

        {/* Today's Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t.todayStats}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-blue-600">12</div>
                <div className="text-sm text-muted-foreground">{t.patientsConsulted}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600">8</div>
                <div className="text-sm text-muted-foreground">{t.prescriptionsIssued}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2>{t.quickActions}</h2>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onPatientAccess}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{t.accessPatientHistory}</h3>
                  <p className="text-sm text-muted-foreground">{t.accessPatientDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onPrescriptionForm}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{t.fillPrescription}</h3>
                  <p className="text-sm text-muted-foreground">{t.fillPrescriptionDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}