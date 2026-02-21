export interface Turf {
  id: string;
  name: string;
  sportId: string;
  type: string;
  location: string;
  pricePerHour: number;
  image: string;
  amenities: string[];
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  turfId: string;
  sportId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  isPending?: boolean;
  pendingUntil?: number;
  customerDetails?: {
    name: string;
    email: string;
    phone: string;
    paymentMethod: string;
  };
}

export interface Booking {
  id: string;
  turfId: string;
  sportId: string;
  slotId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  paymentMethod: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  sportId: string;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export let TURFS: Turf[] = [
  {
    id: 'turf-1',
    name: 'Elite Multi-Sport Arena',
    sportId: 'football',
    type: '5v5 / Box Cricket',
    location: 'HSR Layout, Bangalore',
    pricePerHour: 1200,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    amenities: ['Floodlights', 'Changing Room', 'Parking', 'Water'],
    isActive: true,
  },
  {
    id: 'turf-2',
    name: 'Elite Multi-Sport Arena',
    sportId: 'cricket',
    type: 'Box Cricket',
    location: 'HSR Layout, Bangalore',
    pricePerHour: 1500,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    amenities: ['Nets', 'Changing Room', 'Equipment', 'Parking'],
    isActive: true,
  }
];

const SLOTS_CACHE: Record<string, TimeSlot[]> = {};

export const addTurf = (turf: Omit<Turf, 'id' | 'isActive' | 'amenities'>) => {
  const newTurf: Turf = {
    ...turf,
    id: `turf-${Date.now()}`,
    isActive: true,
    amenities: ['Floodlights', 'Parking', 'Water'],
    image: turf.sportId === 'football' 
      ? 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'
      : 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80'
  };
  TURFS.push(newTurf);
  return newTurf;
};

export const deleteTurf = (id: string) => {
  const index = TURFS.findIndex(t => t.id === id);
  if (index !== -1) {
    TURFS.splice(index, 1);
  }
};

export const updateTurf = (id: string, updates: Partial<Turf>) => {
  const index = TURFS.findIndex(t => t.id === id);
  if (index !== -1) {
    TURFS[index] = { ...TURFS[index], ...updates };
  }
};

export const generateTimeSlots = (date: string, sportId: string): TimeSlot[] => {
  const cacheKey = `${date}-${sportId}`;
  const now = Date.now();

  if (SLOTS_CACHE[cacheKey]) {
    SLOTS_CACHE[cacheKey] = SLOTS_CACHE[cacheKey].map(slot => {
      if (slot.isPending && slot.pendingUntil && now > slot.pendingUntil) {
        return { ...slot, isPending: false, pendingUntil: undefined };
      }
      return slot;
    });
    return SLOTS_CACHE[cacheKey];
  }

  const slots: TimeSlot[] = [];
  const turfs = TURFS.filter((t) => t.sportId === sportId);
  const hours = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
  ];

  turfs.forEach((turf) => {
    hours.forEach((hour, index) => {
      const endHour = hours[index + 1] || '00:00';
      slots.push({
        id: `slot-${turf.id}-${date}-${hour}`,
        turfId: turf.id,
        sportId: turf.sportId,
        date,
        startTime: hour,
        endTime: endHour,
        price: turf.pricePerHour,
        isBooked: false,
      });
    });
  });

  SLOTS_CACHE[cacheKey] = slots;
  return slots;
};

export const setSlotPending = (slotId: string, date: string, sportId: string) => {
  const cacheKey = `${date}-${sportId}`;
  if (SLOTS_CACHE[cacheKey]) {
    SLOTS_CACHE[cacheKey] = SLOTS_CACHE[cacheKey].map(slot => 
      slot.id === slotId ? { ...slot, isPending: true, pendingUntil: Date.now() + 5 * 60 * 1000 } : slot
    );
  }
};

export const confirmBooking = (slotId: string, date: string, sportId: string, customerDetails: any) => {
  const cacheKey = `${date}-${sportId}`;
  if (SLOTS_CACHE[cacheKey]) {
    SLOTS_CACHE[cacheKey] = SLOTS_CACHE[cacheKey].map(slot => 
      slot.id === slotId ? { 
        ...slot, 
        isBooked: true, 
        isPending: false, 
        pendingUntil: undefined,
        customerDetails 
      } : slot
    );
  }
};

export const BOOKINGS: Booking[] = [];
export const TRANSACTIONS: Transaction[] = [];

export const getRevenueData = () => [
  { name: 'Week 8', football: 0, cricket: 0 },
];

export const getSportRevenueDistribution = () => [
  { name: 'Football', value: 0, fill: '#00E676' },
  { name: 'Cricket', value: 0, fill: '#1565C0' },
];
