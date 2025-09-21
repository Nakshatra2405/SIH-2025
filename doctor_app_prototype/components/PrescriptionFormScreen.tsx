import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, FileText, Plus, X, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

interface PrescriptionFormScreenProps {
  onBack: () => void;
  selectedLanguage: string;
  onLanguageSelect: () => void;
}

const translations = {
  English: {
    title: "Prescription & Diagnosis Form",
    patientDetails: "Patient Details",
    patientName: "Patient Name",
    patientNamePlaceholder: "Enter patient name",
    age: "Age",
    agePlaceholder: "Enter age",
    symptoms: "Symptoms",
    symptomsPlaceholder: "Describe patient symptoms...",
    diagnosis: "Diagnosis",
    diagnosisPlaceholder: "Enter diagnosis...",
    prescriptions: "Prescriptions",
    medicineName: "Medicine Name",
    medicineNamePlaceholder: "Start typing medicine name...",
    dosage: "Dosage",
    dosagePlaceholder: "e.g., 500mg",
    frequency: "Frequency",
    frequencyPlaceholder: "e.g., twice daily",
    duration: "Duration",
    durationPlaceholder: "e.g., 7 days",
    addMedicine: "Add Medicine",
    instructions: "Special Instructions",
    instructionsPlaceholder: "Any special care instructions...",
    submit: "Submit Prescription",
    submitted: "Prescription submitted successfully!",
    back: "Back",
    demoTitle: "Try Auto-Fill Demo",
    demoDesc: "Click to see how the auto-suggestion feature works",
    fillDemo: "Fill Demo Data",
    autoSuggestHelp: "💡 Tip: Start typing in any field to see auto-suggestions appear"
  },
  Hindi: {
    title: "नुस्खा और निदान फॉर्म",
    patientDetails: "रोगी विवरण",
    patientName: "रोगी का नाम",
    patientNamePlaceholder: "रोगी का नाम दर्ज करें",
    age: "आयु",
    agePlaceholder: "आयु दर्ज करें",
    symptoms: "लक्षण",
    symptomsPlaceholder: "रोगी के लक्षणों का वर्णन करें...",
    diagnosis: "निदान",
    diagnosisPlaceholder: "निदान दर्ज करें...",
    prescriptions: "नुस्खे",
    medicineName: "दवा का नाम",
    medicineNamePlaceholder: "दवा का नाम टाइप करना शुरू करें...",
    dosage: "खुराक",
    dosagePlaceholder: "जैसे, 500mg",
    frequency: "आवृत्ति",
    frequencyPlaceholder: "जैसे, दिन में दो बार",
    duration: "अवधि",
    durationPlaceholder: "जैसे, 7 दिन",
    addMedicine: "दवा जोड़ें",
    instructions: "विशेष निर्देश",
    instructionsPlaceholder: "कोई विशेष देखभाल निर्देश...",
    submit: "नुस्खा जमा करें",
    submitted: "नुस्खा सफलतापूर्वक जमा किया गया!",
    back: "वापस",
    demoTitle: "ऑटो-फिल डेमो आज़माएं",
    demoDesc: "ऑटो-सुझाव सुविधा कैसे काम करती है देखने के लिए क्लिक करें",
    fillDemo: "डेमो डेटा भरें",
    autoSuggestHelp: "💡 सुझाव: ऑटो-सुझाव देखने के लिए किसी भी फील्ड में टाइप करना शुरू करें"
  },
  Malayalam: {
    title: "കുറിപ്പടിയും രോഗനിർണയ ഫോമും",
    patientDetails: "രോഗിയുടെ വിവരങ്ങൾ",
    patientName: "രോഗിയുടെ പേര്",
    patientNamePlaceholder: "രോഗിയുടെ പേര് നൽകുക",
    age: "പ്രായം",
    agePlaceholder: "പ്രായം നൽകുക",
    symptoms: "ലക്ഷണങ്ങൾ",
    symptomsPlaceholder: "രോഗിയുടെ ലക്ഷണങ്ങൾ വിവരിക്കുക...",
    diagnosis: "രോഗനിർണയം",
    diagnosisPlaceholder: "രോഗനിർണയം നൽകുക...",
    prescriptions: "കുറിപ്പടികൾ",
    medicineName: "മരുന്നിന്റെ പേര്",
    medicineNamePlaceholder: "മരുന്നിന്റെ പേര് ടൈപ്പ് ചെയ്യാൻ തുടങ്ങുക...",
    dosage: "ഡോസേജ്",
    dosagePlaceholder: "ഉദാ., 500mg",
    frequency: "ആവൃത്തി",
    frequencyPlaceholder: "ഉദാ., ദിവസത്തിൽ രണ്ടു തവണ",
    duration: "കാലാവധി",
    durationPlaceholder: "ഉദാ., 7 ദിവസം",
    addMedicine: "മരുന്ന് ചേർക്കുക",
    instructions: "പ്രത്യേക നിർദേശങ്ങൾ",
    instructionsPlaceholder: "എന്തെങ്കിലും പ്രത്യേക പരിചരണ നിർദേശങ്ങൾ...",
    submit: "കുറിപ്പടി സമർപ്പിക്കുക",
    submitted: "കുറിപ്പടി വിജയകരമായി സമർപ്പിച്ചു!",
    back: "തിരികെ",
    demoTitle: "ഓട്ടോ-ഫിൽ ഡെമോ പരീക്ഷിക്കുക",
    demoDesc: "ഓട്ടോ-സജ്ജഷൻ ഫീച്ചർ എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്ന് കാണാൻ ക്ലിക്ക് ചെയ്യുക",
    fillDemo: "ഡെമോ ഡാറ്റ പൂരിപ്പിക്കുക",
    autoSuggestHelp: "💡 നുറുങ്ങ്: ഓട്ടോ-സജ്ജഷനുകൾ കാണാൻ ഏതെങ്കിലും ഫീൽഡിൽ ടൈപ്പ് ചെയ്യാൻ തുടങ്ങുക"
  }
};

