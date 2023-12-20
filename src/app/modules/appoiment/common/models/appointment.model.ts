export interface Appointment {
  id: number;
  email: string;
  phoneNumber: string;
  date: string;
}

export type AppointmentData = Appointment[];
