import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useSport } from '../contexts/SportContext';
import { TURFS, generateTimeSlots, setSlotPending } from '../data/mockData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { format, isToday, parse } from 'date-fns';

export const SlotBooking: React.FC = () => {
  const { sportId } = useParams<{ sportId: string }>();
  const navigate = useNavigate();
  const { sports, setCurrentSport, currentSport } = useSport();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTurf, setSelectedTurf] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);

  const sport = sportId ? sports[sportId] : currentSport;
  const turfs = TURFS.filter((t) => t.sportId === sport?.id);

  // Auto-select the first turf on load
  useEffect(() => {
    if (sportId && sports[sportId]) {
      setCurrentSport(sports[sportId]);
    }
    if (turfs.length > 0 && !selectedTurf) {
      setSelectedTurf(turfs[0].id);
    }
  }, [sportId, sports, setCurrentSport, turfs, selectedTurf]);

  const dateString = format(selectedDate, 'yyyy-MM-dd');
  const slots = selectedTurf
    ? generateTimeSlots(dateString, sport?.id || '').filter((s) => s.turfId === selectedTurf)
    : [];

  const selectedTurfData = turfs.find((t) => t.id === selectedTurf);

  const isSlotInPast = (startTime: string) => {
    if (!isToday(selectedDate)) return false;
    const now = new Date();
    const slotTime = parse(startTime, 'HH:mm', new Date());
    return slotTime < now;
  };

  const handleBooking = () => {
    if (selectedSlot) {
      setSlotPending(selectedSlot.id, dateString, sport?.id || '');
      navigate('/checkout', {
        state: {
          sport,
          turf: selectedTurfData,
          slot: selectedSlot,
          date: selectedDate,
        },
      });
    }
  };

  if (!sport) {
    return <div>Sport not found</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-lg"
              style={{
                background: sport.accentColor,
                boxShadow: `0 0 20px ${sport.accentColor}40`,
              }}
            >
              {sport.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Book {sport.name} Turf</h1>
              <p className="text-muted-foreground">{sport.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select Turf */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: sport.accentColor, color: '#000' }}
                  >
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Select Turf</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {turfs.map((turf) => (
                    <Card
                      key={turf.id}
                      className={`group cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                        selectedTurf === turf.id
                          ? 'shadow-lg'
                          : 'border-transparent hover:border-border'
                      }`}
                      style={{
                        borderColor: selectedTurf === turf.id ? sport.accentColor : undefined,
                      }}
                      onClick={() => setSelectedTurf(turf.id)}
                    >
                      <div className="relative h-32">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundImage: `url(${turf.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        {selectedTurf === turf.id && (
                          <div
                            className="absolute right-3 top-3 rounded-full p-1"
                            style={{ background: sport.accentColor }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-black" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="mb-1 font-semibold">{turf.name}</h3>
                        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {turf.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="rounded-full"
                            style={{
                              background: `${sport.accentColor}15`,
                              color: sport.accentColor,
                              borderColor: `${sport.accentColor}30`,
                            }}
                          >
                            {turf.type}
                          </Badge>
                          <span className="font-semibold">₹{turf.pricePerHour}/hr</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Step 2: Select Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: sport.accentColor, color: '#000' }}
                  >
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Select Date</h2>
                </div>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="rounded-xl"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Step 3: Select Time Slot */}
            {selectedTurf && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="rounded-2xl p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                      style={{ background: sport.accentColor, color: '#000' }}
                    >
                      3
                    </div>
                    <h2 className="text-xl font-semibold">Select Time Slot</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                    {slots.map((slot) => {
                      const isPast = isSlotInPast(slot.startTime);
                      const isUnavailable = slot.isBooked || slot.isPending || isPast;
                      
                      return (
                        <button
                          key={slot.id}
                          onClick={() => !isUnavailable && setSelectedSlot(slot)}
                          disabled={isUnavailable}
                          className={`rounded-xl border-2 p-3 text-sm font-medium transition-all duration-200 ${
                            isUnavailable
                              ? 'cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50'
                              : selectedSlot?.id === slot.id
                              ? 'shadow-lg'
                              : 'border-transparent hover:border-border'
                          }`}
                          style={
                            !isUnavailable && selectedSlot?.id === slot.id
                              ? {
                                  background: `${sport.accentColor}20`,
                                  borderColor: sport.accentColor,
                                  color: sport.accentColor,
                                }
                              : {}
                          }
                        >
                          {slot.startTime}
                          {slot.isPending && <div className="text-[8px] uppercase">Pending</div>}
                          {isPast && <div className="text-[8px] uppercase">Past</div>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border-2 border-border" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-muted" />
                      <span>Booked/Past</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded"
                        style={{ background: `${sport.accentColor}40` }}
                      />
                      <span>Selected</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Side - Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-20"
            >
              <Card className="overflow-hidden rounded-2xl">
                <div
                  className="p-6 text-white"
                  style={{
                    background: sport.darkBackground,
                  }}
                >
                  <h3 className="mb-4 text-xl font-semibold">Booking Summary</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                        style={{ background: sport.accentColor }}
                      >
                        {sport.icon}
                      </div>
                      <div>
                        <div className="text-sm opacity-80">Sport</div>
                        <div className="font-semibold">{sport.name}</div>
                      </div>
                    </div>

                    {selectedTurfData && (
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                        <div>
                          <div className="text-sm opacity-80">Turf</div>
                          <div className="font-semibold">{selectedTurfData.name}</div>
                          <div className="text-xs opacity-70">{selectedTurfData.location}</div>
                        </div>
                      </div>
                    )}

                    {selectedDate && (
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5" />
                        <div>
                          <div className="text-sm opacity-80">Date</div>
                          <div className="font-semibold">{format(selectedDate, 'PPP')}</div>
                        </div>
                      </div>
                    )}

                    {selectedSlot && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5" />
                        <div>
                          <div className="text-sm opacity-80">Time</div>
                          <div className="font-semibold">
                            {selectedSlot.startTime} - {selectedSlot.endTime}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {selectedSlot && (
                    <div className="mb-6 space-y-2 border-t border-border pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{sport.defaultDuration} mins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price per hour</span>
                        <span className="font-medium">₹{selectedSlot.price}</span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <span className="font-semibold">Total</span>
                        <span
                          className="text-xl font-bold"
                          style={{ color: sport.accentColor }}
                        >
                          ₹{selectedSlot.price}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: selectedSlot ? sport.accentColor : undefined,
                      color: selectedSlot ? '#000' : undefined,
                    }}
                    disabled={!selectedSlot}
                    onClick={handleBooking}
                  >
                    {selectedSlot ? 'Proceed to Checkout' : 'Select a slot to continue'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
