# AI Brand Monitor

A modern web application for brand monitoring with subscription-based pricing using Paddle and Supabase.

## Features

- 🎯 Real-time brand monitoring
- 📊 Sentiment analysis
- 💳 Paddle payment integration
- 👥 Supabase authentication
- 🚀 React + TypeScript + Vite
- 🎨 Tailwind CSS styling
- 🔄 Subscription management
- 🪝 Webhook support for payment events

## Project Structure

```
my-app/
├── src/
│   ├── app/pages/
│   │   └── Pricing.tsx          # Pricing page with Paddle checkout
│   ├── components/
│   │   └── Layout.tsx           # Main layout with auth context
│   ├── lib/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # Entry point
│   ├── App.css                  # Tailwind CSS directives
│   └── index.css                # Global styles
├── supabase/
│   └── functions/
│       └── paddle-webhook/      # Edge function for Paddle webhooks
├── .env                         # Environment variables (create this)
├── SETUP_GUIDE.md              # Step-by-step setup instructions
├── WEBHOOK_SETUP.md            # Webhook configuration guide
├── PRODUCTION_SETUP.md         # Production deployment guide
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free at [supabase.com](https://supabase.com))
- A Paddle account (free at [paddle.com](https://paddle.com))

### Installation

1. **Install dependencies**
   ```bash
   cd my-app
   npm install
   ```

2. **Set up environment variables** (see SETUP_GUIDE.md for detailed instructions)
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_PADDLE_CLIENT_TOKEN=your_paddle_client_token
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type check
npm run check
```

## Setup Guides

### Step-by-Step Setup

Follow these guides in order to fully set up the application:

1. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Initial project setup with Supabase and Paddle credentials
2. **[WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md)** - Configure Supabase Edge Function for payment webhooks
3. **[PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)** - Switch to production and deploy

## Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Paddle JavaScript SDK** for payment processing

### Backend
- **Supabase** for authentication, database, and edge functions
- **PostgreSQL** database for storing subscription data
- **Edge Functions** for webhook handling

### Payment Flow

1. User clicks "Subscribe" on pricing page
2. Paddle checkout modal opens with user's email
3. User completes payment
4. Paddle sends webhook to Supabase Edge Function
5. Edge Function updates user's subscription plan in database
6. User gains access to premium features

## Database Schema

The application uses the following table structure:

```sql
CREATE TABLE user_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id),
  plan TEXT CHECK (plan IN ('free', 'pro', 'agency')),
  subscription_id TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xyzabc.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public Supabase API key | `eyJhbGciOiJIUzI1NiIs...` |
| `VITE_PADDLE_CLIENT_TOKEN` | Paddle client token | `test_abc123...` or `live_xyz789...` |

## Deployment

### Build for Production

```bash
npm run build
```

This generates a `dist/` folder with optimized production files.

### Deploy to Vercel, Netlify, or Any Static Host

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Ensure environment variables are set in your hosting provider's dashboard
4. Update Paddle webhook URL to point to your production domain

### Example: Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Vercel automatically builds and deploys on push

## Features by Plan

### Free
- Basic monitoring
- 1 brand profile
- Weekly reports

### Pro
- Up to 5 brand profiles
- Real-time monitoring
- Basic sentiment analysis
- Weekly reports
- Email support

### Agency
- Unlimited brand profiles
- 24/7 real-time monitoring
- Advanced sentiment analysis
- Daily reports + custom dashboards
- Priority support
- Team collaboration
- Custom integrations

## Testing

### Test Paddle Integration in Sandbox

1. Use Paddle's test card numbers:
   - Visa: `4242 4242 4242 4242`
   - Mastercard: `5555 5555 5555 4444`
   - Use any future expiry date and CVC

2. Complete a test purchase to verify the webhook integration

3. Check the `user_subscriptions` table in Supabase to confirm the record was created

## Troubleshooting

### Paddle checkout not opening
- Ensure `VITE_PADDLE_CLIENT_TOKEN` is set correctly in `.env`
- Check that the environment is set to `'sandbox'` for testing or `'production'` for live
- Verify user is logged in before attempting checkout

### Webhook not triggering
- Check that the Edge Function URL in Paddle matches your actual deployment
- Verify the webhook events are set to `subscription.activated`, `subscription.created`, and `subscription.canceled`
- Check Supabase Edge Function logs for errors

### Subscription not updating in database
- Ensure the `user_subscriptions` table exists in your Supabase database
- Verify your Paddle price IDs in the Edge Function match your actual products
- Check that `customData` includes `user_id` when initiating checkout

## Support

For issues or questions:
1. Check the setup guides in this project
2. Review [Supabase documentation](https://supabase.com/docs)
3. Review [Paddle documentation](https://developer.paddle.com/docs)
4. Check [React Router documentation](https://reactrouter.com)

## Security Notes

- Never commit `.env` files to version control
- Always use Row Level Security (RLS) policies in Supabase
- Validate and verify webhooks on the server side
- Use HTTPS in production
- Rotate secrets regularly
- Test thoroughly in sandbox mode before going live

## License

This project is ready to customize for your brand monitoring needs.
