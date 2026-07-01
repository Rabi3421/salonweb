export type CustomerAccount = {
  id: string;
  role: 'end_user';
  customerNo: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  city: string;
  status: string;
  favoriteServices: string[];
  preferredStylistName: string;
  allergies: string;
  hairSkinNotes: string;
  marketingConsent: boolean;
  totalVisits: number;
  totalSpent: number;
  dueAmount: number;
  lastVisitAt: string;
  nextAppointmentAt: string;
  accountCreatedAt: string;
  lastLoginAt: string;
};

export type CustomerDashboardAppointment = {
  id: string;
  appointmentNo: string;
  customerName: string;
  services: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
    category: string;
  }>;
  stylistName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  source: string;
  totalAmount: number;
  paidAmount: number;
  notes: string;
};

export type CustomerDashboardData = {
  customer: CustomerAccount;
  salon: {
    salonId: string;
    name: string;
    phone: string;
    email: string;
  };
  stats: {
    totalAppointments: number;
    completedAppointments: number;
    totalVisits: number;
    totalSpent: number;
    dueAmount: number;
  };
  upcomingAppointments: CustomerDashboardAppointment[];
  recentAppointments: CustomerDashboardAppointment[];
};
