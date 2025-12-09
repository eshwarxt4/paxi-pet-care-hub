import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Owner,
  Pet,
  Appointment,
  Notification,
  IntakeData,
  OnboardingTestData,
  sampleOwner,
  samplePets,
  sampleNotifications,
  sampleIntake,
  sampleOnboardingTest,
} from '@/data/sampleData';

interface AppState {
  isAuthenticated: boolean;
  owner: Owner | null;
  pets: Pet[];
  currentPetId: string | null;
  appointments: Appointment[];
  notifications: Notification[];
  currentAppointment: Appointment | null;
  chatOpen: boolean;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  setCurrentPet: (petId: string) => void;
  updatePet: (pet: Pet) => void;
  addPet: (pet: Pet) => void;
  updateOwner: (owner: Owner) => void;
  createAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  setCurrentAppointment: (appointment: Appointment | null) => void;
  markNotificationRead: (notificationId: string) => void;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isAuthenticated: false,
    owner: null,
    pets: [],
    currentPetId: null,
    appointments: [],
    notifications: [],
    currentAppointment: null,
    chatOpen: false,
  });

  const login = (email: string, password: string) => {
    // Simulate login with sample data
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      owner: sampleOwner,
      pets: samplePets,
      currentPetId: samplePets[0]?.id || null,
      notifications: sampleNotifications,
      appointments: [
        {
          id: 'apt-1',
          petId: 'pet-1',
          doctorId: 'doc-1',
          date: '2025-12-10',
          time: '10:00 AM',
          visitType: 'in-clinic',
          status: 'approved',
          intake: sampleIntake,
          onboardingTest: sampleOnboardingTest,
          createdAt: '2025-12-08T14:00:00',
        },
      ],
    }));
  };

  const signup = (email: string, password: string, name: string) => {
    const newOwner: Owner = {
      id: 'owner-new',
      name: name,
      phone: '',
      email: email,
    };
    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      owner: newOwner,
      pets: [],
      currentPetId: null,
      notifications: [],
      appointments: [],
    }));
  };

  const logout = () => {
    setState({
      isAuthenticated: false,
      owner: null,
      pets: [],
      currentPetId: null,
      appointments: [],
      notifications: [],
      currentAppointment: null,
      chatOpen: false,
    });
  };

  const setCurrentPet = (petId: string) => {
    setState((prev) => ({ ...prev, currentPetId: petId }));
  };

  const updatePet = (pet: Pet) => {
    setState((prev) => ({
      ...prev,
      pets: prev.pets.map((p) => (p.id === pet.id ? pet : p)),
    }));
  };

  const addPet = (pet: Pet) => {
    setState((prev) => ({
      ...prev,
      pets: [...prev.pets, pet],
      currentPetId: pet.id,
    }));
  };

  const updateOwner = (owner: Owner) => {
    setState((prev) => ({ ...prev, owner }));
  };

  const createAppointment = (appointment: Appointment) => {
    setState((prev) => ({
      ...prev,
      appointments: [...prev.appointments, appointment],
      currentAppointment: appointment,
    }));
  };

  const updateAppointment = (appointment: Appointment) => {
    setState((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) =>
        a.id === appointment.id ? appointment : a
      ),
      currentAppointment:
        prev.currentAppointment?.id === appointment.id
          ? appointment
          : prev.currentAppointment,
    }));
  };

  const setCurrentAppointment = (appointment: Appointment | null) => {
    setState((prev) => ({ ...prev, currentAppointment: appointment }));
  };

  const markNotificationRead = (notificationId: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
    }));
  };

  const toggleChat = () => {
    setState((prev) => ({ ...prev, chatOpen: !prev.chatOpen }));
  };

  const setChatOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, chatOpen: open }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        setCurrentPet,
        updatePet,
        addPet,
        updateOwner,
        createAppointment,
        updateAppointment,
        setCurrentAppointment,
        markNotificationRead,
        toggleChat,
        setChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
