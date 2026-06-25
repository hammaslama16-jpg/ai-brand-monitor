# ⚡ Quick Checklist: GitHub → Vercel → Paddle

## ✅ Done (Just Completed)
- [x] Code committed to GitHub
- [x] Code pushed to GitHub main branch

## 📋 Next Steps (Do These Now)

### Deploy to Vercel
- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click **New Project**
- [ ] Import `ai-brand-monitor` repository
- [ ] Set **Root Directory** to `./my-app`
- [ ] Add environment variables:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
  - [ ] `VITE_PADDLE_CLIENT_TOKEN`
- [ ] Click **Deploy**
- [ ] Wait for deployment to complete (2-5 min)
- [ ] **Copy your Vercel domain** (looks like `https://ai-brand-monitor-xyz123.vercel.app`)

### Set Up Paddle Webhooks
- [ ] Log in to Paddle Dashboard (sandbox)
- [ ] Go to Developer Tools → Webhooks
- [ ] Add Supabase Edge Function URL:
  ```
  https://[your_supabase_project_id].functions.supabase.co/paddle-webhook
  ```
- [ ] Select events: `subscription.activated`, `subscription.created`, `subscription.canceled`
- [ ] Save webhook

### Test Everything
- [ ] Visit your Vercel URL
- [ ] Click "View Pricing"
- [ ] Click "Subscribe Now"
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Check Supabase: Query `SELECT * FROM user_subscriptions` to verify
- [ ] Check Edge Function logs for any errors

## 🚀 From Now On
Every time you push to GitHub:
```bash
git add .
git commit -m "your changes"
git push origin main
```
→ Vercel automatically deploys your changes! 🎉

---

## 🔗 Useful URLs

Your Repository:
- GitHub: https://github.com/hammaslama16-jpg/ai-brand-monitor
- Vercel: https://vercel.com/dashboard (once deployed)

Services:
- Paddle Sandbox: https://dashboard.paddle.com
- Supabase: https://app.supabase.com

---

## 💡 Need Help?

- **Vercel Deployment Issues?** → Check `VERCEL_PADDLE_SETUP.md` → Troubleshooting
- **Paddle Setup?** → See `WEBHOOK_SETUP.md`
- **Production Ready?** → Follow `PRODUCTION_SETUP.md`
