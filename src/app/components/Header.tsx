import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Sun, Moon, LogIn, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { useSport } from '../contexts/SportContext';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  
  const { currentSport } = useSport();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setIsLoggedIn(true);
      setUserRole(savedRole as any);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('userRole', role);
    setIsAuthOpen(false);
    
    if (role === 'admin') {
      navigate('/admin');
    }
  };

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    setUserRole('user');
    localStorage.setItem('userRole', 'user');
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const isAdminPath = location.pathname.startsWith('/admin');

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/sports' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Turfs', path: '/admin/turfs' },
    { name: 'Sports', path: '/admin/sports' },
    { name: 'Slots', path: '/admin/slots' },
    { name: 'Accounting', path: '/admin/accounting' },
  ];

  const links = isAdminPath ? adminLinks : publicLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl shadow-lg transition-all duration-200"
            style={{
              background: `var(--sport-accent)`,
              boxShadow: `0 0 20px ${currentSport.accentColor}40`,
            }}
          >
            {currentSport.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-none">TurfBook</span>
            <span className="text-xs text-muted-foreground">Premium Sports</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-accent ${
                location.pathname === link.path
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={
                location.pathname === link.path
                  ? {
                      background: `${currentSport.accentColor}15`,
                      color: currentSport.accentColor,
                    }
                  : {}
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-2 ml-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {userRole === 'admin' && (
                  isAdminPath ? (
                    <Link to="/">
                      <Button variant="outline" className="rounded-full px-6 gap-2">
                        <Globe className="h-4 w-4" />
                        Public Site
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/admin">
                      <Button className="rounded-full px-6 gap-2" style={{ background: currentSport.accentColor, color: '#000' }}>
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Panel
                      </Button>
                    </Link>
                  )
                )}
                <Button variant="ghost" className="rounded-full gap-2 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full px-6 gap-2" style={{ background: currentSport.accentColor, color: '#000' }}>
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                      {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <Button variant="outline" className="w-full rounded-xl py-6 gap-3 border-2" onClick={handleGoogleLogin}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with email</span></div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                      {authMode === 'signup' && (
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" placeholder="John Doe" required className="rounded-xl" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="admin@turfbook.com" required className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="••••••••" required className="rounded-xl" />
                      </div>
                      <Button type="submit" className="w-full rounded-xl py-6 text-base font-semibold" style={{ background: currentSport.accentColor, color: '#000' }}>
                        {authMode === 'login' ? 'Sign In' : 'Create Account'}
                      </Button>
                    </form>

                    <div className="text-center text-sm">
                      {authMode === 'login' ? (
                        <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="font-semibold underline" style={{ color: currentSport.accentColor }}>Sign Up</button></p>
                      ) : (
                        <p>Already have an account? <button onClick={() => setAuthMode('login')} className="font-semibold underline" style={{ color: currentSport.accentColor }}>Log In</button></p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container flex flex-col gap-1 p-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${
                  location.pathname === link.path ? 'text-foreground' : 'text-muted-foreground'
                }`}
                style={location.pathname === link.path ? { background: `${currentSport.accentColor}15`, color: currentSport.accentColor } : {}}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              {isLoggedIn ? (
                <div className="space-y-2">
                  {userRole === 'admin' && (
                    isAdminPath ? (
                      <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full rounded-full gap-2">
                          <Globe className="h-4 w-4" />
                          Public Site
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full rounded-full gap-2" style={{ background: currentSport.accentColor, color: '#000' }}>
                          <LayoutDashboard className="h-4 w-4" />
                          Admin Panel
                        </Button>
                      </Link>
                    )
                  )}
                  <Button variant="ghost" className="w-full rounded-full gap-2" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button className="w-full rounded-full gap-2" style={{ background: currentSport.accentColor, color: '#000' }} onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}>
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
