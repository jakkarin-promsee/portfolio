# Cinema Booking and Management — Client

Categories: [Full-Stack Web Apps, Booking Systems, Dashboards]

Summary: A React and TypeScript single-page application with two connected cinema experiences: an admin portal for movies, halls, schedules, bookings, dashboard metrics, and revenue reports, and a customer path from movie browsing to seat selection and booking confirmation. Admin and customer sessions use separate route guards, API helpers, and persisted Zustand stores. The interface is backed by the companion Express/MySQL API, so schedules, seat states, and booking records come from server data rather than fixed UI examples.

Highlights:
- Admin screens for movie and venue management, hourly schedule visualization, filtered bookings, and weekly/monthly/yearly reporting.
- Customer path through movie, showing, seat map, checkout, and confirmation pages.
- Separate JWT handling for admin and customer sessions, with role-specific redirects on unauthorized responses.
- Recharts dashboard and reporting views, plus a route-dependent light/dark admin theme.

Tech stack: [React, TypeScript, Vite, React Router, Tailwind CSS, Zustand, Recharts]
