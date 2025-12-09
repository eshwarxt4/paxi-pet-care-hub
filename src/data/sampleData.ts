// Sample data for PAXI Parent Module

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  sex: string;
  weight: string;
  vaccinationStatus: string;
  regularMeds: string;
  photos: string[];
  ownerId: string;
}

export interface Doctor {
  id: string;
  name: string;
  clinic: string;
  experience: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  acceptingBookings: boolean;
  visitTypes: ('in-clinic' | 'video')[];
  avatar: string;
  availableSlots: { date: string; times: string[] }[];
}

export interface Appointment {
  id: string;
  petId: string;
  doctorId: string;
  date: string;
  time: string;
  visitType: 'in-clinic' | 'video';
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  intake?: IntakeData;
  onboardingTest?: OnboardingTestData;
  createdAt: string;
}

export interface IntakeData {
  problemCategories: string[];
  onset: string;
  progression: string;
  severity: number;
  keySigns: string[];
  keySignsNotes: string;
  recentMeds: string;
  exposures: string;
  photos: string[];
  consent: boolean;
}

export interface OnboardingTestData {
  timeline: { day: string; description: string }[];
  atHomeActions: string;
  appetite: string;
  waterIntake: string;
  mobility: string;
  observedChanges: string;
  changeSinceBooking: string;
  additionalPhotos: string[];
}

export interface HistoryRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  petId: string;
  doctorId?: string;
  prescription?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Notification {
  id: string;
  type: 'reminder' | 'approval' | 'action' | 'message';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Sample Owner
export const sampleOwner: Owner = {
  id: 'owner-1',
  name: 'Akhil Sharma',
  phone: '+91-98765-43210',
  email: 'akhil.demo@example.com',
};

// Sample Pets
export const samplePets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Pandu',
    species: 'Dog',
    breed: 'Husky',
    age: '3 years 4 months',
    sex: 'Male',
    weight: '24 kg',
    vaccinationStatus: 'Up-to-date',
    regularMeds: 'None',
    photos: [
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1617895153857-3cfe49a69a5e?w=400&h=400&fit=crop',
    ],
    ownerId: 'owner-1',
  },
];

