import React from 'react';

import { Button } from '@/components/ui/button';

import { useOnboardingStore } from '../store';
import TeamCardDetails from '@/components/TeamCardDetails';

interface TeamCardsPreviewStepProps {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function TeamCardsPreviewStep({
  onPrevStep,
  onNextStep,
}: TeamCardsPreviewStepProps) {
  const { teamFields, setStep } = useOnboardingStore();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Team Cards Preview</h2>
      <div id="teamCardDivId">
        <TeamCardDetails teams={teamFields} companyName={'companyName'} />
      </div>
      <div className="mt-4 flex justify-between">
        <Button type="button" onClick={() => setStep(1)}>
          Previous
        </Button>
        <Button type="button" onClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
