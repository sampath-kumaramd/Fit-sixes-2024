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

  useEffect(() => {
    fetchCompanyData()
      .then((data) => {
        setCompanyData(data);
        if (data.view_status !== CompanyViewStatus.SUCCESS) {
          router.push('/auth/onboarding');
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
        // Handle error (e.g., redirect to login page or show error message)
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

  return (
    <div className="container mx-auto p-6">
      <div className="items-start justify-between sm:block lg:flex">
        <div className="flex-grow space-y-2">
          <div className="flex flex-col sm:flex-row">
            <span className="w-48 text-base text-gray-700">Company Name:</span>
            <span className="mt-1 pl-6 text-sm sm:pl-0">
              {companyData?.company_name || 'N/A'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <span className="w-48 text-base text-gray-700">
              Primary Contact Name:
            </span>
            <span className="mt-1 pl-6 text-sm sm:pl-0">
              {companyData?.contact_name || 'N/A'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <span className="w-48 text-base text-gray-700">
              Primary Contact Email:
            </span>
            <span className="mt-1 pl-6 text-sm sm:pl-0">
              {companyData?.email || 'N/A'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row">
            <span className="w-48 text-base text-gray-700">
              Primary Contact Phone Number:
            </span>
            <span className="mt-1 pl-6 text-sm sm:pl-0">
              {companyData?.phone || 'N/A'}
            </span>
          </div>
        </div>
        <div className="ml-6 mt-4 space-y-2 sm:inline-flex md:block">
          <Link
            href={companyData?.signed_team_card || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <FileText className="mr-2 h-5 w-5" />
            Certified Team Card
          </Link>
          <Link
            href={companyData?.payment_slip || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <FileText className="mr-2 h-5 w-5" />
            Payment Proof
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <Tabs defaultValue={companyData?.teams[0]?.team_name || ''}>
          <div className="mb-4 flex items-center justify-between">
            <TabsList>
              {companyData?.teams.map((team: Team) => (
                <TabsTrigger key={team.team_name} value={team.team_name}>
                  {team.team_name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {companyData?.teams.map((team: Team, teamIndex: number) => (
            <TabsContent key={team.team_name} value={team.team_name}>
              <Table>
                <TableHeader>
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
                      <TableRow key={member.id}>
                        <TableCell>{member.sort_order}</TableCell>
                        <TableCell>
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
                        <TableCell>{team.gender}</TableCell>
                        <TableCell>
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
                        <TableCell>
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
                        <TableCell>
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
