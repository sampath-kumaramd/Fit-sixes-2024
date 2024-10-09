'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';
import { SignInSchema, signInSchema } from '@/schemas';

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
} from '../ui';

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      companyName: '',
      password: '',
      maleTeamCount: 0,
      femaleTeamCount: 0,
      teams: [],
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

  const onSubmit = async (data: SignInSchema) => {
    console.log(data);
    // Here you would typically send the data to your backend
    toast({
      title: 'Success',
      description: 'Registration submitted successfully!',
    });
    // Reset form and redirect
    form.reset();
    router.push('/auth/sign-in');
  };

  const handleTeamCountChange = (gender: string, count: number) => {
    const currentCount =
      gender === 'male'
        ? form.getValues('maleTeamCount')
        : form.getValues('femaleTeamCount');
    const difference = count - currentCount;

    if (difference > 0) {
      // Add new teams
      for (let i = 0; i < difference; i++) {
        appendTeam({
          name: '',
          gender: gender as 'male' | 'female',
          players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
        });
      }
    } else if (difference < 0) {
      // Remove teams
      const startIndex = teamFields.length + difference;
      for (let i = teamFields.length - 1; i >= startIndex; i--) {
        if (teamFields[i].gender === gender) {
          removeTeam(i);
        }
      }
    }

    form.setValue(
      gender === 'male' ? 'maleTeamCount' : 'femaleTeamCount',
      count
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Company Details</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="button" onClick={() => setStep(2)} className="mt-4">
              Next
            </Button>
            <div className="flex justify-start items-center gap-2 mt-4">
              <p>Don&apos;t have an account?</p>
              <Link href="/auth/sign-up">Sign Up</Link>
            </div>
            <div className="flex justify-start items-center gap-2 mt-4">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Team Counts</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maleTeamCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Male Teams</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          handleTeamCountChange(
                            'male',
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="femaleTeamCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Female Teams</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          handleTeamCountChange(
                            'female',
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={() => setStep(1)}>
                Previous
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Team Details</h2>
            <Tabs defaultValue="team0">
              <TabsList>
                {teamFields.map((team, index) => (
                  <TabsTrigger key={index} value={`team${index}`}>
                    Team {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
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
                                    <Input {...field} />
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
                                    <Input {...field} />
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
                                    <Input {...field} />
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
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={() => setStep(2)}>
                Previous
              </Button>
              <Button type="button" onClick={() => setStep(4)}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <FormField
              control={form.control}
              name="paymentSlip"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Upload Payment Slip</FormLabel>
                  <FormControl>
                    {/* <Input
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...rest}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between mt-4">
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