// Mock data for auto-suggestions - Enhanced for better demonstration
const mockMedicines = [
  "Paracetamol 500mg", "Paracetamol 650mg", "Amoxicillin 250mg", "Amoxicillin 500mg", 
  "Ibuprofen 200mg", "Ibuprofen 400mg", "Aspirin 75mg", "Aspirin 300mg", 
  "Diclofenac 50mg", "Diclofenac Gel", "Cetirizine 10mg", "Cetirizine Syrup",
  "Omeprazole 20mg", "Omeprazole 40mg", "Metformin 500mg", "Metformin 850mg",
  "Amlodipine 5mg", "Amlodipine 10mg", "Atorvastatin 10mg", "Atorvastatin 20mg",
  "Azithromycin 250mg", "Azithromycin 500mg", "Cough Syrup", "Antacid Syrup",
  "ORS Powder", "Iron Tablets", "Calcium Tablets", "Multivitamin"
];

const mockSymptoms = [
  "Fever with chills", "Fever without chills", "High grade fever", "Low grade fever",
  "Headache - frontal", "Headache - temporal", "Migraine headache", "Tension headache",
  "Dry cough", "Wet cough", "Productive cough", "Persistent cough",
  "Common cold symptoms", "Runny nose", "Blocked nose", "Sneezing",
  "Sore throat", "Throat pain", "Difficulty swallowing", "Hoarse voice",
  "Body ache", "Joint pain", "Muscle pain", "Back pain", "Chest pain",
  "Stomach pain", "Abdominal pain", "Gastric pain", "Burning sensation",
  "Nausea", "Vomiting", "Loose stools", "Diarrhea", "Constipation",
  "Fatigue", "Weakness", "Dizziness", "Loss of appetite"
];

