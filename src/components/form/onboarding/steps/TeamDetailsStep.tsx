import React, { useEffect, useState } from 'react';
import { Loader2, PlusCircle, X, Trash2 } from 'lucide-react';
import { useFieldArray, UseFormReturn  , FieldPath} from 'react-hook-form';

import { OnboardingSchema } from '../schema';
import { useOnboardingStore } from '../store';

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
} from '@/components/ui';
import { useToast } from '@/hooks/use-toast';

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
    isLoading,
    teamCounts,
    setTeamCounts,
    includeHut,
    setIncludeHut,
  } = useOnboardingStore();

  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({
    control: form.control,
    name: 'teams',
  });

  const { toast } = useToast();

  const [optionalPlayers, setOptionalPlayers] = useState<number[]>(Array(4).fill(0));

  useEffect(() => {
    const initialOptionalPlayers = teamFields.map(team => 
      team.players.filter((_, index) => index >= 6).length
    );
    setOptionalPlayers(initialOptionalPlayers);
  }, [teamFields]);

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
  }, [teamFields, toast, setTeamCounts]);

  const handleRemoveTeam = (index: number) => {
    removeTeam(index);
    setActiveTab(`team${Math.max(0, index - 1)}`);
    toast({
      title: 'Team Removed',
      description: 'The team has been successfully removed.',
    });
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

  const addOptionalPlayer = (teamIndex: number) => {
    if (optionalPlayers[teamIndex] < 2) {
      const newOptionalPlayers = [...optionalPlayers];
      newOptionalPlayers[teamIndex] += 1;
      setOptionalPlayers(newOptionalPlayers);
    }
  };

  const removeOptionalPlayer = (teamIndex: number, playerIndex: number) => {
    const newOptionalPlayers = [...optionalPlayers];
    newOptionalPlayers[teamIndex] -= 1;
    setOptionalPlayers(newOptionalPlayers);

    // Remove the player from the form
    const players = form.getValues(`teams.${teamIndex}.players`);
    const updatedPlayers = players.filter((_, index) => index !== playerIndex);
    form.setValue(`teams.${teamIndex}.players`, updatedPlayers);

    // Trigger form validation
    form.trigger(`teams.${teamIndex}.players`);
  };

  return (
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
                          This action cannot be undone. This will permanently
                          delete the team and all its data.
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
              <CardContent className="space-y-4 pt-6">
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
                              (newGender === 'male' && teamCounts.male >= 2) ||
                              (newGender === 'female' && teamCounts.female >= 2)
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
                  <div
                    key={playerIndex}
                    className="space-y-2 rounded-lg border-2 border-gray-200 p-4 md:border-0 md:p-0"
                  >
                    <h4 className="font-semibold">
                      Player {playerIndex + 1}
                      {playerIndex >= 6 && (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          (Optional)
                        </span>
                      )}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
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
                {[...Array(optionalPlayers[teamIndex])].map((_, index) => (
                  <div
                    key={`optional-${index}`}
                    className="space-y-2 rounded-lg border-2 border-gray-200 p-4 md:border-0 md:p-0"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        Optional Player {index + 1}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          (Optional)
                        </span>
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOptionalPlayer(teamIndex, 6 + index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name={`teams.${teamIndex}.players.${6 + index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`teams.${teamIndex}.players.${6 + index}.nic`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIC</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`teams.${teamIndex}.players.${6 + index}.contactNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
                {optionalPlayers[teamIndex] < 2 && (
                  <Button
                    type="button"
                    onClick={() => addOptionalPlayer(teamIndex)}
                    className="mt-4"
                    variant="outline"
                  >
                    <PlusCircle className="mr-2" size={16} />
                    Add Optional Player
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-4">
        <FormField
          control={form.control}
          name="includeHut"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value || includeHut}
                  onCheckedChange={(checked: boolean) => {
                    field.onChange(checked);
                    setIncludeHut(checked);
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Include Hut (Additional 8,000 LKR)</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {includeHut ? 'Hut included' : 'Hut not included'}
        </div>
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
