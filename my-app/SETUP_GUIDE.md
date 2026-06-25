# Setup Guide for AI Brand Monitor

## Step 3: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click **Sign Up** and create a free account
3. Click **New Project** to create a new project
4. Fill in the project details:
   - **Name**: ai-brand-monitor (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to you
5. Wait for the project to initialize (this may take a few minutes)
6. Once loaded, go to **Project Settings → API**
7. Copy the following and save them for Step 4:
   - **Project URL** (under "Connecting to your database")
   - **anon/public key** (under "Project API keys")

## Step 5: Set Up Paddle

1. Go to [https://paddle.com](https://paddle.com)
2. Click **Sign Up** and create an account
3. In your dashboard, select **Sandbox** mode (for testing)
4. Go to **Catalog → Products**
5. Create two products:
   - **Product 1**: "Pro"
     - Create a monthly price (e.g., $29/month)
     - Copy the **Price ID** (looks like `pri_01abc...`)
   - **Product 2**: "Agency"
     - Create a monthly price (e.g., $99/month)
     - Copy the **Price ID** (looks like `pri_01xyz...`)
6. Go to **Developer Tools → API Keys**
7. Copy your **Client Token** (you'll need this for the Pricing.tsx component)

## Step 4: Add Environment Variables

In the `.env` file in your project root, replace the placeholder values with your actual credentials from Steps 3 and 5:

```
VITE_SUPABASE_URL=your_actual_project_url_here
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
VITE_PADDLE_CLIENT_TOKEN=your_actual_paddle_client_token_here
```

## Step 6: Update Pricing Component

In `src/app/pages/Pricing.tsx`:

1. Find the line with `pri_pro_12345` and replace it with your Pro product's Price ID
2. Find the line with `pri_agency_12345` and replace it with your Agency product's Price ID
3. Find the line with `'test_token'` and replace it with your actual Paddle Client Token

## Running the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application.

---

## Next Steps

After completing the manual setup (Steps 3-5):

- Proceed with Step 7 (routing is already set up in `src/App.tsx`)
- Create the Supabase Edge Function for webhooks (Step 8)
- Configure for production (Step 9)
- Build and deploy (Step 10)
