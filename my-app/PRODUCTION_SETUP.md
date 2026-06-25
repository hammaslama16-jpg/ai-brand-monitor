# Step 9: Switch to Production

## 1. Update Environment Variables

Before deploying to production, update your `.env` file with production credentials:

```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_PADDLE_CLIENT_TOKEN=your_production_paddle_client_token
```

## 2. Update Pricing Component for Production

In `src/app/pages/Pricing.tsx`, change the Paddle environment:

**Before (Sandbox - for testing):**
```typescript
initializePaddle({
  environment: 'sandbox',
  token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN || 'test_token',
})
```

**After (Production - live):**
```typescript
initializePaddle({
  environment: 'production',
  token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
})
```

## 3. Update Supabase Edge Function for Production

Update the Edge Function to use production price IDs:

In `supabase/functions/paddle-webhook/index.ts`:

```typescript
// Replace these with your PRODUCTION Paddle price IDs
if (priceId === "pri_01abc_production_pro") {
  plan = "pro";
} else if (priceId === "pri_01xyz_production_agency") {
  plan = "agency";
}
```

Deploy the updated function:
```bash
supabase functions deploy paddle-webhook
```

## 4. Update Paddle Webhook Configuration

1. Log into your Paddle Dashboard in **Production** mode (not sandbox)
2. Go to **Developer Tools → Webhooks**
3. Update or create a webhook endpoint pointing to your production domain:
   ```
   https://yourdomain.com/api/paddle-webhook
   ```
   Or if using Supabase Edge Functions:
   ```
   https://your_project_id.functions.supabase.co/paddle-webhook
   ```
4. Select the same events as before:
   - `subscription.activated`
   - `subscription.created`
   - `subscription.canceled`

## 5. Security Checklist

Before going live, ensure:

- ✅ `.env` contains production credentials (not sandbox)
- ✅ Paddle environment is set to `'production'`
- ✅ Paddle webhook points to your production URL
- ✅ Supabase Edge Function is deployed to production
- ✅ Database schema has been created in production Supabase
- ✅ Row-level security policies are enabled
- ✅ Your domain is verified with SSL/TLS
- ✅ You've tested a full transaction flow in sandbox before switching

## 6. Verification Steps

1. Complete a test purchase with real payment details (or Paddle's test cards if available)
2. Verify that the webhook is triggered
3. Check that the `user_subscriptions` table is updated correctly
4. Test that users can only view their own subscription data (RLS policy)

---

**Important**: Only switch to production credentials when you're confident everything is working correctly in sandbox mode.
