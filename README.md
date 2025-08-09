# DataPrism Waitlist

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

4. Set up the database:

```bash
npm run db:push
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run pending migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## Architecture

### Backend (Clean & Modular)

- **Repository Pattern**: Clean data access layer
- **Service Layer**: Business logic separation
- **API Layer**: Thin HTTP handlers
- **Rate Limiting**: Memory-safe with automatic cleanup
- **Validation**: Centralized input validation
- **Error Handling**: Structured error logging

### Database Schema

```sql
waitlistEntries {
  id: serial primary key
  email: varchar(255) unique not null
  createdAt: timestamp default now()
}
```

### API Endpoints

- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist/count` - Get waitlist count
- `GET /api/waitlist/stats` - Get detailed statistics

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Page-specific components
├── lib/
│   ├── db/               # Database layer
│   │   ├── schema.ts     # Database schema
│   │   ├── connection.ts # Connection setup
│   │   └── repositories/ # Repository pattern
│   ├── services/         # Business logic layer
│   ├── validators/       # Input validation
│   ├── middleware/       # Rate limiting & more
│   ├── types/           # TypeScript types
│   ├── config/          # Configuration
│   └── utils/           # Utility functions
```

## Deployment

The application can be deployed on Vercel, Netlify, or any platform supporting Next.js.

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
