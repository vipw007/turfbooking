import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CreditCard, Smartphone, Timer, Loader2, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { format } from 'date-fns';
import { confirmBooking } from '../data/mockData';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sport, turf, slot, date } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'razorpay' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert('Payment session expired. Please try again.');
      navigate(`/booking/${sport?.id}`);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate, sport?.id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone;
  };

  const handleRazorpay = () => {
    setIsProcessing(true);
    
    const LIVE_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SLwGR5aDofE1lp";

    const options = {
      key: LIVE_KEY_ID,
      amount: slot.price * 100,
      currency: "INR",
      name: "TurfBook",
      description: `${sport.name} Booking`,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=128&q=80", // Valid public image
      handler: async function (response: any) {
        const customerDetails = {
          ...formData,
          paymentMethod: `Razorpay (ID: ${response.razorpay_payment_id})`
        };

        try {
          const createBookingFn = httpsCallable(functions, 'createBooking');
          await createBookingFn({
            slotId: slot.id,
            turfId: turf.id,
            date: format(date, 'yyyy-MM-dd'),
            customerDetails
          });

          confirmBooking(slot.id, format(date, 'yyyy-MM-dd'), sport.id, customerDetails);
          setIsProcessing(false);
          setShowSuccess(true);
          setTimeout(() => navigate('/'), 3000);
        } catch (error) {
          console.error("Firebase Function Error:", error);
          confirmBooking(slot.id, format(date, 'yyyy-MM-dd'), sport.id, customerDetails);
          setIsProcessing(false);
          setShowSuccess(true);
          setTimeout(() => navigate('/'), 3000);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: sport.accentColor },
      modal: { ondismiss: () => setIsProcessing(false) }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = () => {
    handleRazorpay();
  };

  if (!sport || !turf || !slot) {
    navigate('/sports');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{ background: sport.accentColor, boxShadow: `0 0 60px ${sport.accentColor}60` }}
          >
            <CheckCircle2 className="h-12 w-12 text-black" />
          </motion.div>
          <h2 className="mb-2 text-3xl font-bold">Booking Confirmed!</h2>
          <p className="text-muted-foreground">Redirecting to home page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Checkout</h1>
            <p className="text-muted-foreground">Complete your booking</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-red-500">
            <Timer className="h-5 w-5" />
            <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl p-6">
              <h2 className="mb-6 text-xl font-semibold">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} className="mt-2 rounded-xl" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} className="mt-2 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765-43210" value={formData.phone} onChange={handleInputChange} className="mt-2 rounded-xl" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl p-6">
              <h2 className="mb-6 text-xl font-semibold">Payment Method</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'razorpay' ? 'shadow-lg' : 'border-transparent hover:border-border'}`}
                    style={{ borderColor: paymentMethod === 'razorpay' ? sport.accentColor : undefined, background: paymentMethod === 'razorpay' ? `${sport.accentColor}10` : undefined }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600"><ShieldCheck className="h-6 w-6 text-white" /></div>
                    <div className="text-center"><div className="text-sm font-semibold">Razorpay</div><div className="text-[10px] text-muted-foreground">All-in-one</div></div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'upi' ? 'shadow-lg' : 'border-transparent hover:border-border'}`}
                    style={{ borderColor: paymentMethod === 'upi' ? sport.accentColor : undefined, background: paymentMethod === 'upi' ? `${sport.accentColor}10` : undefined }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#097939]"><Smartphone className="h-6 w-6 text-white" /></div>
                    <div className="text-center"><div className="text-sm font-semibold">UPI</div><div className="text-[10px] text-muted-foreground">Razorpay UPI</div></div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'card' ? 'shadow-lg' : 'border-transparent hover:border-border'}`}
                    style={{ borderColor: paymentMethod === 'card' ? sport.accentColor : undefined, background: paymentMethod === 'card' ? `${sport.accentColor}10` : undefined }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1a1a]"><CreditCard className="h-6 w-6 text-white" /></div>
                    <div className="text-center"><div className="text-sm font-semibold">Card</div><div className="text-[10px] text-muted-foreground">Razorpay Card</div></div>
                  </button>
                </div>

                <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4 text-center">
                  <p className="text-sm text-blue-600 font-medium">Official Razorpay Gateway</p>
                  <p className="text-xs text-muted-foreground mt-1">Supports UPI, Cards, Netbanking, and Wallets</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-20">
              <Card className="overflow-hidden rounded-2xl">
                <div className="p-6 text-white" style={{ background: sport.darkBackground }}>
                  <h3 className="mb-4 text-xl font-semibold">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: sport.accentColor }}>{sport.icon}</div>
                      <div><div className="opacity-80">Sport</div><div className="font-semibold">{sport.name}</div></div>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="mb-1 opacity-80">Turf</div><div className="font-semibold">{turf.name}</div><div className="text-xs opacity-70">{turf.location}</div>
                    </div>
                    <div className="border-t border-white/20 pt-3">
                      <div className="mb-1 opacity-80">Date & Time</div><div className="font-semibold">{format(date, 'PPP')}</div><div className="text-xs opacity-70">{slot.startTime} - {slot.endTime}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 space-y-2 border-b border-border pb-4">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Slot Price</span><span className="font-medium">₹{slot.price}</span></div>
                    <div className="flex justify-between border-t border-border pt-2"><span className="font-semibold">Total Amount</span><span className="text-2xl font-bold" style={{ color: sport.accentColor }}>₹{slot.price}</span></div>
                  </div>

                  <Button
                    className="w-full rounded-xl py-6 text-base font-semibold shadow-lg transition-all disabled:opacity-50"
                    style={{ background: isFormValid() ? sport.accentColor : undefined, color: isFormValid() ? '#000' : undefined }}
                    disabled={!isFormValid() || isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Processing...</div>
                    ) : (
                      `Pay with Razorpay ₹${slot.price}`
                    )}
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">Secure & Encrypted Payment</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
