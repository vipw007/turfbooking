import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, IndianRupee } from 'lucide-react';
import { useSport } from '../contexts/SportContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const SportSelection: React.FC = () => {
  const { sports, setCurrentSport } = useSport();

  const activeSports = Object.values(sports).filter((s) => s.isActive);
  const inactiveSports = Object.values(sports).filter((s) => !s.isActive);

  const sportImages: Record<string, string> = {
    football: 'https://images.unsplash.com/photo-1712418516923-527799fb2bec?w=800&q=80',
    cricket: 'https://images.unsplash.com/photo-1759733841123-b8e1d75ee45c?w=800&q=80',
    badminton: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
  };

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Choose Your Sport</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Select from our premium sports facilities and book your preferred time slot
          </p>
        </motion.div>

        {/* Active Sports */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 text-2xl font-semibold"
          >
            Available Now
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeSports.map((sport, index) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/booking/${sport.id}`}
                  onClick={() => setCurrentSport(sport)}
                >
                  <Card className="group h-full overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 hover:border-2 hover:shadow-2xl">
                    {/* Sport Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${sportImages[sport.id]})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      {/* Sport Icon Badge */}
                      <div className="absolute left-4 top-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-xl transition-all duration-200 group-hover:scale-110"
                          style={{
                            background: sport.accentColor,
                            boxShadow: `0 0 30px ${sport.accentColor}60`,
                          }}
                        >
                          {sport.icon}
                        </div>
                      </div>

                      {/* Availability Badge */}
                      <div className="absolute right-4 top-4">
                        <Badge
                          className="rounded-full px-3 py-1"
                          style={{
                            background: `${sport.accentColor}20`,
                            color: sport.accentColor,
                            border: `1px solid ${sport.accentColor}40`,
                          }}
                        >
                          {sport.availableTurfs} Turfs Available
                        </Badge>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="mb-2 text-2xl font-bold">{sport.name}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {sport.description}
                      </p>

                      {/* Info */}
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <IndianRupee className="h-4 w-4" />
                          <span>From ₹{sport.startingPrice}/hr</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className="group/btn w-full rounded-xl transition-all duration-200"
                        style={{
                          background: `${sport.accentColor}15`,
                          color: sport.accentColor,
                          border: `1px solid ${sport.accentColor}30`,
                        }}
                      >
                        View Slots
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coming Soon Sports */}
        {inactiveSports.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 text-2xl font-semibold"
            >
              Coming Soon
            </motion.h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inactiveSports.map((sport, index) => (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden rounded-2xl border-2 border-dashed opacity-60">
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center grayscale"
                        style={{
                          backgroundImage: `url(${sportImages[sport.id]})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60" />

                      {/* Sport Icon Badge */}
                      <div className="absolute left-4 top-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {sport.icon}
                        </div>
                      </div>

                      {/* Coming Soon Badge */}
                      <div className="absolute right-4 top-4">
                        <Badge
                          variant="outline"
                          className="rounded-full bg-white/10 px-3 py-1 text-white backdrop-blur"
                        >
                          Coming Soon
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="mb-2 text-2xl font-bold">{sport.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay tuned! We're working on bringing {sport.name} to our platform.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Add More Sports Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: inactiveSports.length * 0.1 }}
              >
                <Card className="group flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-6 transition-all hover:border-primary hover:bg-accent">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-3xl">
                      ➕
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">More Sports</h3>
                    <p className="text-sm text-muted-foreground">
                      Basketball, Pickleball, and more coming soon!
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
