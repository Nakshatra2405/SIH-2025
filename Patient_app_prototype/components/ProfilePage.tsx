import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, User, FileText, Calendar, Pill } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ProfilePageProps {
  onBack: () => void;
}

const mockPersonalInfo = {
  name: 'Ravi Kumar',
  age: 32,
  gender: 'male',
  bloodGroup: 'B+',
  aadhaar: '1234-5678-9012',
  mobile: '+91 98765 43210',
  address: 'Construction Site, Kochi, Kerala'
};

const mockPrescriptions = [
  {
    id: 1,
    date: '2024-01-15',
    doctor: 'Dr. Sreekumar',
    hospital: 'Kochi General Hospital',
    medicines: ['Paracetamol 500mg', 'Cough Syrup'],
    diagnosis: 'Common Cold'
  },
  {
    id: 2,
    date: '2024-01-08',
    doctor: 'Dr. Priya Nair',
    hospital: 'Primary Health Center',
    medicines: ['Antibiotic Course', 'Vitamin D3'],
    diagnosis: 'Minor Infection'
  }
];

const mockHealthReports = [
  {
    id: 1,
    date: '2024-01-10',
    type: 'Blood Test',
    hospital: 'Kochi Lab Center',
    status: 'Normal',
    notes: 'All parameters within normal range'
  },
  {
    id: 2,
    date: '2023-12-20',
    type: 'Chest X-Ray',
    hospital: 'Government Hospital',
    status: 'Normal',
    notes: 'No abnormalities detected'
  }
];

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">{t('profile')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">{t('personalInfo')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">{t('name')}</p>
                <p className="font-medium">{mockPersonalInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('age')}</p>
                <p className="font-medium">{mockPersonalInfo.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('gender')}</p>
                <p className="font-medium">{t(mockPersonalInfo.gender)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('bloodGroup')}</p>
                <p className="font-medium">{mockPersonalInfo.bloodGroup}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Aadhaar</p>
              <p className="font-medium">{mockPersonalInfo.aadhaar}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mobile</p>
              <p className="font-medium">{mockPersonalInfo.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-sm">{mockPersonalInfo.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Pill className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">{t('prescriptions')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPrescriptions.map((prescription) => (
              <div key={prescription.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{prescription.diagnosis}</h4>
                  <span className="text-xs text-gray-500">{prescription.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Doctor:</strong> {prescription.doctor}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Hospital:</strong> {prescription.hospital}
                </p>
                <div className="text-sm">
                  <strong>Medicines:</strong>
                  <ul className="list-disc list-inside text-gray-600 mt-1">
                    {prescription.medicines.map((medicine, index) => (
                      <li key={index}>{medicine}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Reports */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">{t('healthReports')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockHealthReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{report.type}</h4>
                  <span className="text-xs text-gray-500">{report.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Hospital:</strong> {report.hospital}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report.status === 'Normal' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{report.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="pb-8"></div>
      </div>
    </div>
  );
}