const mockDiagnoses = [
  "Upper Respiratory Tract Infection", "Lower Respiratory Tract Infection",
  "Viral Fever", "Bacterial Infection", "Common Cold", "Influenza",
  "Acute Gastroenteritis", "Gastritis", "Acid Peptic Disease",
  "Hypertension", "Diabetes Mellitus", "Hypertension with Diabetes",
  "Migraine", "Tension Headache", "Cervical Spondylosis",
  "Musculoskeletal Pain", "Lower Back Pain", "Arthritis",
  "Allergic Rhinitis", "Allergic Reaction", "Skin Allergy",
  "Nutritional Deficiency", "Dehydration", "Work-related Stress"
];

// Mock dosage suggestions based on medicine
const mockDosageSuggestions: { [key: string]: string[] } = {
  "Paracetamol": ["500mg", "650mg", "1g"],
  "Amoxicillin": ["250mg", "500mg", "875mg"],
  "Ibuprofen": ["200mg", "400mg", "600mg"],
  "Cetirizine": ["5mg", "10mg"],
  "Omeprazole": ["20mg", "40mg"]
};

// Mock frequency suggestions
const mockFrequencies = [
  "Once daily", "Twice daily", "Three times daily", "Four times daily",
  "Every 4 hours", "Every 6 hours", "Every 8 hours", "Every 12 hours",
  "Before meals", "After meals", "With meals", "At bedtime", "As needed"
];

// Mock duration suggestions
const mockDurations = [
  "3 days", "5 days", "7 days", "10 days", "14 days", "21 days", "30 days",
  "1 week", "2 weeks", "3 weeks", "1 month", "As needed", "Until symptoms resolve"
];

