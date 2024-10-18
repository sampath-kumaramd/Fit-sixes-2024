// File: app/dashboard/page.tsx

import React from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { dummyTeamsData } from './dummydata';

type TeamMember = {
  name: string;
  nic: string;
  phone_number: string;
  sort_order: number;
};

type Team = {
  team_name: string;
  gender: string;
  team_members: TeamMember[];
};

// This function now returns the dummy data
// Replace this with an actual API call when ready
async function fetchTeamsData(): Promise<Team[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return dummyTeamsData;
}

export default async function DashboardPage() {
  const teamsData = await fetchTeamsData();

  return (
    <div className="container mx-auto p-6">      
      <div className="bg-white shadow-md rounded-lg p-6">
        <Tabs defaultValue={teamsData[0].team_name}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {teamsData.map((team) => (
                <TabsTrigger key={team.team_name} value={team.team_name}>
                  {team.team_name}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* <Button variant="ghost" asChild>
              <Link href=" ">Edit</Link>
            </Button> */}
            <button className="bg-darkBlue">
              Edit
            </button>
          </div>
          
          {teamsData.map((team) => (
            <TabsContent key={team.team_name} value={team.team_name}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>NIC</TableHead>
                    <TableHead>Phone Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.team_members.sort((a, b) => a.sort_order - b.sort_order).map((member) => (
                    <TableRow key={member.nic}>
                      <TableCell>{member.sort_order}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{team.gender}</TableCell>
                      <TableCell>{member.nic}</TableCell>
                      <TableCell>{member.phone_number}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}