import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, CreditCard } from 'lucide-react';
import { useSport } from '../../contexts/SportContext';
import { TURFS, generateTimeSlots } from '../../data/mockData';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

export const SlotManagement: React.FC = () => {
  const { sports } = useSport();
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedDate] = useState(new Date());

  const activeSports = Object.values(sports).filter((s) => s.isActive);
  const dateString = format(selectedDate, 'yyyy-MM-dd');

  const allSlots = activeSports.flatMap((sport) =>
    generateTimeSlots(dateString, sport.id)
  );

  const filteredSlots =
    selectedSport === 'all'
      ? allSlots
      : allSlots.filter((slot) => slot.sportId === selectedSport);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Slot Management</h1>
            <p className="text-muted-foreground">Manage time slots and view customer bookings</p>
          </div>

          <div className="flex gap-3">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-full rounded-xl md:w-[200px]">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                {activeSports.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.icon} {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Total Slots</div>
            <div className="text-2xl font-bold">{filteredSlots.length}</div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Available</div>
            <div className="text-2xl font-bold text-green-500">
              {filteredSlots.filter((s) => !s.isBooked).length}
            </div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Booked</div>
            <div className="text-2xl font-bold text-orange-500">
              {filteredSlots.filter((s) => s.isBooked).length}
            </div>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sport</TableHead>
                    <TableHead>Turf Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSlots.map((slot) => {
                    const sport = sports[slot.sportId];
                    const turf = TURFS.find((t) => t.id === slot.turfId);
                    const isBooked = slot.isBooked && slot.customerDetails;

                    return (
                      <Dialog key={slot.id}>
                        <DialogTrigger asChild>
                          <TableRow className={`group cursor-pointer hover:bg-accent/50 ${isBooked ? 'bg-orange-500/5' : ''}`}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm" style={{ background: `${sport.accentColor}20` }}>{sport.icon}</div>
                                <span className="font-medium">{sport.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{turf?.name}</div>
                                <div className="text-xs text-muted-foreground">{turf?.type}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                {format(new Date(slot.date), 'MMM dd, yyyy')}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                {slot.startTime} - {slot.endTime}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold">₹{slot.price}</span>
                            </TableCell>
                            <TableCell>
                              {slot.isBooked ? (
                                <Badge variant="secondary" className="rounded-full bg-orange-500/10 text-orange-500 border-orange-500/20">Booked</Badge>
                              ) : (
                                <Badge className="rounded-full" style={{ background: `${sport.accentColor}20`, color: sport.accentColor, border: `1px solid ${sport.accentColor}30` }}>Available</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Slot Information</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-xl">{sport.icon}</div>
                              <div>
                                <div className="font-semibold">{sport.name} - {turf?.name}</div>
                                <div className="text-xs text-muted-foreground">{format(new Date(slot.date), 'PPP')} | {slot.startTime} - {slot.endTime}</div>
                              </div>
                            </div>

                            {slot.isBooked && slot.customerDetails ? (
                              <div className="space-y-4">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Customer Details</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div><div className="text-xs text-muted-foreground">Name</div><div className="font-medium">{slot.customerDetails.name}</div></div>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div><div className="text-xs text-muted-foreground">Email</div><div className="font-medium">{slot.customerDetails.email}</div></div>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <div><div className="text-xs text-muted-foreground">Mobile</div><div className="font-medium">{slot.customerDetails.phone}</div></div>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <div><div className="text-xs text-muted-foreground">Payment</div><div className="font-medium">{slot.customerDetails.paymentMethod}</div></div>
                                  </div>
                                </div>
                                <div className="border-t pt-4">
                                  <div className="flex justify-between font-semibold">
                                    <span>Total Amount</span>
                                    <span style={{ color: sport.accentColor }}>₹{slot.price}</span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="mb-2 text-4xl">✨</div>
                                <p className="text-sm text-muted-foreground">This slot is currently available for booking.</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
