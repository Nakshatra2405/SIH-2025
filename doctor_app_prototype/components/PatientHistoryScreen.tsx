import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, User, Calendar, AlertTriangle, Pill, FileText } from 'lucide-react';
import { Separator } from './ui/separator';

interface PatientHistoryScreenProps {
  onBack: () => void;
  selectedLanguage: string;
  onLanguageSelect: () => void;
}

const translations = {
  English: {
    title: "Patient Medical History",
    patientInfo: "Patient Information",
    name: "Name",
    age: "Age",
    gender: "Gender",
    workerId: "Worker ID",
    bloodGroup: "Blood Group",
    allergies: "Allergies",
    noAllergies: "No known allergies",
    recentVisits: "Recent Medical Visits",
    prescriptions: "Prescriptions",
    vitals: "Vital Signs",
    diagnosis: "Diagnosis",
    treatment: "Treatment",
    followUp: "Follow-up",
    back: "Back to Home",
    male: "Male",
    female: "Female",
    dateFormat: "MMM DD, YYYY"
  },
  Hindi: {
    title: "रोगी का चिकित्सा इतिहास",
    patientInfo: "रोगी की जानकारी",
    name: "नाम",
    age: "आयु",
    gender: "लिंग",
    workerId: "श्रमिक आईडी",
    bloodGroup: "रक्त समूह",
    allergies: "एलर्जी",
    noAllergies: "कोई ज्ञात एलर्जी नहीं",
    recentVisits: "हाल की चिकित्सा यात्राएं",
    prescriptions: "नुस्खे",
    vitals: "महत्वपूर्ण संकेत",
    diagnosis: "निदान",
    treatment: "उपचार",
    followUp: "अनुवर्ती",
    back: "होम पर वापस",
    male: "पुरुष",
    female: "महिला",
    dateFormat: "MMM DD, YYYY"
  },
  Malayalam: {
    title: "രോഗിയുടെ മെഡിക്കൽ ചരിത്രം",
    patientInfo: "രോഗിയുടെ വിവരങ്ങൾ",
    name: "പേര്",
    age: "പ്രായം",
    gender: "ലിംഗം",
    workerId: "തൊഴിലാളി ഐഡി",
    bloodGroup: "രക്തഗ്രൂപ്പ്",
    allergies: "അലർജികൾ",
    noAllergies: "അറിയാവുന്ന അലർജികളൊന്നുമില്ല",
    recentVisits: "സമീപകാല മെഡിക്കൽ സന്ദർശനങ്ങൾ",
    prescriptions: "കുറിപ്പടികൾ",
    vitals: "ജീവനാഡി അടയാളങ്ങൾ",
    diagnosis: "രോഗനിർണയം",
    treatment: "ചികിത്സ",
    followUp: "ഫോളോ-അപ്പ്",
    back: "ഹോമിലേക്ക് മടങ്ങുക",
    male: "പുരുഷൻ",
    female: "സ്ത്രീ",
    dateFormat: "MMM DD, YYYY"
  }
};

// Mock patient data
const mockPatientData = {
  name: "രാജു കുമാർ (Raju Kumar)",
  age: 32,
  gender: "Male",
  workerId: "KL-MW-2024-1234",
  bloodGroup: "B+",
  allergies: ["Penicillin", "Dust"],
  visits: [
    {
      date: "2024-01-10",
      diagnosis: "Upper Respiratory Infection",
      treatment: "Prescribed antibiotics and rest",
      prescriptions: ["Amoxicillin 500mg", "Paracetamol 650mg"],
      vitals: {
        bp: "120/80",
        temp: "99.2°F",
        pulse: "78 bpm"
      },
      followUp: "7 days"
    },
    {
      date: "2023-12-15",
      diagnosis: "Back Pain (Work-related)",
      treatment: "Muscle relaxants and physiotherapy",
      prescriptions: ["Diclofenac 50mg", "Muscle relaxant"],
      vitals: {
        bp: "115/75",
        temp: "98.6°F",
        pulse: "72 bpm"
      },
      followUp: "14 days"
    },
    {
      date: "2023-11-22",
      diagnosis: "Routine Health Checkup",
      treatment: "Preventive care counseling",
      prescriptions: ["Multivitamin", "Calcium supplement"],
      vitals: {
        bp: "118/78",
        temp: "98.4°F",
        pulse: "75 bpm"
      },
      followUp: "6 months"
    }
  ]
};

export function PatientHistoryScreen({ onBack, selectedLanguage, onLanguageSelect }: PatientHistoryScreenProps) {
  const t = translations[selectedLanguage as keyof typeof translations];

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

        <div className="space-y-6">
          {/* Patient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.patientInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">{t.name}</div>
                  <div>{mockPatientData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t.age}</div>
                  <div>{mockPatientData.age} years</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t.gender}</div>
                  <div>{t.male}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t.bloodGroup}</div>
                  <div>{mockPatientData.bloodGroup}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{t.workerId}</div>
                <div>{mockPatientData.workerId}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">{t.allergies}</div>
                <div className="flex gap-2">
                  {mockPatientData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Visits */}
          <div>
            <h2 className="mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {t.recentVisits}
            </h2>
            
            <div className="space-y-4">
              {mockPatientData.visits.map((visit, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">
                        {new Date(visit.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric'
                        })}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">{t.diagnosis}</div>
                        <div className="font-medium">{visit.diagnosis}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">{t.vitals}</div>
                        <div className="text-sm">
                          BP: {visit.vitals.bp} | Temp: {visit.vitals.temp} | Pulse: {visit.vitals.pulse}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                          <Pill className="w-3 h-3" />
                          {t.prescriptions}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {visit.prescriptions.map((prescription, pIndex) => (
                            <Badge key={pIndex} variant="secondary" className="text-xs">
                              {prescription}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">{t.treatment}</div>
                        <div className="text-sm">{visit.treatment}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">{t.followUp}</div>
                        <div className="text-sm">{visit.followUp}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button onClick={onBack} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
        </div>
      </div>
    </div>
  );
}