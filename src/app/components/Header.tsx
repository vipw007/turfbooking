import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useSport } from '../contexts/SportContext';
import { Button } from './ui/button';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { currentSport } = useSport();
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const isAdmin = location.pathname.startsWith('/admin');

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

  const links = isAdmin ? adminLinks : publicLinks;

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
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {!isAdmin && (
            <Link to="/admin" className="hidden md:block">
              <Button
                className="rounded-full px-6 transition-all duration-200"
                style={{
                  background: currentSport.accentColor,
                  color: '#000',
                }}
              >
                Admin
              </Button>
            </Link>
          )}

          {isAdmin && (
            <Link to="/" className="hidden md:block">
              <Button variant="outline" className="rounded-full px-6">
                Public Site
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
                style={
                  location.pathname === link.path
                    ? {
                        background: `${currentSport.accentColor}15`,
                        color: currentSport.accentColor,
                      }
                    : {}
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isAdmin && (
              <Link to="/admin" className="mt-2">
                <Button
                  className="w-full rounded-full"
                  style={{
                    background: currentSport.accentColor,
                    color: '#000',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Button>
              </Link>
            )}
            {isAdmin && (
              <Link to="/" className="mt-2">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Public Site
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
