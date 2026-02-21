import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useSport } from '../../contexts/SportContext';
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getRevenueData, getSportRevenueDistribution } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  const { sports, currentSport } = useSport();
  const [selectedSportFilter, setSelectedSportFilter] = useState<string>('all');

  const activeSports = Object.values(sports).filter((s) => s.isActive);
  const revenueData = getRevenueData();
  const sportRevenue = getSportRevenueDistribution();

  const stats = [
    {
      label: 'Total Revenue',
      value: '৳391,500',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: currentSport.accentColor,
    },
    {
      label: 'Total Bookings',
      value: '1,234',
      change: '+8.2%',
      isPositive: true,
      icon: Calendar,
      color: '#1565C0',
    },
    {
      label: 'Active Turfs',
      value: '13',
      change: '+2',
      isPositive: true,
      icon: TrendingUp,
      color: '#00E676',
    },
    {
      label: 'Total Customers',
      value: '5,421',
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      color: '#D32F2F',
    },
  ];

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
            <h1 className="text-3xl font-bold md:text-4xl">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your turf booking platform</p>
          </div>

          <Select value={selectedSportFilter} onValueChange={setSelectedSportFilter}>
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
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-2xl border-2 border-transparent p-6 transition-all duration-200 hover:border-[var(--sport-accent)] hover:shadow-lg">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: `${stat.color}20`,
                    }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                  <div
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Revenue Trend</h3>
                <p className="text-sm text-muted-foreground">Weekly revenue by sport</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="football"
                    stroke="#00E676"
                    strokeWidth={2}
                    dot={{ fill: '#00E676', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cricket"
                    stroke="#1565C0"
                    strokeWidth={2}
                    dot={{ fill: '#1565C0', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Sport Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Revenue by Sport</h3>
                <p className="text-sm text-muted-foreground">Distribution breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={sportRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sportRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {sportRevenue.map((sport) => (
                  <div key={sport.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ background: sport.fill }}
                      />
                      <span>{sport.name}</span>
                    </div>
                    <span className="font-semibold">৳{sport.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Occupancy Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Booking Rate by Sport</h3>
              <p className="text-sm text-muted-foreground">Average occupancy percentage</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Football', rate: 78, fill: '#00E676' },
                  { name: 'Cricket', rate: 65, fill: '#1565C0' },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="rate" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
