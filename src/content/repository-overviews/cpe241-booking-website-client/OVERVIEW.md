## A cinema booking interface had to connect the staff schedule to the customer's seat map.

I used a database-course final project to build a cinema workflow from both sides under a fixed deadline. Staff create movies, halls, and showings; customers choose a showing and seats. Each new screen raised a data question for the other side: a changed schedule or seat state had to appear there too. The React app grew around those linked workflows and the companion API, rather than around isolated mock pages.

## Following a showing through both sides

The admin portal includes movie and venue management, an hourly schedule view, bookings, a dashboard, and reports. The customer path moves through movie and showtime selection, an interactive seat map, checkout, and confirmation. Admin and customer routes keep separate session state and API helpers, while server responses supply the movies, schedules, seat states, and records shown in the interface. Charts turn booking and revenue queries into a view staff can scan.

The seat map is where the two journeys meet. A hall's configured seats become availability for a particular showing; a customer's checkout changes what the next customer sees and what staff can review. That made state and error handling more important than simply drawing a grid of seats.

This repository owns the pages, visual flow, and browser-side state. The [server](/repositories/cpe241-booking-website-server) owns SQL transactions and the rules that prevent conflicting schedule and seat changes. The result is a connected course application and booking demonstration. Its checkout does not integrate a real payment processor, and the repository does not establish use by an actual cinema.
