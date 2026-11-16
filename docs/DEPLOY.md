# Put the Learning Hub online for free

Three free services, each doing one job:

| Part | Service | Free plan limits worth knowing |
|---|---|---|
| Database (Postgres) | Neon | 1 GB storage, no expiry, no card needed |
| Backend API (FastAPI) | Render | Sleeps after 15 minutes with no visitors; the next visit takes about a minute to wake it |
| Website (Next.js) | Vercel Hobby | Personal, non-commercial use only |

Total time: about 30 minutes. Do the steps in this order, because each one needs an address from the one before.

You will copy three things along the way. Keep them in a note:
1. The **Neon connection string** (step 1)
2. The **Render API address** (step 2)
3. The **Vercel website address** (step 3)

---

## 1. Create the database on Neon

1. Go to https://neon.com and click **Sign up**. Choose **Continue with GitHub**.
2. Create a project:
   - **Project name:** `tpm-learning-hub`
   - **Postgres version:** leave the default.
   - **Region:** pick the one closest to you (for India, choose Singapore, `AWS ap-southeast-1`, if it's offered).
3. On the project dashboard, click **Connect**. Copy the **connection string**. It looks like `postgresql://neondb_owner:...@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`.
   - Paste it as-is; the app adjusts the `postgresql://` prefix itself.
   - Treat this string like a password: it contains one.

## 2. Start the backend on Render

1. Go to https://render.com and click **Get Started**. Choose **GitHub** and allow access to the `study` repository.
2. In the dashboard, click **New +** → **Blueprint**.
3. Pick the `nitishnarayan01/study` repository. Render reads `render.yaml` from the repo and shows a service named `tpm-learning-hub-api` on the **Free** plan.
4. Render asks for the values that aren't stored in the repo:

   | Setting | What to enter |
   |---|---|
   | `DATABASE_URL` | The Neon connection string from step 1 |
   | `CORS_ORIGINS` | Type `http://localhost:3000` for now; you'll change it in step 4 |
   | `ADMIN_EMAIL` | Your email; this becomes the first admin login |
   | `ADMIN_PASSWORD` | A strong password you'll use to sign in |
   | `ADMIN_NAME` | Your name |

   `JWT_SECRET` is created for you automatically.
5. Click **Apply**. The first build takes about 5 minutes. When it says **Live**, copy the address at the top of the page, for example `https://tpm-learning-hub-api.onrender.com`.
6. Check it works: open that address with `/api/health` on the end. You should see `{"status":"ok"}`.

On every start, the backend sets up the database tables and loads all the lessons. You don't need to run anything by hand.

## 3. Put the website on Vercel

1. Go to https://vercel.com and click **Sign Up**. Choose **Hobby** and **Continue with GitHub**.
2. Click **Add New…** → **Project** and import `nitishnarayan01/study`.
3. Before you deploy, set:
   - **Root Directory:** click **Edit** and choose `frontend`. The framework should then show **Next.js**.
   - **Environment Variables:** add one setting:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: your Render address from step 2, with no slash at the end.
4. Click **Deploy**. This takes about 2 minutes. Copy the website address it gives you, for example `https://study-abc123.vercel.app`.
   - The website address is the one under **Domains** on the project page.

## 4. Let the website talk to the backend

The backend only accepts requests from websites it knows about.

1. In Render, open `tpm-learning-hub-api` → **Environment**.
2. Change `CORS_ORIGINS` to your Vercel address, for example `https://study-abc123.vercel.app`. Use no slash at the end.
   - To keep local development working too, use both addresses separated by a comma: `https://study-abc123.vercel.app,http://localhost:3000`.
3. Click **Save, rebuild, and deploy**. Wait for it to show **Live** again.

## 5. Sign in

Open your Vercel address and sign in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from step 2.

If the page sits loading for up to a minute, that's the free backend waking up. Refresh once it's awake.

---

## Updating later

- **Code or lesson changes:** push to GitHub. Vercel and Render both redeploy automatically, and new lessons load on the backend's next start. Saved progress is never touched.
- **Changing a setting:** edit it in the Render or Vercel dashboard, then redeploy.
  - If you change `NEXT_PUBLIC_API_URL` in Vercel, you must redeploy for it to take effect.

## If something goes wrong

| What you see | Likely cause and fix |
|---|---|
| Website loads but sign-in says "Failed to fetch" or "network error" | `CORS_ORIGINS` on Render doesn't exactly match your Vercel address. Check for `https://` and no trailing slash. |
| Website calls `localhost:8000` | `NEXT_PUBLIC_API_URL` wasn't set in Vercel before the build. Set it, then redeploy. |
| Render build fails at `alembic upgrade head` | The Neon connection string is wrong or incomplete. Copy it again from Neon → **Connect**. |
| First page takes about a minute | Normal on the free plan: the backend was asleep. |

## Costs

All three services are $0 on these plans and none needs a card. The limits are set by each provider and can change, so check their pricing pages if something stops working.
