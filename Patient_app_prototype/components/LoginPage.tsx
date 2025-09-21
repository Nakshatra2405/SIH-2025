import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Smartphone, CreditCard, Shield, Camera, UserPlus } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { VoiceGuidance } from './VoiceGuidance';
import { FaceScanAnimation } from './FaceScanAnimation';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LoginPage({ onLogin, onRegister }: LoginPageProps) {
  const { t } = useLanguage();
  const [aadhaar, setAadhaar] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [authStep, setAuthStep] = useState<'credentials' | 'otp' | 'face'>('credentials');

  const handleSendOtp = () => {
    if (aadhaar.length === 12 && mobile.length === 10) {
      setOtpSent(true);
      setAuthStep('otp');
      toast.success(t('otpSent'));
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
      setAuthStep('face');
      toast.success('OTP verified! Please complete face authentication.');
    }
  };

  const handleFaceScan = () => {
    setIsScanning(true);
  };

  const handleFaceScanComplete = (success: boolean) => {
    setIsScanning(false);
    if (success) {
      toast.success('Authentication successful!');
      onLogin();
    } else {
      toast.error('Face authentication failed. Please try again.');
    }
  };

  const getVoiceMessage = () => {
    switch (authStep) {
      case 'credentials':
        return 'Please enter your Aadhaar number and mobile number to begin login.';
      case 'otp':
        return 'Enter the OTP sent to your mobile number.';
      case 'face':
        return 'Complete the final step by scanning your face for secure authentication.';
      default:
        return 'Follow the login instructions.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <VoiceGuidance 
            message={getVoiceMessage()} 
            autoPlay={true}
          />
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('healthcareApp')}
          </h1>
          <p className="text-gray-600">
            Kerala Migrant Workers Health Portal
          </p>
        </div>

        <LanguageSelector />

        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              {authStep === 'credentials' && <CreditCard className="h-5 w-5" />}
              {authStep === 'otp' && <Smartphone className="h-5 w-5" />}
              {authStep === 'face' && <Camera className="h-5 w-5" />}
              {authStep === 'credentials' && 'Enter Credentials'}
              {authStep === 'otp' && 'Verify OTP'}
              {authStep === 'face' && 'Face Authentication'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Credentials */}
            {authStep === 'credentials' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {t('aadhaarNumber')}
                  </Label>
                  <Input
                    id="aadhaar"
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    maxLength={12}
                    className="text-lg py-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    {t('mobileNumber')}
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    maxLength={10}
                    className="text-lg py-3"
                  />
                </div>

                <Button
                  onClick={handleSendOtp}
                  className="w-full py-3 text-lg"
                  disabled={aadhaar.length !== 12 || mobile.length !== 10}
                >
                  {t('sendOtp')}
                </Button>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {authStep === 'otp' && (
              <>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    OTP sent to +91 {mobile.replace(/(\d{5})(\d{5})/, '$1 $2')}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="otp">{t('enterOtp')}</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="XXXXXX"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-lg py-3 text-center tracking-widest"
                  />
                </div>
                
                <Button
                  onClick={handleVerifyOtp}
                  className="w-full py-3 text-lg"
                  disabled={otp.length !== 6}
                >
                  Verify OTP
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleSendOtp}
                  className="w-full text-sm"
                >
                  Resend OTP
                </Button>
              </>
            )}

            {/* Step 3: Face Authentication */}
            {authStep === 'face' && (
              <div className="text-center space-y-4">
                <div className="bg-green-50 p-6 rounded-lg">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h3 className="font-medium mb-2">Final Authentication Step</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please scan your face to complete the secure login process.
                  </p>
                  
                  <Button onClick={handleFaceScan} className="w-full py-3">
                    <Camera className="h-4 w-4 mr-2" />
                    Scan Face
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* New User Registration */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">Don't have an account?</p>
              <Button 
                variant="outline" 
                onClick={onRegister}
                className="w-full py-3"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Register as New User
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Secure login with Two-Factor Authentication</p>
          <p className="mt-1">OTP + Face Scan</p>
        </div>
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