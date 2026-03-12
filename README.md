<div align="center">
  <img src="public/images/logo.png" alt="By the Book Logo" width="120" />

  <h1>By the Book</h1>
  <p><strong>The world-class studio scheduling & management platform for modern recording studios.</strong></p>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-6366f1?style=for-the-badge&logo=github)](https://debalent.github.io/By-The-Book/)
[![GitHub](https://img.shields.io/badge/GitHub-Debalent%2FBy--The--Book-black?style=for-the-badge&logo=github)](https://github.com/Debalent/By-The-Book)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

</div>

---

## Overview

**By the Book** is a full-stack SaaS platform that replaces the patchwork of spreadsheets, texts, and manual invoices that studio operators currently rely on. From online booking and Stripe deposits to real-time analytics and an AI session predictor — everything runs in one beautiful, Electric Indigo-themed interface.

---

## Key Features

| Feature                     | Description                                                               |
| --------------------------- | ------------------------------------------------------------------------- |
| 🗓️ **Smart Calendar**       | Weekly/monthly view with color-coded rooms and real-time availability     |
| 💳 **Stripe Payments**      | Automated deposits, balance charges, invoices, and refunds                |
| 👥 **Client CRM**           | Full client profiles with session history, total spend, and notes         |
| 📊 **Analytics & Heatmaps** | Revenue trends, room utilization heatmaps, peak-hour analysis             |
| 🏠 **Room Management**      | Track rates, equipment, capacity, and maintenance per room                |
| 🔧 **Equipment Inventory**  | Asset tracking with category filters, value summary, and condition status |
| 🤖 **AI Session Predictor** | Predict session duration by genre, experience level, and crew size        |
| 🌍 **Studio Marketplace**   | List your studio for discovery; clients can browse and book directly      |
| ⚙️ **Settings**             | Studio profile, business hours, notification preferences, Stripe config   |

---

## Workflow

```text
1. Client discovers studio via marketplace or direct link
2. Client selects room, date, and time slot
3. AI suggests optimal session duration
4. Stripe collects deposit automatically
5. Automated reminders sent 24h before session
6. Balance charged → invoice sent → client added to CRM
7. Dashboard analytics update in real-time
```

---

## Tech Stack

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Recharts, Framer Motion |
| **API**      | tRPC v10 (type-safe end-to-end)                               |
| **Database** | PostgreSQL + Prisma ORM                                       |
| **Payments** | Stripe + Stripe Elements                                      |
| **Auth**     | NextAuth.js v4                                                |
| **Security** | Zod validation, rate limiting, CSRF protection                |
| **Fonts**    | Space Grotesk (headings) + Inter (body)                       |

---

## Design System

| Token         | Name            | Hex       |
| ------------- | --------------- | --------- |
| `primary-500` | Electric Indigo | `#6366f1` |
| `violet-600`  | Studio Purple   | `#7c3aed` |
| `mint-400`    | Neon Mint       | `#34d399` |
| `orange-500`  | Studio Orange   | `#f97316` |
| `night-900`   | Studio Night    | `#0f172a` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account

### Installation

```bash
git clone https://github.com/Debalent/By-The-Book.git
cd By-The-Book
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL, NEXTAUTH_SECRET, STRIPE_SECRET_KEY, etc.
npx prisma migrate dev
npm run dev
```

Open <http://localhost:3000> in your browser.

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

---

## Project Structure

```text
src/
├── pages/
│   ├── index.tsx              # Landing page
│   ├── book.tsx               # Public booking wizard
│   ├── studio/
│   │   ├── dashboard.tsx      # Main operator dashboard
│   │   ├── calendar.tsx       # Weekly calendar view
│   │   ├── rooms.tsx          # Room management
│   │   ├── clients.tsx        # Client CRM
│   │   ├── analytics.tsx      # Analytics & heatmaps
│   │   ├── equipment.tsx      # Equipment inventory
│   │   ├── payments.tsx       # Payment transactions
│   │   ├── marketplace.tsx    # Studio discovery
│   │   ├── ai-predict.tsx     # AI session predictor
│   │   └── settings.tsx       # Studio settings
│   └── api/trpc/[trpc].ts
├── components/
│   └── Layout.tsx             # Sidebar + topbar layout
├── server/api/routers/        # tRPC routers
└── styles/globals.css         # Design tokens & component classes
```

---

## Live Demo

View the GitHub Pages static demo: <https://debalent.github.io/By-The-Book/>

---

## Deployment

Recommended: **Vercel** — import the repo, add environment variables, deploy.

Also supported: Railway, Render, AWS, DigitalOcean.

Database providers: Supabase, Railway, Neon, AWS RDS.

---

## Contact

**Balentine Tech Solutions**

- Email: <balentinetechsolutions@gmail.com>
- GitHub: <https://github.com/Debalent>

---

_Built with ❤️ by Balentine Tech Solutions · © 2026_

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Backend**: Next.js API Routes + tRPC for type-safe APIs
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Authentication**: NextAuth.js (ready to configure)
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)
- npm or yarn

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd By-the-Book
npm install
```

### 2. Database Setup

Create a PostgreSQL database and update your `.env` file:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/bythebook"
```

### 3. Initialize Database

```bash
npm run db:push
```

This will create all necessary tables in your database.

### 4. Configure Stripe

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Update `.env` with your Stripe keys:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Database Schema

### Core Models

- **Studio**: Studio information, settings, and policies
- **Room**: Individual recording spaces within a studio
- **Service**: Services offered (recording, mixing, mastering, etc.)
- **Booking**: Session bookings with status tracking
- **Client**: Client information and history
- **Payment**: Payment records with Stripe integration
- **Review**: Client feedback and ratings
- **StudioAvailability**: Operating hours by day of week

### Key Relationships

- Studios have multiple Rooms, Services, and Bookings
- Bookings connect Clients with Studios through specific time slots
- Payments are linked to Bookings
- Reviews are created after completed Bookings

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth (for authentication)
NEXTAUTH_SECRET="generate-a-random-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # For production webhooks

# Email (Optional - for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## 📱 Application Structure

```
src/
├── pages/
│   ├── index.tsx              # Landing page
│   ├── book.tsx               # Client booking flow
│   ├── booking/
│   │   └── [id]/
│   │       ├── payment.tsx    # Payment page
│   │       ├── confirmation.tsx
│   │       └── review.tsx     # Review submission
│   ├── studio/
│   │   └── dashboard.tsx      # Studio management dashboard
│   └── api/
│       └── trpc/[trpc].ts     # tRPC API handler
├── server/
│   ├── db.ts                  # Prisma client
│   └── api/
│       ├── trpc.ts            # tRPC setup
│       ├── root.ts            # API router aggregation
│       └── routers/           # API route handlers
│           ├── studio.ts      # Studio management
│           ├── booking.ts     # Booking & scheduling
│           ├── client.ts      # Client management
│           └── payment.ts     # Payment processing
├── utils/
│   └── api.ts                 # tRPC client setup
└── styles/
    └── globals.css            # Global styles
```

## 🎨 Key Pages

### Client-Facing

- `/` - Landing page with features
- `/book` - Multi-step booking flow
- `/booking/[id]/payment` - Stripe payment page
- `/booking/[id]/confirmation` - Booking confirmation
- `/booking/[id]/review` - Leave a review

### Studio Management

- `/studio/dashboard` - Main dashboard with stats and bookings

## 🔧 API Routes (tRPC)

### Studio Router

- `getAll` - Get all studios
- `getById` - Get studio details
- `create` - Create new studio
- `update` - Update studio settings
- `setAvailability` - Set operating hours
- `getStats` - Get studio statistics

### Booking Router

- `getAvailableSlots` - Get available time slots (smart scheduling)
- `create` - Create new booking
- `getByStudio` - Get studio bookings
- `updateStatus` - Update booking status
- `cancel` - Cancel booking with fee calculation

### Client Router

- `getOrCreate` - Get or create client
- `getBookings` - Get client booking history
- `submitReview` - Submit review

### Payment Router

- `createPaymentIntent` - Create Stripe payment intent
- `confirmPayment` - Confirm successful payment
- `getByBooking` - Get payment history
- `refund` - Process refund

## 💡 Smart Scheduling Algorithm

The booking system includes intelligent conflict detection:

1. **Time Slot Generation**: Creates 30-minute interval slots within operating hours
2. **Conflict Detection**: Checks for overlapping bookings
3. **Buffer Time**: Adds configurable buffer between sessions
4. **Real-time Validation**: Prevents double-bookings at creation time
5. **Multi-room Support**: Manages separate availability per room

## 💳 Payment Flow

1. Client completes booking form
2. System calculates total and deposit amounts
3. Stripe Payment Intent created
4. Client enters payment details
5. Payment confirmed via Stripe
6. Booking status updated to CONFIRMED
7. Confirmation email sent (when configured)

## 📊 Studio Dashboard Features

- Total bookings and revenue statistics
- Upcoming sessions list
- Average rating display
- Recent reviews
- Quick action buttons
- Multi-studio support

## 🔜 Future Enhancements

- Email notifications and reminders
- SMS notifications via Twilio
- Calendar integrations (Google Calendar, iCal)
- File upload for session materials
- Client portal for booking management
- Advanced reporting and analytics
- Multi-language support
- Mobile app (React Native)
- Staff/team management
- Equipment tracking and availability
- Automated backup reminders
- Integration with accounting software

## 🛡️ Security Features

- Type-safe API with tRPC
- Input validation with Zod schemas
- Secure payment processing via Stripe
- Environment variable protection
- CSRF protection (Next.js built-in)
- SQL injection prevention (Prisma)

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Railway
- Render
- AWS
- Digital Ocean
- Heroku

**Database**: Ensure PostgreSQL is available. Recommended providers:

- Supabase
- Railway
- Neon
- AWS RDS

## 🤝 Contributing

This is a proprietary project. For questions or support, contact the development team.

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For setup help or feature requests, please contact support.

---

Built with ❤️ for recording studios who need better booking management.
