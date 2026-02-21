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
  bookedBy?: string;
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

export const TURFS: Turf[] = [
  {
    id: 'turf-1',
    name: 'Green Arena 5v5',
    sportId: 'football',
    type: '5v5',
    location: 'HSR Layout, Bangalore',
    pricePerHour: 1200,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    amenities: ['Floodlights', 'Changing Room', 'Parking', 'Water'],
    isActive: true,
  },
  {
    id: 'turf-2',
    name: 'Elite Football 7v7',
    sportId: 'football',
    type: '7v7',
    location: 'Indiranagar, Bangalore',
    pricePerHour: 1800,
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800&q=80',
    amenities: ['Floodlights', 'Changing Room', 'Parking', 'Cafeteria'],
    isActive: true,
  },
  {
    id: 'turf-3',
    name: 'Stadium View 7v7',
    sportId: 'football',
    type: '7v7',
    location: 'Koramangala, Bangalore',
    pricePerHour: 2000,
    image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80',
    amenities: ['Floodlights', 'Changing Room', 'Parking', 'Water', 'Seating'],
    isActive: true,
  },
  {
    id: 'turf-4',
    name: 'Cricket Box Arena',
    sportId: 'cricket',
    type: 'Box Cricket',
    location: 'Whitefield, Bangalore',
    pricePerHour: 1500,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    amenities: ['Nets', 'Changing Room', 'Equipment', 'Parking'],
    isActive: true,
  },
  {
    id: 'turf-5',
    name: 'Premium Cricket Pitch',
    sportId: 'cricket',
    type: 'Full Pitch',
    location: 'Jayanagar, Bangalore',
    pricePerHour: 2500,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    amenities: ['Floodlights', 'Changing Room', 'Equipment', 'Seating', 'Scoreboard'],
    isActive: true,
  },
];

export const generateTimeSlots = (date: string, sportId: string): TimeSlot[] => {
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
        isBooked: Math.random() > 0.7, // Random booking status
      });
    });
  });

  return slots;
};

export const BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    turfId: 'turf-1',
    sportId: 'football',
    slotId: 'slot-1',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@example.com',
    customerPhone: '+91 98765-43210',
    date: '2026-02-22',
    startTime: '18:00',
    endTime: '19:00',
    totalPrice: 1200,
    paymentMethod: 'UPI',
    status: 'confirmed',
    createdAt: '2026-02-20T10:30:00Z',
  },
  {
    id: 'booking-2',
    turfId: 'turf-4',
    sportId: 'cricket',
    slotId: 'slot-2',
    customerName: 'Amit Patel',
    customerEmail: 'amit@example.com',
    customerPhone: '+91 87654-32109',
    date: '2026-02-23',
    startTime: '15:00',
    endTime: '16:30',
    totalPrice: 2250,
    paymentMethod: 'UPI',
    status: 'confirmed',
    createdAt: '2026-02-21T14:20:00Z',
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1',
    type: 'income',
    sportId: 'football',
    amount: 24000,
    description: 'Football bookings - Week 8',
    date: '2026-02-21',
    category: 'Bookings',
  },
  {
    id: 'txn-2',
    type: 'income',
    sportId: 'cricket',
    amount: 15000,
    description: 'Cricket bookings - Week 8',
    date: '2026-02-21',
    category: 'Bookings',
  },
  {
    id: 'txn-3',
    type: 'expense',
    sportId: 'football',
    amount: 3500,
    description: 'Turf maintenance',
    date: '2026-02-20',
    category: 'Maintenance',
  },
  {
    id: 'txn-4',
    type: 'expense',
    sportId: 'cricket',
    amount: 2000,
    description: 'Equipment purchase',
    date: '2026-02-19',
    category: 'Equipment',
  },
  {
    id: 'txn-5',
    type: 'income',
    sportId: 'football',
    amount: 32000,
    description: 'Football bookings - Week 7',
    date: '2026-02-14',
    category: 'Bookings',
  },
  {
    id: 'txn-6',
    type: 'income',
    sportId: 'cricket',
    amount: 18500,
    description: 'Cricket bookings - Week 7',
    date: '2026-02-14',
    category: 'Bookings',
  },
];

export const getRevenueData = () => [
  { name: 'Week 1', football: 28000, cricket: 15000 },
  { name: 'Week 2', football: 32000, cricket: 18000 },
  { name: 'Week 3', football: 29000, cricket: 16500 },
  { name: 'Week 4', football: 35000, cricket: 20000 },
  { name: 'Week 5', football: 31000, cricket: 17500 },
  { name: 'Week 6', football: 38000, cricket: 22000 },
  { name: 'Week 7', football: 32000, cricket: 18500 },
  { name: 'Week 8', football: 24000, cricket: 15000 },
];

export const getSportRevenueDistribution = () => [
  { name: 'Football', value: 249000, fill: '#00E676' },
  { name: 'Cricket', value: 142500, fill: '#1565C0' },
];
