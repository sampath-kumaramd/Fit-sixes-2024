import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboardingStore } from '../store';
// import { generateAndDownloadPDF } from '../utils';
import { TeamCard } from '@/components';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TeamCardsPreviewStepProps {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export default function TeamCardsPreviewStep({
  onPrevStep,
  onNextStep,
}: TeamCardsPreviewStepProps) {
  const { teamFields } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team Cards Preview</h2>

      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {teamFields.map((team, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="mb-2 text-lg font-semibold">{team.name}</h3>
                <p className="mb-2 text-sm text-gray-500">
                  Gender: {team.gender}
                </p>
                <ul className="list-inside list-disc">
                  {team.players.map((player, playerIndex) => (
                    <li key={playerIndex} className="text-sm">
                      {player.name} - NIC: {player.nic}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-center">
        <Button
        //   onClick={() =>
        //     generateAndDownloadPDF(
        //       <TeamCard teams={teamFields} />,
        //       'team_cards.pdf'
        //     )
        //   }
        >
          Download Team Cards PDF
        </Button>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevStep}>
          Previous
        </Button>
        <Button onClick={onNextStep}>Next</Button>
      </div>
    </div>
  );
}
