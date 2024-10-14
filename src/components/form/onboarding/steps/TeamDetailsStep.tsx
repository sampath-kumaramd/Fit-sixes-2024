import React from 'react';

import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { OnboardingSchema } from '../schema';
import { useOnboardingStore } from '../store';
import TeamForm from '../TeamForm';

interface TeamDetailsStepProps {
  form: UseFormReturn<OnboardingSchema>;
  onNextStep: () => void;
}

export default function TeamDetailsStep({
  form,
  onNextStep,
}: TeamDetailsStepProps) {
  const {
    activeTab,
    setActiveTab,
    teamFields,
    addNewTeam,
    handleRemoveTeam,
    isLoading,
  } = useOnboardingStore();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Team Details</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* ... (TabsList and add team button) */}
        {teamFields.map((team, index) => (
          <TabsContent key={index} value={`team${index}`}>
            <TeamForm form={form} teamIndex={index} />
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={onNextStep} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  );
}
