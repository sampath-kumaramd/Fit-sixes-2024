'use client';
import React, { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  pdf,
} from '@react-pdf/renderer';
import axios from 'axios';
import { PlusCircle, Download, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, FieldArrayWithId } from 'react-hook-form';
import { z } from 'zod';
import create from 'zustand';

import { useToast } from '@/hooks/use-toast';

import InvoiceDetails from '../InvoiceDetails';
import InvoicePDF from '../InvoicePDF';
import TeamCard from '../TeamCard';
import TeamCardDetails from '../TeamCardDetails';
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  ScrollArea,
} from '../ui';

const playerSchema = z.object({
  name: z.string().min(1, 'Player name is required'),
  nic: z.string().min(1, 'NIC is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
});

const teamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  gender: z.enum(['male', 'female']),
  players: z
    .array(playerSchema)
    .min(6, 'Each team must have at least 6 players')
    .max(8, 'Each team can have a maximum of 8 players'),
});

const onboardingSchema = z.object({
  teams: z
    .array(teamSchema)
    .min(1, 'At least one team is required')
    .max(4, 'Maximum of 4 teams allowed'),
  paymentSlip: z.any(),
  certifiedTeamCard: z.any(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type OnboardingSchema = z.infer<typeof onboardingSchema>;

const invoiceData = {
  invoiceNumber: 'INV-FS24-0002',
  billTo: {
    name: 'Pagero,',
    address: ['413, R A De Mel Mawatha,', 'Colombo 03,', 'Sri Lanka.'],
  },
  packageInfo: {
    item: 'FIT Sixes 2K24 - Silver Partnership',
    price: 100000,
  },
  bankDetails: {
    accountHolder: "IT Faculty Students' Union",
    accountNo: '747044223',
    bankName: 'Bank of Ceylon',
    branch: 'University of Moratuwa branch',
    branchCode: '631',
  },
  signatory: {
    name: 'Mr. Thushan Fernando',
    position: 'Junior Treasurer',
    faculty: 'Faculty of Information Technology',
    university: 'University of Moratuwa.',
  },
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

interface Team {
  name: string;
  gender: string;
  players: {
    name: string;
    nic: string;
    contactNumber: string;
  }[];
}

const TeamCardPDF = ({ teams }: { teams: Team[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Team Cards</Text>
        {teams.map(
          (
            team: {
              name:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              gender:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              players: any[];
            },
            index: React.Key | null | undefined
          ) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                {team.name} ({team.gender})
              </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>NIC</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Contact Number</Text>
                  </View>
                </View>
                {team.players.map(
                  (
                    player: {
                      name:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                      nic:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                      contactNumber:
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Promise<React.AwaitedReactNode>
                        | null
                        | undefined;
                    },
                    playerIndex: React.Key | null | undefined
                  ) => (
                    <View style={styles.tableRow} key={playerIndex}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{player.name}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{player.nic}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {player.contactNumber}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              </View>
            </View>
          )
        )}
      </View>
    </Page>
  </Document>
);

const rulesAndRegulations = `
RULES & REGULATIONS

GENERAL
• A team must comprise six members plus two reserve players. A fee will be charged for each team.
• All team members must be employed by organizations within the information technology (IT) sector or companies specializing in software engineering and development (hereafter referred to as 'organization').
• An organization may register only one team, which must be either a men's team or a women's team; mixed-gender teams are not permitted.
• If an organization wishes to register an additional team, they must purchase a banner package or become a sponsor.
• The maximum number of teams that can be registered through the aforementioned method is four, consisting of up to two men's teams and two women's teams.
• Teams from sponsoring companies, as specified in the sponsorship scheme, will be exempt from the registration fee, and the registration limit will be extended exclusively for these teams. (The exact number of additional teams allowed is detailed within the sponsorship scheme)
• The tournament committee reserves the right to make decisions on any matters requiring arbitration, with their decision being final and binding.
• The organizing committee reserves the right to modify or suspend the rules as deemed necessary to ensure the smooth conduct of the tournament.

TOURNAMENT RULES
• All matches will be played on a knockout basis.
• Each team must consist of six members, with one member designated as the captain by the team. The captain will be responsible for registration, the coin toss, and other team-related matters.
• Every team member, excluding the wicketkeeper, is required to bowl one over. The wicketkeeper is not permitted to bowl.
• Each innings consists of five (5) overs, with four (4) balls per over. This structure may be modified by the organizing committee in the event of time constraints.
• A full toss delivery above waist height will be called No ball.
• Any delivery that passes over head height will be called a wide.
• The Mankad dismissal mode will not be permitted.
• If it is determined by the umpires that the ball has been thrown by the bowler, it will be called a No ball, to ensure fair delivery. If it is determined that the ball has been thrown more than once, the bowler's over will be banned, and the batting team will have the opportunity to select a bowler if no additional bowlers remain in the team.
• Short-pitched balls that rise above head height will be called wide balls.
• If short-pitched balls are bowled more than once in an over above shoulder height, they will also be called wide balls, and a warning will be given for the first infraction.
• For a wide or No ball, 4 runs will be awarded, and the delivery will be counted as a legitimate ball. If a wide or no-ball is delivered as the last ball of the final over in an innings, 1 run will be awarded, and that ball must be re-bowled.
• Runners for injured batsmen are not permitted.
• The match referees will have the final authority on any decisions regarding situations that arise during the game.

WINNERS
• The team that has scored the greatest number of runs will be declared the winner.
• If the scores are tied within the allocated overs, then the team which has lost the lesser number of wickets will be declared the winner.
• If both teams are still tied, then the spin of a coin will decide the winner.
• If the match is abandoned for any fair reason (like bad weather, etc.) or the team batting second has no chance to bat for at least two overs, then the winner will be decided by a spin of a coin.
• In case of a tie in the final match and if time and weather conditions permit, it is recommended to conduct a super over with the consent of both teams, foregoing the need for coin toss or wicket count.
`;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Define the store
interface OnboardingStore {
  step: number;
  activeTab: string;
  teamCounts: { male: number; female: number };
  termsModalOpen: boolean;
  isGeneratingPDF: boolean;
  isUpdatingPDF: boolean;
  isGeneratingTeamCardPDF: boolean;
  teams: OnboardingSchema['teams'];
  setTeams: (teams: OnboardingSchema['teams']) => void;
  pdfContent: string | null;
  setPdfContent: (content: string | null) => void;
  setStep: (step: number) => void;
  setActiveTab: (tab: string) => void;
  setTeamCounts: (counts: { male: number; female: number }) => void;
  setTermsModalOpen: (open: boolean) => void;
  setIsGeneratingPDF: (generating: boolean) => void;
  setIsUpdatingPDF: (updating: boolean) => void;
  setIsGeneratingTeamCardPDF: (generating: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  activeTab: 'team0',
  teamCounts: { male: 0, female: 0 },
  termsModalOpen: false,
  isGeneratingPDF: false,
  isUpdatingPDF: false,
  isGeneratingTeamCardPDF: false,
  teams: [],
  setTeams: (teams) => set({ teams }),
  pdfContent: null,
  setPdfContent: (content) => set({ pdfContent: content }),
  setStep: (step) => set({ step }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setTeamCounts: (teamCounts) => set({ teamCounts }),
  setTermsModalOpen: (termsModalOpen) => set({ termsModalOpen }),
  setIsGeneratingPDF: (isGeneratingPDF) => set({ isGeneratingPDF }),
  setIsUpdatingPDF: (isUpdatingPDF) => set({ isUpdatingPDF }),
  setIsGeneratingTeamCardPDF: (isGeneratingTeamCardPDF) =>
    set({ isGeneratingTeamCardPDF }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default function OnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    step,
    activeTab,
    teamCounts,
    termsModalOpen,
    teams,
    setTeams,
    pdfContent,
    setPdfContent,
    setStep,
    setActiveTab,
    setTeamCounts,
    setTermsModalOpen,
    isLoading,
  } = useOnboardingStore();

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      teams: [
        {
          name: '',
          gender: 'male',
          players: Array(8).fill({ name: '', nic: '', contactNumber: '' }),
        },
      ],
      acceptTerms: false,
    },
  });

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({
    control: form.control,
    name: 'teams',
  });

  //   useEffect(() => {
  //     if (step === 1 && !pdfContent) {
  //       const generatePDF = async () => {
  //         const blob = await pdf(<TeamCard teams={teams} />).toBlob();
  //         setPdfContent(URL.createObjectURL(blob));
  //       };
  //       generatePDF();
  //     }
  //   }, [step, teams, pdfContent, setPdfContent]);

  // Update Zustand store when form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.teams) {
        setTeams(value.teams as OnboardingSchema['teams']);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setTeams]);

  React.useEffect(() => {
    const maleTeams = teamFields.filter(
      (team) => team.gender === 'male'
    ).length;
    const femaleTeams = teamFields.filter(
      (team) => team.gender === 'female'
    ).length;
    setTeamCounts({ male: maleTeams, female: femaleTeams });

    toast({
      title: 'Team Counts Updated',
      description: `Male teams: ${maleTeams}, Female teams: ${femaleTeams}`,
      duration: 3000,
    });
  }, [teamFields, toast, setTeamCounts]);

  const submitTeamData = async (teams: OnboardingSchema['teams']) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const formattedTeams = teams.map((team) => ({
        team_name: team.name,
        gender: team.gender,
        team_members: team.players.map((player, index) => ({
          name: player.name,
          nic: player.nic,
          phone_number: player.contactNumber,
          sort_order: index + 1,
        })),
      }));

      //   const response = await api.post(
      //     '/api/v1/registration/team/',
      //     formattedTeams,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //         'Content-Type': 'application/json',
      //       },
      //     }
      //   );

      //   console.log('API Response:', response.data);

      toast({
        title: 'Success',
        description: 'Teams registered successfully!',
      });

      return true;
    } catch (error) {
      console.error('Error submitting team data:', error);
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: 'Error',
          description:
            error.response.data.detail ||
            'Failed to register teams. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
      return false;
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      //   const isValid = await validateTeams();
      const isValid = true;
      if (isValid) {
        const teamData = form.getValues('teams');
        console.log('Data sent from step 1 to step 2:', teamData);

        const success = await submitTeamData(teamData);
        if (success) {
          form.setValue('teams', [...teamData]);

          // Add a loading state
          const setIsLoading = useOnboardingStore.getState().setIsLoading;
          setIsLoading(true);

          // Wait for 5 seconds before moving to the next step
          setTimeout(() => {
            setIsLoading(false);
            setStep(2);
          }, 5000);
        }
      }
    } else if (step === 2) {
      setTimeout(() => {
        setStep(3);
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: OnboardingSchema) => {
    // This function will now handle the final submission
    console.log('Final form data:', data);
    toast({
      title: 'Success',
      description: 'Onboarding completed successfully!',
    });
    form.reset();
    router.push('/dashboard');
  };

  const addNewTeam = () => {
    if (teamFields.length >= 4) {
      toast({
        title: 'Maximum Teams Reached',
        description: 'You cannot add more than 4 teams in total.',
        variant: 'destructive',
      });
      return;
    }

    const newTeamGender = teamCounts.male < 2 ? 'male' : 'female';

    if (
      (newTeamGender === 'male' && teamCounts.male >= 2) ||
      (newTeamGender === 'female' && teamCounts.female >= 2)
    ) {
      toast({
        title: 'Gender Limit Reached',
        description: `You cannot add more than 2 ${newTeamGender} teams.`,
        variant: 'destructive',
      });
      return;
    }

    const newTeamIndex = teamFields.length;
    appendTeam({
      name: '',
      gender: newTeamGender,
      players: Array(8).fill({ name: '', nic: '', contactNumber: '' }),
    });
    setActiveTab(`team${newTeamIndex}`);

    toast({
      title: 'Team Added',
      description: `New ${newTeamGender} team added successfully.`,
    });
  };

  const validateTeams = async () => {
    const result = await form.trigger('teams');
    if (!result) {
      const errors = form.formState.errors;
      if (errors.teams) {
        toast({
          title: 'Validation Error',
          description: 'Please check all team details and try again.',
          variant: 'destructive',
        });
      }
    }
    return result;
  };

  const handleRemoveTeam = (index: number) => {
    removeTeam(index);
    setActiveTab(`team${Math.max(0, index - 1)}`);
    toast({
      title: 'Team Removed',
      description: 'The team has been successfully removed.',
    });
  };

  // New function to generate and download PDF
  const generateAndDownloadPDF = async (
    documentComponent: React.ReactElement,
    fileName: string
  ) => {
    const blob = await pdf(documentComponent).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Team Details</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="mb-4 flex items-center">
                <TabsList className="flex-grow">
                  {teamFields.map((team, index) => (
                    <TabsTrigger
                      key={team.id}
                      value={`team${index}`}
                      className="relative"
                    >
                      Team {index + 1}
                      {index > 0 && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0"
                            >
                              <X size={12} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the team and all its data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveTeam(index)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button
                  type="button"
                  onClick={addNewTeam}
                  className="ml-4 flex items-center"
                  variant="outline"
                  disabled={teamFields.length >= 4}
                >
                  <PlusCircle className="mr-2" size={16} />
                  Add Another Team
                </Button>
              </div>
              {teamFields.map((team, teamIndex) => (
                <TabsContent key={teamIndex} value={`team${teamIndex}`}>
                  <Card>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`teams.${teamIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`teams.${teamIndex}.gender`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Gender</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full rounded border p-2"
                                onChange={(e) => {
                                  const newGender = e.target.value as
                                    | 'male'
                                    | 'female';
                                  if (
                                    (newGender === 'male' &&
                                      teamCounts.male >= 2) ||
                                    (newGender === 'female' &&
                                      teamCounts.female >= 2)
                                  ) {
                                    toast({
                                      title: 'Gender Limit Reached',
                                      description: `You cannot have more than 2 ${newGender} teams.`,
                                      variant: 'destructive',
                                    });
                                    return;
                                  }
                                  field.onChange(e);
                                }}
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((playerIndex) => (
                        <div key={playerIndex} className="space-y-2">
                          <h4 className="font-semibold">
                            Player {playerIndex + 1}
                            {playerIndex >= 6 && (
                              <span className="ml-2 text-sm font-normal text-gray-500">
                                (Optional)
                              </span>
                            )}
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            <FormField
                              control={form.control}
                              name={`teams.${teamIndex}.players.${playerIndex}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  {playerIndex < 6 && <FormMessage />}
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`teams.${teamIndex}.players.${playerIndex}.nic`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>NIC</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  {playerIndex < 6 && <FormMessage />}
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`teams.${teamIndex}.players.${playerIndex}.contactNumber`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  {playerIndex < 6 && <FormMessage />}
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={isLoading}
              >
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
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Team Cards Preview</h2>
            <TeamCardDetails teams={teamFields} companyName={'companyName'} />
            <div className="mt-4 space-y-4">
              <Button
                onClick={() =>
                  generateAndDownloadPDF(
                    <TeamCard teams={teamFields} companyName={'companyName'} />,
                    'team_cards.pdf'
                  )
                }
              >
                Download Team Cards PDF
              </Button>
              <p className="text-sm text-gray-600">
                Please download the team card PDF and have it verified and
                signed by a Human Resource Executive from your company.
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <Button type="button" onClick={() => setStep(1)}>
                Previous
              </Button>
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Invoice Preview</h2>
            <InvoiceDetails {...invoiceData} />
            <Button
              onClick={() =>
                generateAndDownloadPDF(
                  <InvoicePDF {...invoiceData} />,
                  'invoice.pdf'
                )
              }
              className="mt-4"
            >
              Download Invoice PDF
            </Button>
            <div className="mt-4 flex items-center justify-between">
              <Button type="button" onClick={() => setStep(2)}>
                Previous
              </Button>
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Payment Details</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="paymentSlip"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Upload Payment Slip</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certifiedTeamCard"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Upload Certified Team Card</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the{' '}
                        <Dialog
                          open={termsModalOpen}
                          onOpenChange={setTermsModalOpen}
                        >
                          <DialogTrigger asChild>
                            <span className="cursor-pointer text-blue-600 underline">
                              rules and regulations
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Rules and Regulations</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="max-h-[60vh]">
                              <div className="whitespace-pre-wrap p-4">
                                {rulesAndRegulations}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <Button type="button" onClick={() => setStep(3)}>
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
