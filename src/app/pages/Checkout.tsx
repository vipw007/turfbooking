import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle2, CreditCard, Smartphone } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { format } from 'date-fns';

export const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sport, turf, slot, date } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };

  if (!sport || !turf || !slot) {
    navigate('/sports');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{
              background: sport.accentColor,
              boxShadow: `0 0 60px ${sport.accentColor}60`,
            }}
          >
            <CheckCircle2 className="h-12 w-12 text-black" />
          </motion.div>
          <h2 className="mb-2 text-3xl font-bold">Booking Confirmed!</h2>
          <p className="text-muted-foreground">
            Redirecting to home page...
          </p>
        </motion.div>
      </div>
    );
  }

  const paymentOptions = [
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      color: '#097939',
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      color: '#1a1a1a',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Checkout</h1>
          <p className="text-muted-foreground">Complete your booking</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="rounded-2xl p-6">
                <h2 className="mb-6 text-xl font-semibold">Your Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765-43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl p-6">
                <h2 className="mb-6 text-xl font-semibold">Payment Method</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {paymentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPaymentMethod(option.id as any)}
                      className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                        paymentMethod === option.id
                          ? 'shadow-lg'
                          : 'border-transparent hover:border-border'
                      }`}
                      style={{
                        borderColor: paymentMethod === option.id ? sport.accentColor : undefined,
                        background: paymentMethod === option.id ? `${sport.accentColor}10` : undefined,
                      }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ background: option.color }}
                      >
                        <option.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{option.name}</div>
                        <div className="text-xs text-muted-foreground">Secure Payment</div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
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

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                        style={{ background: sport.accentColor }}
                      >
                        {sport.icon}
                      </div>
                      <div>
                        <div className="opacity-80">Sport</div>
                        <div className="font-semibold">{sport.name}</div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-3">
                      <div className="mb-1 opacity-80">Turf</div>
                      <div className="font-semibold">{turf.name}</div>
                      <div className="text-xs opacity-70">{turf.location}</div>
                    </div>

                    <div className="border-t border-white/20 pt-3">
                      <div className="mb-1 opacity-80">Date & Time</div>
                      <div className="font-semibold">{format(date, 'PPP')}</div>
                      <div className="text-xs opacity-70">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 space-y-2 border-b border-border pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Slot Price</span>
                      <span className="font-medium">₹{slot.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="font-semibold">Total Amount</span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: sport.accentColor }}
                      >
                        ₹{slot.price}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all duration-200 disabled:opacity-50"
                    style={{
                      background:
                        formData.name && formData.email && formData.phone && paymentMethod
                          ? sport.accentColor
                          : undefined,
                      color:
                        formData.name && formData.email && formData.phone && paymentMethod
                          ? '#000'
                          : undefined,
                    }}
                    disabled={!formData.name || !formData.email || !formData.phone || !paymentMethod}
                    onClick={handlePayment}
                  >
                    Pay Now ₹{slot.price}
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Your payment is secure and encrypted
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
