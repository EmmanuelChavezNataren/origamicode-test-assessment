export interface Appointment {
  id: number;
  email: string;
  phoneNumber: string;
  date: string;
}

export type AppointmentData = Appointment[];

export type SectionOps = 'all' | 'top5' | 'empty';
