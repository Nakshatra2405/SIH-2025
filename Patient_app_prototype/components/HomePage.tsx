import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, User, Users, Heart, Settings, MessageCircle, Bot } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface HomePageProps {
  onNavigate: (page: 'policies' | 'profile' | 'family' | 'chatbot') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{t('welcome')}</h1>
                <p className="text-sm text-gray-600">Ravi Kumar</p>
              </div>
            </div>
            <Settings className="h-5 w-5 text-gray-400" />
          </div>
          <LanguageSelector />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Healthcare Policies Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{t('healthcarePolicies')}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {t('healthcarePoliciesDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              onClick={() => onNavigate('policies')}
              className="w-full py-3 text-base"
              variant="default"
            >
              View Schemes
            </Button>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{t('profile')}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {t('profileDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              onClick={() => onNavigate('profile')}
              className="w-full py-3 text-base"
              variant="default"
            >
              View Profile
            </Button>
          </CardContent>
        </Card>

        {/* Family Members Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{t('familyMembers')}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {t('familyMembersDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              onClick={() => onNavigate('family')}
              className="w-full py-3 text-base"
              variant="default"
            >
              Manage Family
            </Button>
          </CardContent>
        </Card>

        {/* Health Assistant Card */}
        <Card className="hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  {t('healthAssistant')}
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  {language === 'hi' 
                    ? 'स्वास्थ्य सवालों के लिए बात करें या टाइप करें'
                    : language === 'ml' 
                    ? 'ആരോഗ്യ ചോദ്യങ്ങൾക്കായി സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ് ചെയ്യുക'
                    : 'Chat or talk for health questions'
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              onClick={() => onNavigate('chatbot')}
              className="w-full py-3 text-base bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              variant="default"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {t('startChat')}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Active Schemes</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Family Members</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}