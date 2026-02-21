import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Sport {
  id: string;
  name: string;
  icon: string;
  accentColor: string;
  darkBackground: string;
  description: string;
  startingPrice: number;
  availableTurfs: number;
  defaultDuration: number;
  isActive: boolean;
}

export const SPORTS_DATA: Record<string, Sport> = {
  football: {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    accentColor: '#00E676',
    darkBackground: 'linear-gradient(135deg, #0a4d2e 0%, #0d1f17 100%)',
    description: 'Book premium football turfs',
    startingPrice: 1200,
    availableTurfs: 1,
    defaultDuration: 60,
    isActive: true,
  },
  cricket: {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    accentColor: '#1565C0',
    darkBackground: 'linear-gradient(135deg, #0d3b66 0%, #0a1929 100%)',
    description: 'Book premium cricket pitches',
    startingPrice: 1500,
    availableTurfs: 1,
    defaultDuration: 90,
    isActive: true,
  }
};

interface SportContextType {
  currentSport: Sport;
  setCurrentSport: (sport: Sport) => void;
  sports: Record<string, Sport>;
  updateSport: (sportId: string, updates: Partial<Sport>) => void;
}

const SportContext = createContext<SportContextType | undefined>(undefined);

export const SportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sports, setSports] = useState<Record<string, Sport>>(SPORTS_DATA);
  const [currentSport, setCurrentSportState] = useState<Sport>(SPORTS_DATA.football);

  const setCurrentSport = (sport: Sport) => {
    setCurrentSportState(sport);
    document.documentElement.style.setProperty('--sport-accent', sport.accentColor);
    document.documentElement.style.setProperty('--sport-background', sport.darkBackground);
  };

  const updateSport = (sportId: string, updates: Partial<Sport>) => {
    setSports((prev) => ({
      ...prev,
      [sportId]: { ...prev[sportId], ...updates },
    }));
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--sport-accent', currentSport.accentColor);
    document.documentElement.style.setProperty('--sport-background', currentSport.darkBackground);
  }, [currentSport]);

  return (
    <SportContext.Provider value={{ currentSport, setCurrentSport, sports, updateSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSport = () => {
  const context = useContext(SportContext);
  if (context === undefined) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
};