// Sample Doctors
export const sampleDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Eshwar Naik',
    clinic: 'GreenPaws Vet Clinic',
    experience: '12+ years',
    specializations: ['General Practice', 'Dermatology', 'Internal Medicine'],
    rating: 4.8,
    reviewCount: 234,
    acceptingBookings: true,
    visitTypes: ['in-clinic', 'video'],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
    availableSlots: [
      { date: '2025-12-10', times: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'] },
      { date: '2025-12-11', times: ['09:30 AM', '11:00 AM', '01:00 PM', '03:30 PM'] },
      { date: '2025-12-12', times: ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'] },
    ],
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Menon',
    clinic: 'PetCare Plus Hospital',
    experience: '8 years',
    specializations: ['Surgery', 'Orthopedics', 'Emergency Care'],
    rating: 4.9,
    reviewCount: 189,
    acceptingBookings: true,
    visitTypes: ['in-clinic'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    availableSlots: [
      { date: '2025-12-10', times: ['10:00 AM', '01:00 PM', '03:00 PM'] },
      { date: '2025-12-11', times: ['09:00 AM', '11:00 AM', '02:00 PM'] },
    ],
  },
  {
    id: 'doc-3',
    name: 'Dr. Rahul Kapoor',
    clinic: 'City Animal Hospital',
    experience: '15+ years',
    specializations: ['Cardiology', 'Senior Pet Care', 'Nutrition'],
    rating: 4.7,
    reviewCount: 312,
    acceptingBookings: true,
    visitTypes: ['in-clinic', 'video'],
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop',
    availableSlots: [
      { date: '2025-12-10', times: ['11:00 AM', '02:30 PM', '04:00 PM'] },
      { date: '2025-12-12', times: ['09:00 AM', '10:30 AM', '01:00 PM', '03:00 PM'] },
    ],
  },
];

// Sample Intake Data
export const sampleIntake: IntakeData = {
  problemCategories: ['Skin', 'Infection'],
  onset: '3 days ago',
  progression: 'Worsening',
  severity: 6,
  keySigns: ['Itching', 'Redness', 'Oozing'],
  keySignsNotes: 'Noticed the itching first, then redness appeared on the flank area',
  recentMeds: 'None',
  exposures: 'Park visit 4 days ago',
  photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop'],
  consent: true,
};

// Sample Onboarding Test Data
export const sampleOnboardingTest: OnboardingTestData = {
  timeline: [
    { day: 'Day -3', description: 'Started scratching frequently' },
    { day: 'Day -2', description: 'Noticed redness on left flank' },
    { day: 'Day -1', description: 'Area started oozing slightly' },
  ],
  atHomeActions: 'Applied cold compress, tried to prevent scratching',
  appetite: 'Normal',
  waterIntake: 'Normal',
  mobility: 'Normal',
  observedChanges: 'The redness seems to have spread slightly',
  changeSinceBooking: 'No major changes, still itching',
  additionalPhotos: [],
};

// Sample History Records
export const sampleHistory: HistoryRecord[] = [
  {
    id: 'hist-1',
    date: '2025-04-10',
    type: 'Vaccination',
    description: 'Annual vaccination - Rabies & DHPP',
    petId: 'pet-1',
    doctorId: 'doc-1',
    status: 'completed',
  },
  {
    id: 'hist-2',
    date: '2025-09-12',
    type: 'Ear Infection',
    description: 'Treatment for ear infection - Prescription added',
    petId: 'pet-1',
    doctorId: 'doc-2',
    prescription: 'Ear drops - twice daily for 7 days',
    status: 'completed',
  },
  {
    id: 'hist-3',
    date: '2025-12-09',
    type: 'Skin Issue',
    description: 'Skin irritation and itching - Pending vet review',
    petId: 'pet-1',
    doctorId: 'doc-1',
    status: 'pending',
  },
];

// Sample Notifications
export const sampleNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'action',
    title: 'Photo Needed',
    message: 'Please upload a clearer photo of the affected area',
    read: false,
    createdAt: '2025-12-09T10:30:00',
    actionUrl: '/appointments/apt-1',
  },
  {
    id: 'notif-2',
    type: 'reminder',
    title: 'Upcoming Appointment',
    message: 'Your appointment with Dr. Eshwar Naik is in 24 hours',
    read: false,
    createdAt: '2025-12-09T09:00:00',
  },
  {
    id: 'notif-3',
    type: 'approval',
    title: 'Appointment Approved',
    message: 'Dr. Eshwar Naik has approved your appointment',
    read: true,
    createdAt: '2025-12-08T15:00:00',
  },
  {
    id: 'notif-4',
    type: 'action',
    title: 'Onboarding Test Required',
    message: 'Please complete the onboarding questionnaire before your visit',
    read: false,
    createdAt: '2025-12-08T15:05:00',
    actionUrl: '/onboarding-test',
  },
  {
    id: 'notif-5',
    type: 'message',
    title: 'Prescription Ready',
    message: 'Your prescription from Dr. Priya Menon is ready to view',
    read: true,
    createdAt: '2025-09-12T16:00:00',
  },
];

// Problem Categories for Intake Form
export const problemCategories = [
  'Skin',
  'Digestive',
  'Respiratory',
  'Eyes',
  'Ears',
  'Dental',
  'Infection',
  'Injury',
  'Behavioral',
  'Mobility',
  'Urinary',
  'Other',
];

// Key Signs Options
export const keySignsOptions = [
  'Itching',
  'Redness',
  'Swelling',
  'Oozing',
  'Hair Loss',
  'Vomiting',
  'Diarrhea',
  'Loss of Appetite',
  'Lethargy',
  'Limping',
  'Coughing',
  'Sneezing',
  'Eye Discharge',
  'Ear Discharge',
  'Bad Breath',
  'Excessive Thirst',
  'Frequent Urination',
  'Weight Loss',
  'Weight Gain',
  'Behavioral Change',
];

// Progression Options
export const progressionOptions = ['Improving', 'Stable', 'Worsening', 'Fluctuating'];

// General Status Options
export const statusOptions = ['Normal', 'Reduced', 'Increased', 'Absent'];
