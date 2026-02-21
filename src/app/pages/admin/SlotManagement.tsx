import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Filter } from 'lucide-react';
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

export const SlotManagement: React.FC = () => {
  const { sports } = useSport();
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedDate] = useState(new Date());

  const activeSports = Object.values(sports).filter((s) => s.isActive);
  const dateString = format(selectedDate, 'yyyy-MM-dd');

  // Generate slots for all sports
  const allSlots = activeSports.flatMap((sport) =>
    generateTimeSlots(dateString, sport.id).slice(0, 10)
  );

  const filteredSlots =
    selectedSport === 'all'
      ? allSlots
      : allSlots.filter((slot) => slot.sportId === selectedSport);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Slot Management</h1>
            <p className="text-muted-foreground">Manage time slots across all sports</p>
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

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
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
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Occupancy Rate</div>
            <div className="text-2xl font-bold">
              {Math.round((filteredSlots.filter((s) => s.isBooked).length / filteredSlots.length) * 100)}%
            </div>
          </Card>
        </div>

        {/* Slots Table */}
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

                    return (
                      <TableRow key={slot.id} className="group hover:bg-accent/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                              style={{
                                background: `${sport.accentColor}20`,
                              }}
                            >
                              {sport.icon}
                            </div>
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
                          <span className="font-semibold">৳{slot.price}</span>
                        </TableCell>
                        <TableCell>
                          {slot.isBooked ? (
                            <Badge variant="secondary" className="rounded-full">
                              Booked
                            </Badge>
                          ) : (
                            <Badge
                              className="rounded-full"
                              style={{
                                background: `${sport.accentColor}20`,
                                color: sport.accentColor,
                                border: `1px solid ${sport.accentColor}30`,
                              }}
                            >
                              Available
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>

        {/* Color Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="rounded-2xl p-6">
            <h3 className="mb-4 font-semibold">Sport Color Legend</h3>
            <div className="flex flex-wrap gap-4">
              {activeSports.map((sport) => (
                <div key={sport.id} className="flex items-center gap-2">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ background: sport.accentColor }}
                  />
                  <span className="text-sm">
                    {sport.icon} {sport.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
