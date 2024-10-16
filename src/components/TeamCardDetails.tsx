'use client';

import React from 'react';

import { z } from 'zod';

const teamSchema = z.object({
  name: z.string(),
  gender: z.string(),
  players: z.array(
    z.object({
      name: z.string(),
      nic: z.string(),
      contactNumber: z.string(),
    })
  ),
});

interface TeamCardDetailsProps {
  teams: z.infer<typeof teamSchema>[];
  companyName: string;
}

const TeamCardDetails: React.FC<TeamCardDetailsProps> = ({
  teams,
  companyName,
}) => {
  return (
    <div className="mx-auto my-8 max-w-4xl">
      <div className="rounded-lg border-4 border-gray-300 bg-white p-8 font-sans shadow-lg">
        <div className="mb-6 border-b-2 border-[#030835] pb-4">
          <img
            src="/LetterHead.png"
            alt="Letter Head"
            className="mb-4 h-auto max-w-full"
          />
          <h1 className="mt-4 text-3xl font-bold text-[#030835]">Team Cards</h1>
          <p className="text-sm text-[#4B5563]">Company: {companyName}</p>
        </div>

        {teams.map((team, index) => (
          <div
            key={index}
            className="mb-8 rounded-lg bg-[#F3F4F6] p-6 shadow-md"
          >
            <h2 className="mb-2 text-2xl font-bold text-[#1E40AF]">
              {team.name}
            </h2>
            <div className="mb-4 flex justify-between text-sm text-[#4B5563]">
              <p>Gender: {team.gender == 'male' ? 'Male' : 'Female'}</p>
              <p>
                Team {index + 1} of {teams.length}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#E5E7EB]">
                <thead>
                  <tr className="bg-[#383B5E] bg-opacity-60">
                    <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                      Name
                    </th>
                    <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                      NIC
                    </th>
                    <th className="border border-[#E5E7EB] p-2 text-sm font-bold text-[#030835]">
                      Contact Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team.players.map((player, playerIndex) => (
                    <tr key={playerIndex}>
                      <td className="border border-[#E5E7EB] p-2 text-xs">
                        {player.name}
                      </td>
                      <td className="border border-[#E5E7EB] p-2 text-xs">
                        {player.nic}
                      </td>
                      <td className="border border-[#E5E7EB] p-2 text-xs">
                        {player.contactNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="mt-8 border-t-2 border-[#030835] pt-4">
          <p className="mb-4 text-sm">
            Note: This confirmation is taken only to verify whether each player
            is an employee of the company. If a member of the squad changes,
            certain player/players must have sufficient proof (e.g., company ID,
            email, etc.) on the event day to validate him/her as an employee of
            the company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCardDetails;
