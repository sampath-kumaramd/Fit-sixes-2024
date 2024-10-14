'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FieldArrayWithId } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';
import { Loader2 } from 'lucide-react'; // Add this import

import { useToast } from '@/hooks/use-toast';
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
} from '../ui';
import { PlusCircle, Download } from 'lucide-react';
import TeamCard from '../TeamCard';
import InvoicePDF from '../Invoice';

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
    .length(6, 'Each team must have exactly 6 players'),
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

// const TeamCard = ({ team }: { team: z.infer<typeof teamSchema> }) => (
//   <Card className="mb-4 p-4">
//     <h3 className="mb-2 text-xl font-bold">{team.name}</h3>
//     <p className="mb-2">Gender: {team.gender}</p>
//     <h4 className="mb-2 font-semibold">Players:</h4>
//     <ul>
//       {team.players.map((player, index) => (
//         <li key={index} className="mb-1">
//           {player.name} - NIC: {player.nic} - Contact: {player.contactNumber}
//         </li>
//       ))}
//     </ul>
//   </Card>
// );

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

export default function OnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState('team0');
  const [teamCounts, setTeamCounts] = useState({ male: 0, female: 0 });
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      teams: [
        {
          name: '',
          gender: 'male',
          players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
        },
      ],
      acceptTerms: false,
    },
  });

  const { fields: teamFields, append: appendTeam } = useFieldArray({
    control: form.control,
    name: 'teams',
  });

  useEffect(() => {
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
  }, [teamFields, toast]);

  const onSubmit = async (data: OnboardingSchema) => {
    console.log(data);
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
      players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
    });
    setActiveTab(`team${newTeamIndex}`);

    toast({
      title: 'Team Added',
      description: `New ${newTeamGender} team added successfully.`,
    });
  };

  const generateTeamCard = (
    team: FieldArrayWithId<OnboardingSchema, 'teams', 'id'>
  ) => {
    // In a real application, you would generate a PDF or image here
    // For this example, we'll just create a data URL with team info
    const teamInfo = JSON.stringify(team, null, 2);
    const dataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(teamInfo)}`;
    return dataUrl;
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

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await validateTeams();
      if (isValid) {
        setIsGeneratingPDF(true);
        // Simulate PDF generation delay
        setTimeout(() => {
          setIsGeneratingPDF(false);
          setStep(2);
        }, 1500);
      }
    } else if (step === 2) {
      setIsGeneratingPDF(true);
      // Simulate PDF generation delay
      setTimeout(() => {
        setIsGeneratingPDF(false);
        setStep(3);
      }, 1500);
    } else {
      setStep(step + 1);
    }
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
                    <TabsTrigger key={index} value={`team${index}`}>
                      Team {index + 1}
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
                      {[0, 1, 2, 3, 4, 5].map((playerIndex) => (
                        <div key={playerIndex} className="space-y-2">
                          <h4 className="font-semibold">
                            Player {playerIndex + 1}
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            <FormField
                              control={form.control}
                              name={`teams.${teamIndex}.players.${playerIndex}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} required />
                                  </FormControl>
                                  <FormMessage />
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
                                    <Input {...field} required />
                                  </FormControl>
                                  <FormMessage />
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
                                    <Input {...field} required />
                                  </FormControl>
                                  <FormMessage />
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
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Team Cards Preview</h2>
            {isGeneratingPDF ? (
              <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Generating Team Cards...</span>
              </div>
            ) : (
              <div className="mb-4 flex h-screen items-center justify-center">
                <PDFViewer className="h-full max-h-[80vh] w-full max-w-5xl">
                  <TeamCard teams={teamFields} />
                </PDFViewer>
              </div>
            )}

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
            {isGeneratingPDF ? (
              <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Generating Invoice...</span>
              </div>
            ) : (
              <div className="mb-4 flex h-screen items-center justify-center">
                <PDFViewer className="h-full max-h-[80vh] w-full max-w-5xl">
                  <InvoicePDF teams={teamFields} />
                </PDFViewer>
              </div>
            )}

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
                              terms and conditions
                            </span>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Terms and Conditions</DialogTitle>
                            </DialogHeader>
                            <div className="max-h-[60vh] overflow-y-auto">
                              {/* Add your terms and conditions text here */}
                              <p>These are the terms and conditions...</p>
                            </div>
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
