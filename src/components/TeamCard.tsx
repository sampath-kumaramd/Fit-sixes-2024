'use client';

import React from 'react';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import { z } from 'zod';

// Register custom fonts
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#030835',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 10,
    color: '#030835',
  },
  teamCard: {
    marginBottom: 30,
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#F3F4F6',
  },
  companyName: {
    fontSize: 14,
    color: '#4B5563',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
    color: '#1E40AF',
  },
  teamInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  teamGender: {
    fontSize: 14,
    color: '#4B5563',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderBottomColor: '#030835',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#383B5E',
    opacity: 0.6,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 700,
    color: '#030835',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  signatureSection: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#030835',
  },
  signatureField: {
    marginBottom: 15,
  },
  confirmationText: {
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 10,
  },
  signatureDetails: {
    fontSize: 12,
    marginVertical: 5,
    textAlign: 'left',
  },
  note: {
    fontSize: 10,
    marginTop: 10,
    textAlign: 'left',
  },
});

interface Player {
  name: string;
  nic: string;
  contactNumber: string;
}

interface Team {
  name: string;
  gender: string;
  players: Player[];
}

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

const TeamCardPDF = ({
  teams,
  companyName,
}: {
  teams: z.infer<typeof teamSchema>[];
  companyName: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image source="/LetterHead.png" />
        <Text style={styles.title}>Team Cards</Text>
        <Text style={styles.companyName}> Company : {companyName}</Text>{' '}
        {/*make dynamic */}
      </View>
      {teams.map((team, index) => (
        <View key={index} style={styles.teamCard}>
          <Text style={styles.teamName}>{team.name}</Text>
          <View style={styles.teamInfo}>
            <Text style={styles.teamGender}>Gender: {team.gender}</Text>
            <Text style={styles.teamGender}>
              Team {index + 1} of {teams.length}
            </Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Name</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>NIC</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Contact Number</Text>
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
                    <Text style={styles.tableCell}>{player.contactNumber}</Text>
                  </View>
                </View>
              )
            )}
          </View>
        </View>
      ))}
      <View style={styles.signatureSection}>
        <Text style={styles.confirmationText}>
          I hereby confirm that the individuals listed on this team card/s are
          official members of our organization.
        </Text>

        <View style={styles.signatureDetails}>
          <Text style={styles.signatureField}>
            Signature of the Human Resource Executive:
            ________________________________
          </Text>
          <Text style={styles.signatureField}>
            Name: ________________________________
          </Text>
          <Text style={styles.signatureField}>
            Designation: ________________________________
          </Text>
          <Text style={styles.signatureField}>
            Date: ________________________________
          </Text>
        </View>

        <Text style={styles.note}>
          Note: This confirmation is taken only to verify whether each player is
          an employee of the company. If a member of the squad changes, certain
          player/players must have sufficient proof (e.g., company ID, email,
          etc.) on the event day to validate him/her as an employee of the
          company.
        </Text>
      </View>
    </Page>
  </Document>
);

export default TeamCardPDF;
