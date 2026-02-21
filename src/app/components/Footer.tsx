import React from 'react';
import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useSport } from '../contexts/SportContext';

export const Footer: React.FC = () => {
  const { currentSport } = useSport();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl shadow-lg"
                style={{
                  background: currentSport.accentColor,
                  boxShadow: `0 0 20px ${currentSport.accentColor}40`,
                }}
              >
                {currentSport.icon}
              </div>
              <div>
                <div className="text-lg font-semibold">TurfBook</div>
                <div className="text-xs text-muted-foreground">Premium Sports</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your premium destination for booking sports turfs. Football, Cricket, and more coming soon.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent transition-all hover:scale-110"
                style={{
                  background: `${currentSport.accentColor}15`,
                }}
              >
                <Facebook className="h-4 w-4" style={{ color: currentSport.accentColor }} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent transition-all hover:scale-110"
                style={{
                  background: `${currentSport.accentColor}15`,
                }}
              >
                <Twitter className="h-4 w-4" style={{ color: currentSport.accentColor }} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent transition-all hover:scale-110"
                style={{
                  background: `${currentSport.accentColor}15`,
                }}
              >
                <Instagram className="h-4 w-4" style={{ color: currentSport.accentColor }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sports" className="transition-colors hover:text-foreground">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div className="space-y-4">
            <h3 className="font-semibold">Sports</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span>⚽</span>
                <Link to="/booking/football" className="transition-colors hover:text-foreground">
                  Football Turf
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>🏏</span>
                <Link to="/booking/cricket" className="transition-colors hover:text-foreground">
                  Cricket Turf
                </Link>
              </li>
              <li className="flex items-center gap-2 opacity-50">
                <span>🏸</span>
                <span>Badminton (Coming Soon)</span>
              </li>
              <li className="flex items-center gap-2 opacity-50">
                <span>🏀</span>
                <span>Basketball (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: currentSport.accentColor }} />
                <span>Indiranagar, Bangalore-560038, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: currentSport.accentColor }} />
                <span>+91 98765-43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: currentSport.accentColor }} />
                <span>info@turfbook.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 TurfBook. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
