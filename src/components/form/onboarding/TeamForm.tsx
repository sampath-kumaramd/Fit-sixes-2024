import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OnboardingSchema } from './schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TeamFormProps {
  form: UseFormReturn<OnboardingSchema>;
  teamIndex: number;
}

export default function TeamForm({ form, teamIndex }: TeamFormProps) {
  const { register, control } = form;

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name={`teams.${teamIndex}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter team name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`teams.${teamIndex}.gender`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Players</h3>
        {[0, 1, 2, 3, 4, 5].map((playerIndex) => (
          <Card key={playerIndex}>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">Player {playerIndex + 1}</h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={control}
                  name={`teams.${teamIndex}.players.${playerIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Player name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`teams.${teamIndex}.players.${playerIndex}.nic`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIC</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="NIC number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`teams.${teamIndex}.players.${playerIndex}.contactNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Contact number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
