export enum View {
  DASHBOARD = 'DASHBOARD',
  PROGRESS = 'PROGRESS',
  HANDBOOK = 'HANDBOOK',
  LOGS = 'LOGS',
  VERIFIED_LOGS = 'VERIFIED_LOGS',
  TOOLS = 'TOOLS',
  CONTACT = 'CONTACT',
}

export interface ProgramLogEntry {
  id: string;
  date: string;
  personName: string;
  description: string;
  duration: string;
  signature: string;
  isWingMentor: boolean;
  status: 'Draft' | 'Pending' | 'Verified';
}

export interface HandbookSection {
  id: string;
  title: string;
  category: 'General' | 'Emergency' | 'Systems' | 'Performance';
  lastUpdated: string;
}

export interface ChartDataPoint {
  name: string;
  hours: number;
  target: number;
}
