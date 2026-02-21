import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, MapPin, Star, Users } from 'lucide-react';
import { useSport } from '../contexts/SportContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { SPORTS_DATA } from '../contexts/SportContext';

export const Landing: React.FC = () => {
  const { currentSport, setCurrentSport, sports } = useSport();
  const [selectedSportId, setSelectedSportId] = useState('football');

  const handleSportChange = (sportId: string) => {
    setSelectedSportId(sportId);
    setCurrentSport(sports[sportId]);
  };

  const activeSports = Object.values(sports).filter((s) => s.isActive);

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book your favorite sport turf in just a few clicks',
    },
    {
      icon: Clock,
      title: 'Flexible Timing',
      description: 'Available slots from 6 AM to midnight, 7 days a week',
    },
    {
      icon: MapPin,
      title: 'Prime Locations',
      description: 'Multiple turfs across Bangalore city',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Top-notch facilities with modern amenities',
    },
  ];

  const stats = [
    { label: 'Active Turfs', value: '15+' },
    { label: 'Happy Customers', value: '5000+' },
    { label: 'Sports Available', value: activeSports.length },
    { label: 'Daily Bookings', value: '100+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: currentSport.darkBackground,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1712418516923-527799fb2bec?w=1600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        <div className="container relative z-10 px-4 py-20 md:px-6 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                Book Your Game. Anytime.
              </h1>
              <p className="mb-8 text-lg text-white/80 md:text-xl">
                {activeSports.map((s) => s.name).join(' • ')} • More Coming Soon
              </p>
            </motion.div>

            {/* Sport Selection Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 flex flex-wrap items-center justify-center gap-3"
            >
              {activeSports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportChange(sport.id)}
                  className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background:
                      selectedSportId === sport.id
                        ? sport.accentColor
                        : 'rgba(255, 255, 255, 0.1)',
                    boxShadow:
                      selectedSportId === sport.id
                        ? `0 0 30px ${sport.accentColor}60`
                        : 'none',
                    color: selectedSportId === sport.id ? '#000' : '#fff',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-xl">{sport.icon}</span>
                    {sport.name}
                  </span>
                  <div
                    className="absolute inset-0 -z-0 opacity-0 transition-opacity group-hover:opacity-20"
                    style={{ background: sport.accentColor }}
                  />
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/sports">
                <Button
                  size="lg"
                  className="group rounded-full px-8 text-base font-semibold shadow-2xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: currentSport.accentColor,
                    color: '#000',
                    boxShadow: `0 10px 40px ${currentSport.accentColor}40`,
                  }}
                >
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent p-6 text-center transition-all duration-200 hover:border-[var(--sport-accent)] hover:shadow-xl">
                  <div
                    className="mx-auto mb-2 text-3xl font-bold transition-all duration-200 md:text-4xl"
                    style={{ color: currentSport.accentColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose TurfBook?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Experience the best sports booking platform with premium facilities
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden rounded-2xl border-2 border-transparent p-6 transition-all duration-200 hover:border-[var(--sport-accent)] hover:shadow-xl">
                  <div
                    className="mb-4 inline-flex rounded-xl p-3 transition-all duration-200"
                    style={{
                      background: `${currentSport.accentColor}15`,
                    }}
                  >
                    <feature.icon
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                      style={{ color: currentSport.accentColor }}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden py-20"
        style={{
          background: currentSport.darkBackground,
        }}
      >
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Play?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Book your favorite sport turf now and enjoy premium facilities
            </p>
            <Link to="/sports">
              <Button
                size="lg"
                className="rounded-full px-8 text-base font-semibold shadow-2xl transition-all duration-200 hover:scale-105"
                style={{
                  background: currentSport.accentColor,
                  color: '#000',
                  boxShadow: `0 10px 40px ${currentSport.accentColor}40`,
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
