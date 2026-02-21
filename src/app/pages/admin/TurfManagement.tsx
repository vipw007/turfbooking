import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, MapPin, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';
import { useSport } from '../../contexts/SportContext';
import { TURFS } from '../../data/mockData';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export const TurfManagement: React.FC = () => {
  const { sports } = useSport();
  const [turfs, setTurfs] = useState(TURFS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState<string>('all');

  const activeSports = Object.values(sports).filter((s) => s.isActive);

  const filteredTurfs =
    selectedSportFilter === 'all'
      ? turfs
      : turfs.filter((t) => t.sportId === selectedSportFilter);

  const toggleTurfStatus = (turfId: string) => {
    setTurfs((prev) =>
      prev.map((turf) =>
        turf.id === turfId ? { ...turf, isActive: !turf.isActive } : turf
      )
    );
  };

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
            <h1 className="text-3xl font-bold md:text-4xl">Turf Management</h1>
            <p className="text-muted-foreground">Manage your sports turfs and facilities</p>
          </div>

          <div className="flex gap-3">
            <Select value={selectedSportFilter} onValueChange={setSelectedSportFilter}>
              <SelectTrigger className="w-full rounded-xl md:w-[180px]">
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

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl" style={{ background: 'var(--sport-accent)' }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Turf
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Turf</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Turf Name</Label>
                    <Input placeholder="Enter turf name" className="mt-2 rounded-xl" />
                  </div>
                  <div>
                    <Label>Sport Type</Label>
                    <Select>
                      <SelectTrigger className="mt-2 rounded-xl">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeSports.map((sport) => (
                          <SelectItem key={sport.id} value={sport.id}>
                            {sport.icon} {sport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Turf Type</Label>
                    <Input placeholder="e.g., 5v5, 7v7" className="mt-2 rounded-xl" />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input placeholder="Enter location" className="mt-2 rounded-xl" />
                  </div>
                  <div>
                    <Label>Price per Hour (৳)</Label>
                    <Input type="number" placeholder="1200" className="mt-2 rounded-xl" />
                  </div>
                  <Button
                    className="w-full rounded-xl"
                    style={{ background: 'var(--sport-accent)' }}
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Add Turf
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Total Turfs</div>
            <div className="text-2xl font-bold">{turfs.length}</div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Active Turfs</div>
            <div className="text-2xl font-bold">{turfs.filter((t) => t.isActive).length}</div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Sports Covered</div>
            <div className="text-2xl font-bold">{activeSports.length}</div>
          </Card>
        </div>

        {/* Turfs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTurfs.map((turf, index) => {
            const sport = sports[turf.sportId];
            return (
              <motion.div
                key={turf.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`group overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                    !turf.isActive ? 'opacity-60' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${turf.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Sport Badge */}
                    <div className="absolute left-3 top-3">
                      <Badge
                        className="rounded-full"
                        style={{
                          background: sport.accentColor,
                          color: '#000',
                        }}
                      >
                        {sport.icon} {sport.name}
                      </Badge>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute right-3 top-3">
                      <Badge
                        variant={turf.isActive ? 'default' : 'secondary'}
                        className="rounded-full"
                      >
                        {turf.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold">{turf.name}</h3>

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{turf.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>৳{turf.pricePerHour}/hour</span>
                      </div>
                    </div>

                    <div className="mb-4">
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
                    </div>

                    {/* Amenities */}
                    <div className="mb-4 flex flex-wrap gap-1">
                      {turf.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                        >
                          {amenity}
                        </span>
                      ))}
                      {turf.amenities.length > 3 && (
                        <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                          +{turf.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-xl"
                        onClick={() => toggleTurfStatus(turf.id)}
                      >
                        {turf.isActive ? (
                          <ToggleRight className="mr-2 h-4 w-4" />
                        ) : (
                          <ToggleLeft className="mr-2 h-4 w-4" />
                        )}
                        {turf.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
