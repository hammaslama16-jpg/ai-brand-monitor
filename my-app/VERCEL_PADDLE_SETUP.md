# 🚀 Vercel + Paddle Integration Guide

Your code is now on GitHub! Follow these steps to deploy on Vercel and wire it to Paddle.

## Step 1: Deploy to Vercel

### 1.1 Sign Up / Log In
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** and choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub account

### 1.2 Import Your Project
1. After signing in, click **New Project**
2. Click **Import Git Repository**
3. Search for and select `ai-brand-monitor`
4. Click **Import**

### 1.3 Configure the Project
1. **Project Name**: `ai-brand-monitor` (or your preference)
2. **Framework Preset**: Select **Vite**
3. **Root Directory**: Click **Edit** and change it to `./my-app`
4. **Build Command**: Should auto-populate as `npm run build`
5. **Output Directory**: Should auto-populate as `dist`

### 1.4 Add Environment Variables
Before clicking "Deploy", scroll down to **Environment Variables** and add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PADDLE_CLIENT_TOKEN=your_paddle_sandbox_token
```

Click **Add** after each one.

### 1.5 Deploy
Click **Deploy** and wait for the build to complete (takes 2-5 minutes).

---

## Step 2: Get Your Vercel Domain

After deployment succeeds:

1. In Vercel dashboard, go to your project
2. Look for the **Domains** section
3. You should see a URL like: `https://ai-brand-monitor-xyz123.vercel.app`
4. **Copy this URL** - you'll need it for Paddle webhooks

---

## Step 3: Set Up Paddle Webhooks

### 3.1 Get Your Edge Function URL

Your Supabase Edge Function for webhooks will be:
```
https://[your_project_id].functions.supabase.co/paddle-webhook
```

(Get your project ID from your Supabase dashboard > Settings > Project Settings)

### 3.2 Configure Paddle Webhook

1. Log in to [Paddle Dashboard](https://dashboard.paddle.com) (sandbox mode)
2. Go to **Developer Tools → Webhooks**
3. Click **Create Webhook Endpoint** (or edit existing)
4. Enter your Supabase Edge Function URL:
   ```
   https://your_project_id.functions.supabase.co/paddle-webhook
   ```
5. Select these events:
   - ✅ `subscription.activated`
   - ✅ `subscription.created`
   - ✅ `subscription.canceled`
6. Click **Save**

---

## Step 4: Test the Full Integration

### 4.1 Test on Vercel
1. Go to your Vercel domain: `https://ai-brand-monitor-xyz123.vercel.app`
2. Click "View Pricing"
3. Click "Subscribe Now"
4. Complete payment with test card: `4242 4242 4242 4242`

### 4.2 Verify Webhook Works
1. Go to [Supabase Dashboard](https://supabase.com)
2. Click **Edge Functions** in the sidebar
3. Click on `paddle-webhook`
4. Look at the **Executions** tab - you should see recent invocations
5. Check the database: Go to **SQL Editor** and run:
   ```sql
   SELECT * FROM user_subscriptions ORDER BY created_at DESC LIMIT 1;
   ```
6. You should see a new record with your subscription

---

## Step 5: Update Your .env Variables

To test locally (optional), update your `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PADDLE_CLIENT_TOKEN=your_paddle_sandbox_token
```

Then run `npm run dev` locally to test.

---

## 🔄 Deployment Workflow

From now on, your deployment is automated:

1. **Make changes** to your code locally
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "your message"
   git push origin main
   ```
3. **Vercel automatically deploys** when you push to main
4. Check deployment status in [Vercel Dashboard](https://vercel.app/dashboard)

---

## 🚨 Troubleshooting

### Deployment Fails
- Check **Deployments** tab in Vercel for build logs
- Ensure `Root Directory` is set to `./my-app`
- Verify environment variables are set correctly
- Check that `npm run build` works locally: `npm run build` in my-app folder

### Paddle Webhook Not Working
- Verify Edge Function URL is correct in Paddle dashboard
- Check Edge Function **Executions** tab for errors
- Ensure database table `user_subscriptions` exists:
  ```sql
  SELECT * FROM information_schema.tables WHERE table_name = 'user_subscriptions';
  ```
- Check Supabase logs: **Logs** → **Edge Functions**

### Paddle Checkout Not Showing
- Ensure `VITE_PADDLE_CLIENT_TOKEN` is set in Vercel environment variables
- Verify Paddle environment is `'sandbox'` in `src/app/pages/Pricing.tsx`
- Check browser console (F12) for errors
- Make sure user is logged in to Supabase

---

## 📊 Production Checklist

When you're ready to go live:

- [ ] Switch Paddle from sandbox to production
- [ ] Get production Paddle Client Token
- [ ] Update Vercel environment variables with production credentials
- [ ] Create production products in Paddle (Pro, Agency)
- [ ] Update price IDs in `src/app/pages/Pricing.tsx`
- [ ] Update Paddle webhook URL to production
- [ ] Test a real payment in production
- [ ] Set up SSL/HTTPS (Vercel handles this automatically)
- [ ] Configure custom domain if desired

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Paddle Sandbox**: https://dashboard.paddle.com (sandbox mode)
- **Supabase Dashboard**: https://app.supabase.com
- **GitHub**: https://github.com/hammaslama16-jpg/ai-brand-monitor

---

## 📝 Summary

You now have:
- ✅ Code on GitHub
- ✅ App deployed on Vercel with auto-deployments
- ✅ Environment variables configured
- ✅ Paddle webhook integrated
- ✅ Supabase Edge Function handling payments

**Your app is live!** Any changes you push to GitHub will automatically deploy to Vercel. 🎉
