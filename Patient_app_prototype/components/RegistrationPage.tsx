import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, User, CreditCard, Camera, Phone, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { VoiceGuidance } from './VoiceGuidance';
import { FaceScanAnimation } from './FaceScanAnimation';
import { toast } from 'sonner@2.0.3';

interface RegistrationPageProps {
  onComplete: () => void;
  onBack: () => void;
}

export function RegistrationPage({ onComplete, onBack }: RegistrationPageProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [faceScanComplete, setFaceScanComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    
    // Contact Details
    mobileNumber: '',
    alternateNumber: '',
    email: '',
    currentAddress: '',
    permanentAddress: '',
    
    // Aadhaar Information
    aadhaarNumber: '',
    aadhaarName: ''
  });

  const steps = [
    { id: 1, title: t('basicInfo'), icon: User },
    { id: 2, title: t('contactDetails'), icon: Phone },
    { id: 3, title: t('aadhaarVerification'), icon: CreditCard },
    { id: 4, title: t('faceRegistration'), icon: Camera }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFaceScan = () => {
    setIsScanning(true);
  };

  const handleFaceScanComplete = (success: boolean) => {
    setIsScanning(false);
    if (success) {
      setFaceScanComplete(true);
      toast.success('Face registration completed successfully!');
    } else {
      toast.error('Face scan failed. Please try again.');
    }
  };

  const handleCompleteRegistration = () => {
    toast.success('Registration completed successfully!');
    onComplete();
  };

  const getVoiceMessage = () => {
    switch (currentStep) {
      case 1:
        return 'Please enter your basic information including full name, date of birth, and gender.';
      case 2:
        return 'Now provide your contact details including mobile number and address information.';
      case 3:
        return 'Enter your Aadhaar card details for identity verification.';
      case 4:
        return 'Finally, we need to register your face for secure authentication.';
      default:
        return 'Follow the instructions on screen to complete registration.';
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.dateOfBirth && formData.gender;
      case 2:
        return formData.mobileNumber && formData.currentAddress;
      case 3:
        return formData.aadhaarNumber.length === 12;
      case 4:
        return faceScanComplete;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
          <VoiceGuidance 
            message={getVoiceMessage()} 
            autoPlay={true}
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('register')}
          </h1>
          <p className="text-gray-600">
            Create your healthcare account
          </p>
        </div>

        <LanguageSelector />

        {/* Progress Steps */}
        <div className="flex justify-between mb-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-center">{step.title}</span>
              </div>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder={t('fullName')}
                    className="py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger className="py-3">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('male')}</SelectItem>
                      <SelectItem value="female">{t('female')}</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mobile">{t('mobileNumber')}</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="+91 XXXXX XXXXX"
                    className="py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateMobile">{t('alternateNumber')} (Optional)</Label>
                  <Input
                    id="alternateMobile"
                    type="tel"
                    value={formData.alternateNumber}
                    onChange={(e) => handleInputChange('alternateNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="+91 XXXXX XXXXX"
                    className="py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')} (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAddress">{t('currentAddress')}</Label>
                  <Input
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                    placeholder={t('currentAddress')}
                    className="py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permanentAddress">{t('permanentAddress')}</Label>
                  <Input
                    id="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                    placeholder={t('permanentAddress')}
                    className="py-3"
                  />
                </div>
              </>
            )}

            {/* Step 3: Aadhaar Information */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">{t('aadhaarNumber')}</Label>
                  <Input
                    id="aadhaar"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="XXXX XXXX XXXX"
                    className="py-3"
                    maxLength={12}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaarName">{t('nameAsPerAadhaar')}</Label>
                  <Input
                    id="aadhaarName"
                    value={formData.aadhaarName}
                    onChange={(e) => handleInputChange('aadhaarName', e.target.value)}
                    placeholder={t('nameAsPerAadhaar')}
                    className="py-3"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <CreditCard className="h-4 w-4 inline mr-2" />
                    Your Aadhaar information is used for identity verification and will be kept secure.
                  </p>
                </div>
              </>
            )}

            {/* Step 4: Face Registration */}
            {currentStep === 4 && (
              <div className="text-center space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h3 className="font-medium mb-2">Face Registration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We'll capture your face for secure authentication. This ensures only you can access your account.
                  </p>
                  
                  {!faceScanComplete ? (
                    <Button onClick={handleFaceScan} className="w-full py-3">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Face Scan
                    </Button>
                  ) : (
                    <div className="text-green-600">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span>Face registered successfully!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                  Previous
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button 
                  onClick={handleNextStep} 
                  disabled={!isStepValid()}
                  className="flex-1"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleCompleteRegistration}
                  disabled={!isStepValid()}
                  className="flex-1"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Face Scan Animation */}
      <FaceScanAnimation
        isScanning={isScanning}
        onComplete={handleFaceScanComplete}
        onCancel={() => setIsScanning(false)}
      />
    </div>
  );
}