export function PrescriptionFormScreen({ onBack, selectedLanguage, onLanguageSelect }: PrescriptionFormScreenProps) {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>>([]);
  const [currentMedicine, setCurrentMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });
  const [instructions, setInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionType, setSuggestionType] = useState<'medicine' | 'symptom' | 'diagnosis' | 'frequency' | 'duration' | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const t = translations[selectedLanguage as keyof typeof translations];

  const handleInputChange = (value: string, type: 'medicine' | 'symptom' | 'diagnosis' | 'frequency' | 'duration', setter: (value: string) => void) => {
    setter(value);
    
    if (value.length > 0) {
      let mockData: string[] = [];
      switch (type) {
        case 'medicine':
          mockData = mockMedicines;
          break;
        case 'symptom':
          mockData = mockSymptoms;
          break;
        case 'diagnosis':
          mockData = mockDiagnoses;
          break;
        case 'frequency':
          mockData = mockFrequencies;
          break;
        case 'duration':
          mockData = mockDurations;
          break;
      }
      
      const filtered = mockData.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setSuggestionType(type);
    } else {
      setSuggestions([]);
      setSuggestionType(null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestionType === 'medicine') {
      setCurrentMedicine(prev => ({ ...prev, name: suggestion }));
    } else if (suggestionType === 'symptom') {
      setSymptoms(suggestion);
    } else if (suggestionType === 'diagnosis') {
      setDiagnosis(suggestion);
    } else if (suggestionType === 'frequency') {
      setCurrentMedicine(prev => ({ ...prev, frequency: suggestion }));
    } else if (suggestionType === 'duration') {
      setCurrentMedicine(prev => ({ ...prev, duration: suggestion }));
    }
    setSuggestions([]);
    setSuggestionType(null);
  };

  // Demo auto-fill function
  const fillDemoData = () => {
    setPatientName("রাজু কুমার (Raju Kumar)");
    setAge("32");
    setSymptoms("Fever with chills, headache, body ache");
    setDiagnosis("Viral Fever");
    setMedicines([
      {
        name: "Paracetamol 650mg",
        dosage: "650mg",
        frequency: "Three times daily",
        duration: "5 days"
      },
      {
        name: "Cetirizine 10mg",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "3 days"
      }
    ]);
    setInstructions("Take adequate rest, drink plenty of fluids, avoid cold foods. Return if fever persists beyond 3 days.");
    setShowDemo(false);
  };

  const addMedicine = () => {
    if (currentMedicine.name && currentMedicine.dosage) {
      setMedicines([...medicines, currentMedicine]);
      setCurrentMedicine({ name: '', dosage: '', frequency: '', duration: '' });
    }
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (patientName && symptoms && diagnosis) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="mb-4">{t.submitted}</h1>
              <Button onClick={onBack} className="w-full">
                {t.back}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          {/* Demo Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-blue-800 mb-1">🔍 {t.demoTitle}</h3>
                  <p className="text-sm text-blue-600">
                    {t.demoDesc}
                  </p>
                </div>
                <Button 
                  onClick={fillDemoData}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  {t.fillDemo}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Patient Details */}
          <Card>
            <CardHeader>
              <CardTitle>{t.patientDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">{t.patientName}</label>
                  <Input
                    placeholder={t.patientNamePlaceholder}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2">{t.age}</label>
                  <Input
                    placeholder={t.agePlaceholder}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <label className="block mb-2">{t.symptoms}</label>
                <Textarea
                  placeholder={t.symptomsPlaceholder}
                  value={symptoms}
                  onChange={(e) => handleInputChange(e.target.value, 'symptom', setSymptoms)}
                  rows={3}
                />
                {suggestions.length > 0 && suggestionType === 'symptom' && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <label className="block mb-2">{t.diagnosis}</label>
                <Input
                  placeholder={t.diagnosisPlaceholder}
                  value={diagnosis}
                  onChange={(e) => handleInputChange(e.target.value, 'diagnosis', setDiagnosis)}
                />
                {suggestions.length > 0 && suggestionType === 'diagnosis' && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t.prescriptions}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Added Medicines */}
              {medicines.length > 0 && (
                <div className="space-y-2">
                  {medicines.map((medicine, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {medicine.dosage} • {medicine.frequency} • {medicine.duration}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedicine(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Medicine Form */}
              <div className="space-y-3 border-t pt-4">
                <div className="relative">
                  <label className="block mb-2">{t.medicineName}</label>
                  <Input
                    placeholder={t.medicineNamePlaceholder}
                    value={currentMedicine.name}
                    onChange={(e) => handleInputChange(e.target.value, 'medicine', (value) => 
                      setCurrentMedicine(prev => ({ ...prev, name: value }))
                    )}
                  />
                  {suggestions.length > 0 && suggestionType === 'medicine' && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block mb-2 text-sm">{t.dosage}</label>
                    <Input
                      placeholder={t.dosagePlaceholder}
                      value={currentMedicine.dosage}
                      onChange={(e) => setCurrentMedicine(prev => ({ ...prev, dosage: e.target.value }))}
                    />
                  </div>
                  <div className="relative">
                    <label className="block mb-2 text-sm">{t.frequency}</label>
                    <Input
                      placeholder={t.frequencyPlaceholder}
                      value={currentMedicine.frequency}
                      onChange={(e) => handleInputChange(e.target.value, 'frequency', (value) => 
                        setCurrentMedicine(prev => ({ ...prev, frequency: value }))
                      )}
                    />
                    {suggestions.length > 0 && suggestionType === 'frequency' && (
                      <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-32 overflow-y-auto shadow-lg">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block mb-2 text-sm">{t.duration}</label>
                    <Input
                      placeholder={t.durationPlaceholder}
                      value={currentMedicine.duration}
                      onChange={(e) => handleInputChange(e.target.value, 'duration', (value) => 
                        setCurrentMedicine(prev => ({ ...prev, duration: value }))
                      )}
                    />
                    {suggestions.length > 0 && suggestionType === 'duration' && (
                      <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-32 overflow-y-auto shadow-lg">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={addMedicine}
                  variant="outline"
                  className="w-full"
                  disabled={!currentMedicine.name || !currentMedicine.dosage}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addMedicine}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardContent className="p-4">
              <label className="block mb-2">{t.instructions}</label>
              <Textarea
                placeholder={t.instructionsPlaceholder}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Auto-suggestion Help */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              {t.autoSuggestHelp}
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!patientName || !symptoms || !diagnosis}
          >
            {t.submit}
          </Button>
        </div>
      </div>
    </div>
  );
}