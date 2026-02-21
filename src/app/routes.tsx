import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { Landing } from './pages/Landing';
import { SportSelection } from './pages/SportSelection';
import { SlotBooking } from './pages/SlotBooking';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/admin/Dashboard';
import { TurfManagement } from './pages/admin/TurfManagement';
import { SportConfiguration } from './pages/admin/SportConfiguration';
import { SlotManagement } from './pages/admin/SlotManagement';
import { Accounting } from './pages/admin/Accounting';
import { Placeholder } from './pages/Placeholder';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Landing },
      { path: 'sports', Component: SportSelection },
      { path: 'booking/:sportId', Component: SlotBooking },
      { path: 'checkout', Component: Checkout },
      {
        path: 'about',
        element: (
          <Placeholder title="About Us" description="Learn more about TurfBook" />
        ),
      },
      {
        path: 'contact',
        element: (
          <Placeholder title="Contact Us" description="Get in touch with our team" />
        ),
      },
      {
        path: 'privacy',
        element: (
          <Placeholder title="Privacy Policy" description="Our privacy policy" />
        ),
      },
      {
        path: 'terms',
        element: (
          <Placeholder title="Terms of Service" description="Terms and conditions" />
        ),
      },
      // Admin Routes
      { path: 'admin', Component: Dashboard },
      { path: 'admin/turfs', Component: TurfManagement },
      { path: 'admin/sports', Component: SportConfiguration },
      { path: 'admin/slots', Component: SlotManagement },
      { path: 'admin/accounting', Component: Accounting },
      {
        path: '*',
        element: <Placeholder title="Page Not Found" description="The page you're looking for doesn't exist" />,
      },
    ],
  },
]);
