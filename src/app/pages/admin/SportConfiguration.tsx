import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, ToggleLeft, ToggleRight, Palette } from 'lucide-react';
import { useSport } from '../../contexts/SportContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

export const SportConfiguration: React.FC = () => {
  const { sports, updateSport } = useSport();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSport, setEditingSport] = useState<string | null>(null);
  const [newSport, setNewSport] = useState({
    name: '',
    icon: '',
    accentColor: '#00E676',
    defaultDuration: 60,
    startingPrice: 1000,
  });

  const allSports = Object.values(sports);

  const toggleSportStatus = (sportId: string) => {
    updateSport(sportId, { isActive: !sports[sportId].isActive });
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
            <h1 className="text-3xl font-bold md:text-4xl">Sport Configuration</h1>
            <p className="text-muted-foreground">
              Manage sports, customize themes, and add new sports
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl" style={{ background: 'var(--sport-accent)' }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Sport
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New Sport</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Sport Name</Label>
                  <Input
                    placeholder="Basketball"
                    className="mt-2 rounded-xl"
                    value={newSport.name}
                    onChange={(e) => setNewSport({ ...newSport, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Sport Icon (Emoji)</Label>
                  <Input
                    placeholder="🏀"
                    className="mt-2 rounded-xl"
                    value={newSport.icon}
                    onChange={(e) => setNewSport({ ...newSport, icon: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      type="color"
                      className="h-12 w-20 cursor-pointer rounded-xl"
                      value={newSport.accentColor}
                      onChange={(e) => setNewSport({ ...newSport, accentColor: e.target.value })}
                    />
                    <Input
                      placeholder="#00E676"
                      className="flex-1 rounded-xl"
                      value={newSport.accentColor}
                      onChange={(e) => setNewSport({ ...newSport, accentColor: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Default Duration (minutes)</Label>
                  <Input
                    type="number"
                    placeholder="60"
                    className="mt-2 rounded-xl"
                    value={newSport.defaultDuration}
                    onChange={(e) =>
                      setNewSport({ ...newSport, defaultDuration: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label>Starting Price (৳)</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    className="mt-2 rounded-xl"
                    value={newSport.startingPrice}
                    onChange={(e) =>
                      setNewSport({ ...newSport, startingPrice: parseInt(e.target.value) })
                    }
                  />
                </div>
                <Button
                  className="w-full rounded-xl"
                  style={{ background: newSport.accentColor }}
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setNewSport({
                      name: '',
                      icon: '',
                      accentColor: '#00E676',
                      defaultDuration: 60,
                      startingPrice: 1000,
                    });
                  }}
                >
                  Add Sport
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Total Sports</div>
            <div className="text-2xl font-bold">{allSports.length}</div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Active Sports</div>
            <div className="text-2xl font-bold">
              {allSports.filter((s) => s.isActive).length}
            </div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Coming Soon</div>
            <div className="text-2xl font-bold">
              {allSports.filter((s) => !s.isActive).length}
            </div>
          </Card>
          <Card className="rounded-2xl p-4">
            <div className="text-sm text-muted-foreground">Total Turfs</div>
            <div className="text-2xl font-bold">13</div>
          </Card>
        </div>

        {/* Sports Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allSports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`group overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                  !sport.isActive ? 'opacity-60' : ''
                }`}
              >
                {/* Header with gradient */}
                <div
                  className="relative p-6 text-white"
                  style={{
                    background: sport.isActive
                      ? sport.darkBackground
                      : 'linear-gradient(135deg, #666 0%, #333 100%)',
                  }}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-xl transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: sport.isActive ? sport.accentColor : '#999',
                        boxShadow: sport.isActive
                          ? `0 0 30px ${sport.accentColor}60`
                          : 'none',
                      }}
                    >
                      {sport.icon}
                    </div>
                    <Badge
                      variant={sport.isActive ? 'default' : 'secondary'}
                      className="rounded-full"
                      style={
                        sport.isActive
                          ? { background: sport.accentColor, color: '#000' }
                          : {}
                      }
                    >
                      {sport.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold">{sport.name}</h3>
                  <p className="text-sm opacity-80">{sport.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-6 space-y-3">
                    {/* Color */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Palette className="h-4 w-4" />
                        <span>Accent Color</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded-full border-2 border-border"
                          style={{ background: sport.accentColor }}
                        />
                        <span className="text-sm font-mono">{sport.accentColor}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Default Duration</span>
                      <span className="font-semibold">{sport.defaultDuration} mins</span>
                    </div>

                    {/* Starting Price */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Starting Price</span>
                      <span className="font-semibold">৳{sport.startingPrice}/hr</span>
                    </div>

                    {/* Available Turfs */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available Turfs</span>
                      <span className="font-semibold">{sport.availableTurfs}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl"
                      onClick={() => toggleSportStatus(sport.id)}
                    >
                      {sport.isActive ? (
                        <ToggleRight className="mr-2 h-4 w-4" />
                      ) : (
                        <ToggleLeft className="mr-2 h-4 w-4" />
                      )}
                      {sport.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={() => setEditingSport(sport.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="rounded-2xl border-2 border-dashed p-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-accent text-3xl">
                💡
              </div>
              <div className="flex-1">
                <h3 className="mb-1 font-semibold">Dynamic Sport Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Add new sports easily with custom themes, colors, and pricing. Each sport can have
                  its own turf types, duration settings, and accent colors for a fully branded
                  experience.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
