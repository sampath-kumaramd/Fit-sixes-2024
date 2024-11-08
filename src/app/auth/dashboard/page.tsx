'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Pencil, X, Check, Loader2 } from 'lucide-react';
import api from '@/utils/api';
import { CompanyViewStatus } from '@/types/enums/company-view-status';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PulsatingButton from '@/components/ui/pulsating-button';
import { useToast } from '@/hooks/use-toast';
import { DialogClose } from '@/components/ui/dialog';

type TeamMember = {
  id: number;
  name: string;
  nic: string;
  phone_number: string;
  sort_order: number;
};

type Team = {
  id: number;
  team_name: string;
  gender: string;
  team_members: TeamMember[];
  food_count_veg: number;
  food_count_non_veg: number;
};

async function fetchCompanyData() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    const response = await api.get('/api/v1/registration/me/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch company data');
    }
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error;
  }
}

export default function DashboardPage() {
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<TeamMember | null>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [vegCount, setVegCount] = useState<number>(0);
  const [nonVegCount, setNonVegCount] = useState<number>(0);
  const [mealPreferencesError, setMealPreferencesError] = useState<string>('');
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCompanyData()
      .then((data) => {
        setCompanyData(data);
        if (data.view_status !== CompanyViewStatus.SUCCESS) {
          router.push('/auth/onboarding');
        }

        if (data.teams && data.teams.length > 0) {
          const totalVegCount = data.teams.reduce(
            (sum: any, team: { food_count_veg: any }) =>
              sum + (team.food_count_veg || 0),
            0
          );
          const totalNonVegCount = data.teams.reduce(
            (sum: any, team: { food_count_non_veg: any }) =>
              sum + (team.food_count_non_veg || 0),
            0
          );

          setVegCount(totalVegCount);
          setNonVegCount(totalNonVegCount);
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member.id);
    setEditedData(member);
  };

  const handleSave = async (teamIndex: number, memberIndex: number) => {
    if (editedData) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await api.put(
          `/api/v1/registration/team-member/${editedData.id}/`,
          {
            name: editedData.name,
            nic: editedData.nic,
            phone_number: editedData.phone_number,
            sort_order: editedData.sort_order,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.status === 200) {
          // Update local state
          const newTeamsData = [...companyData.teams];
          newTeamsData[teamIndex].team_members[memberIndex] = response.data;
          setCompanyData({ ...companyData, teams: newTeamsData });
          setEditingMember(null);
          setEditedData(null);
        } else {
          throw new Error('Failed to update team member');
        }
      } catch (error) {
        console.error('Error updating team member:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
    setEditedData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedData) {
      setEditedData({ ...editedData, [e.target.name]: e.target.value });
    }
  };

  const getTotalTeamMembers = () => {
    return (
      companyData?.teams.reduce((total: number, team: Team) => {
        return total + team.team_members.length;
      }, 0) || 0
    );
  };

  const handleSaveMealPreferences = async () => {
    const totalMembers = getTotalTeamMembers();
    const totalMeals = vegCount + nonVegCount;

    if (totalMeals !== totalMembers) {
      setMealPreferencesError(
        `Total meal count must equal team members (${totalMembers})`
      );
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      let remainingVeg = vegCount;
      let remainingNonVeg = nonVegCount;

      const updatedTeams = await Promise.all(
        companyData.teams.map(async (team: Team) => {
          const teamMemberCount = team.team_members.length;
          let teamVegCount = 0;
          let teamNonVegCount = 0;

          if (remainingNonVeg > 0) {
            teamNonVegCount = Math.min(remainingNonVeg, teamMemberCount);
            remainingNonVeg -= teamNonVegCount;
          }

          if (teamNonVegCount < teamMemberCount && remainingVeg > 0) {
            teamVegCount = Math.min(
              remainingVeg,
              teamMemberCount - teamNonVegCount
            );
            remainingVeg -= teamVegCount;
          }

          const response = await api.patch(
            `/api/v1/registration/team/${team.id}/`,
            {
              food_count_veg: teamVegCount,
              food_count_non_veg: teamNonVegCount,
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          return response.data;
        })
      );

      setCompanyData({ ...companyData, teams: updatedTeams });
      setMealPreferencesError('');
      setOpen(false);
      toast({
        title: 'Success',
        description: 'Meal preferences updated successfully',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving meal preferences:', error);
      setMealPreferencesError('Failed to save meal preferences');
      toast({
        title: 'Error',
        description: 'Failed to update meal preferences',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Company Name
                </span>
                <span className="text-base">
                  {companyData?.company_name || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Primary Contact Name
                </span>
                <span className="text-base">
                  {companyData?.contact_name || 'N/A'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Primary Contact Email
                </span>
                <span className="text-base">{companyData?.email || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Primary Contact Phone Number
                </span>
                <span className="text-base">{companyData?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 inline-block">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <PulsatingButton
                  className="bg-yellow text-primary-foreground hover:bg-yellow/80"
                  pulseColor="hsl(var(--yellow))"
                >
                  Update Meal Preferences
                </PulsatingButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Meal Preferences</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Non-Vegetarian Meals
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={nonVegCount}
                      onChange={(e) =>
                        setNonVegCount(parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Vegetarian Meals
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={vegCount}
                      onChange={(e) =>
                        setVegCount(parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                  {mealPreferencesError && (
                    <p className="text-sm text-red-500">
                      {mealPreferencesError}
                    </p>
                  )}
                  <div className="text-sm text-gray-500">
                    Total team members: {getTotalTeamMembers()}
                  </div>
                  <Button onClick={handleSaveMealPreferences}>
                    Save Preferences
                  </Button>
                </div>
              </DialogContent>
              <DialogClose />
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <Tabs defaultValue={companyData?.teams[0]?.id.toString() || ''}>
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              {companyData?.teams.map((team: Team) => (
                <TabsTrigger key={team.id} value={team.id.toString()}>
                  {team.team_name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {companyData?.teams.map((team: Team, teamIndex: number) => (
            <TabsContent key={team.id} value={team.id.toString()}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="hidden md:table-header-group">
                    <TableRow>
                      <TableHead className="w-[100px]">#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>NIC</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.team_members
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((member, memberIndex) => (
                        <TableRow
                          key={member.id}
                          className="block md:table-row"
                        >
                          <TableCell>{member.sort_order}</TableCell>
                          <TableCell className="flex items-center justify-between border-b py-2 md:table-cell md:py-4">
                            <span className="font-bold md:hidden">Name:</span>
                            {editingMember === member.id ? (
                              <input
                                name="name"
                                value={editedData?.name || ''}
                                onChange={handleInputChange}
                                className="w-full rounded border px-2 py-1"
                              />
                            ) : (
                              member.name
                            )}
                          </TableCell>
                          <TableCell className="flex items-center justify-between border-b py-2 md:table-cell md:py-4">
                            <span className="font-bold md:hidden">Gender:</span>
                            {team.gender === 'male' ? 'Male' : 'Female'}
                          </TableCell>
                          <TableCell className="flex items-center justify-between border-b py-2 md:table-cell md:py-4">
                            <span className="font-bold md:hidden">NIC:</span>
                            {editingMember === member.id ? (
                              <input
                                name="nic"
                                value={editedData?.nic || ''}
                                onChange={handleInputChange}
                                className="w-full rounded border px-2 py-1"
                              />
                            ) : (
                              member.nic
                            )}
                          </TableCell>
                          <TableCell className="flex items-center justify-between border-b py-2 md:table-cell md:py-4">
                            <span className="font-bold md:hidden">
                              Phone Number:
                            </span>
                            {editingMember === member.id ? (
                              <input
                                name="phone_number"
                                value={editedData?.phone_number || ''}
                                onChange={handleInputChange}
                                className="w-full rounded border px-2 py-1"
                              />
                            ) : (
                              member.phone_number
                            )}
                          </TableCell>
                          <TableCell className="flex items-center justify-between border-b py-2 md:table-cell md:py-4">
                            {editingMember === member.id ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleSave(teamIndex, memberIndex)
                                  }
                                  className="mr-2"
                                >
                                  <Check className="h-5 w-5 text-green-500" />
                                </button>
                                <button onClick={handleCancel}>
                                  <X className="h-5 w-5 text-red-500" />
                                </button>
                              </>
                            ) : (
                              <button onClick={() => handleEdit(member)}>
                                <Pencil className="h-5 w-5 text-blue-500" />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
