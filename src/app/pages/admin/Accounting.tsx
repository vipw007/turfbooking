import React, { useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { useSport } from '../../contexts/SportContext';
import { TRANSACTIONS } from '../../data/mockData';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
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

export const Accounting: React.FC = () => {
  const { sports } = useSport();
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const activeSports = Object.values(sports).filter((s) => s.isActive);

  const filteredTransactions =
    selectedSport === 'all'
      ? TRANSACTIONS
      : TRANSACTIONS.filter((t) => t.sportId === selectedSport);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

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
            <h1 className="text-3xl font-bold md:text-4xl">Accounting</h1>
            <p className="text-muted-foreground">Track income and expenses by sport</p>
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

            <Button variant="outline" className="rounded-xl">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Financial Summary */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="overflow-hidden rounded-2xl border-2 border-transparent transition-all hover:border-green-500/50 hover:shadow-lg">
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: '#00E67620' }}
                  >
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <Badge className="rounded-full bg-green-500/10 text-green-500">
                    Income
                  </Badge>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Total Income</p>
                  <p className="text-3xl font-bold text-green-500">₹{totalIncome.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden rounded-2xl border-2 border-transparent transition-all hover:border-red-500/50 hover:shadow-lg">
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: '#EF444420' }}
                  >
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  </div>
                  <Badge className="rounded-full bg-red-500/10 text-red-500">
                    Expense
                  </Badge>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Total Expense</p>
                  <p className="text-3xl font-bold text-red-500">₹{totalExpense.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              className="overflow-hidden rounded-2xl border-2 transition-all hover:shadow-lg"
              style={{ borderColor: 'var(--sport-accent)' }}
            >
              <div
                className="p-6"
                style={{
                  background: `linear-gradient(135deg, var(--sport-accent)10 0%, var(--sport-accent)05 100%)`,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: 'var(--sport-accent)' }}
                  >
                    <IndianRupee className="h-6 w-6 text-black" />
                  </div>
                  <Badge
                    className="rounded-full"
                    style={{
                      background: 'var(--sport-accent)',
                      color: '#000',
                    }}
                  >
                    Net Profit
                  </Badge>
                </div>
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Net Profit</p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: 'var(--sport-accent)' }}
                  >
                    ₹{netProfit.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Income Breakdown by Sport */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="rounded-2xl p-6">
            <h3 className="mb-6 text-xl font-semibold">Income Breakdown by Sport</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {activeSports.map((sport) => {
                const sportIncome = TRANSACTIONS.filter(
                  (t) => t.sportId === sport.id && t.type === 'income'
                ).reduce((sum, t) => sum + t.amount, 0);

                const percentage = totalIncome > 0 ? (sportIncome / totalIncome) * 100 : 0;

                return (
                  <div key={sport.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                          style={{ background: `${sport.accentColor}20` }}
                        >
                          {sport.icon}
                        </div>
                        <span className="font-medium">{sport.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{sportIncome.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          background: sport.accentColor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Transaction Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="overflow-hidden rounded-2xl">
            <div className="border-b border-border p-6">
              <h3 className="text-xl font-semibold">Transaction Ledger</h3>
              <p className="text-sm text-muted-foreground">
                All income and expense transactions
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Sport</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => {
                    const sport = sports[transaction.sportId];

                    return (
                      <TableRow key={transaction.id} className="hover:bg-accent/50">
                        <TableCell className="text-sm">
                          {format(new Date(transaction.date), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                              style={{ background: `${sport.accentColor}20` }}
                            >
                              {sport.icon}
                            </div>
                            <span className="font-medium">{sport.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full">
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {transaction.type === 'income' ? (
                            <Badge className="rounded-full bg-green-500/10 text-green-500">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              Income
                            </Badge>
                          ) : (
                            <Badge className="rounded-full bg-red-500/10 text-red-500">
                              <TrendingDown className="mr-1 h-3 w-3" />
                              Expense
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className="font-semibold"
                            style={{
                              color: transaction.type === 'income' ? '#10B981' : '#EF4444',
                            }}
                          >
                            {transaction.type === 'income' ? '+' : '-'}₹
                            {transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                      </TableRow>
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
