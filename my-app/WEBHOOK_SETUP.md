# Step 8: Set Up Paddle Webhook with Supabase Edge Function

## Database Schema

First, create a table in Supabase to store user subscription information:

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste the following SQL:

```sql
-- Create user_subscriptions table
CREATE TABLE user_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'agency')),
  subscription_id TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);

-- Enable Row Level Security
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own subscription
CREATE POLICY "Users can read their own subscription"
  ON user_subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);
```

## Deploy the Edge Function

1. In your Supabase dashboard, go to **Edge Functions**
2. Click **Create a new function**
3. Name it `paddle-webhook`
4. The code is already prepared in `supabase/functions/paddle-webhook/index.ts`
5. Deploy using the Supabase CLI:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Link your project
supabase link --project-ref your_project_id

# Deploy the function
supabase functions deploy paddle-webhook
```

## Configure Paddle Webhook

1. Go to your Paddle Dashboard (sandbox mode)
2. Click **Developer Tools → Webhooks**
3. Click **Create Webhook Endpoint**
4. Paste your Edge Function URL:
   ```
   https://your_project_id.functions.supabase.co/paddle-webhook
   ```
5. Select the following events:
   - `subscription.activated`
   - `subscription.created`
   - `subscription.canceled`
6. Save the webhook

## Update Pricing Component

The Pricing component already sends `customData` with the `user_id` when initiating checkout:

```typescript
customData: {
  user_id: session.user.id,
  email: session.user.email,
}
```

This ensures that when Paddle sends a webhook event, it includes the user ID so the Edge Function can update the correct user's subscription.

## Test the Webhook

1. In Paddle sandbox mode, create a test transaction
2. Complete the payment with test card details
3. Check your Supabase `user_subscriptions` table to verify the record was created
4. The user's plan should be updated to "pro" or "agency" based on their purchase

---

**Note**: Remember to:
- Replace `pri_pro_12345` and `pri_agency_12345` with your actual Paddle price IDs in the Edge Function
- Update the Edge Function URL in Paddle with your actual project URL
- Test thoroughly in sandbox mode before going to production
