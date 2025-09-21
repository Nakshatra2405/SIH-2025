import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Users, Plus, User } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { toast } from 'sonner@2.0.3';

interface FamilyMembersPageProps {
  onBack: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: string;
  gender: string;
}

const initialFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'Sunita Kumar',
    age: 28,
    relation: 'wife',
    gender: 'female'
  },
  {
    id: '2',
    name: 'Arjun Kumar',
    age: 8,
    relation: 'son',
    gender: 'male'
  },
  {
    id: '3',
    name: 'Priya Kumar',
    age: 5,
    relation: 'daughter',
    gender: 'female'
  }
];

export function FamilyMembersPage({ onBack }: FamilyMembersPageProps) {
  const { t } = useLanguage();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    relation: '',
    gender: ''
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.age && newMember.relation && newMember.gender) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name,
        age: parseInt(newMember.age),
        relation: newMember.relation,
        gender: newMember.gender
      };
      
      setFamilyMembers([...familyMembers, member]);
      setNewMember({ name: '', age: '', relation: '', gender: '' });
      setShowAddForm(false);
      toast.success(t('memberAdded'));
    }
  };

  const relations = [
    { value: 'wife', label: t('wife') },
    { value: 'husband', label: t('husband') },
    { value: 'son', label: t('son') },
    { value: 'daughter', label: t('daughter') },
    { value: 'father', label: t('father') },
    { value: 'mother', label: t('mother') }
  ];

  const genders = [
    { value: 'male', label: t('male') },
    { value: 'female', label: t('female') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">{t('familyMembers')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Add Member Button */}
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full py-3"
          variant={showAddForm ? "outline" : "default"}
        >
          <Plus className="h-4 w-4 mr-2" />
          {showAddForm ? 'Cancel' : t('addFamilyMember')}
        </Button>

        {/* Add Member Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('addFamilyMember')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter full name"
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">{t('age')}</Label>
                <Input
                  id="age"
                  type="number"
                  value={newMember.age}
                  onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                  placeholder="Enter age"
                  className="py-3"
                />
              </div>

              <div className="space-y-2">
                <Label>{t('relation')}</Label>
                <Select
                  value={newMember.relation}
                  onValueChange={(value) => setNewMember({ ...newMember, relation: value })}
                >
                  <SelectTrigger className="py-3">
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                  <SelectContent>
                    {relations.map((relation) => (
                      <SelectItem key={relation.value} value={relation.value}>
                        {relation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('gender')}</Label>
                <Select
                  value={newMember.gender}
                  onValueChange={(value) => setNewMember({ ...newMember, gender: value })}
                >
                  <SelectTrigger className="py-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAddMember}
                className="w-full py-3"
                disabled={!newMember.name || !newMember.age || !newMember.relation || !newMember.gender}
              >
                {t('addMember')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Family Members List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">{t('familyMembersList')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {familyMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{member.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                      <span>{t(member.relation)}</span>
                      <span>•</span>
                      <span>{member.age} years</span>
                      <span>•</span>
                      <span>{t(member.gender)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {familyMembers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No family members added yet</p>
                <p className="text-sm">Click "Add Family Member" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="pb-8"></div>
      </div>
    </div>
  );
}