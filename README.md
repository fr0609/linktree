# Linktree

A Next.js link-in-bio app with an admin dashboard. The landing page shows your links, and the admin page lets you add, edit, delete, and reorder them.

## Features

- Landing page with a clean, animated link list
- Admin dashboard to add, edit, delete, and reorder links
- Server-side persistence with Vercel KV

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page and `http://localhost:3000/admin` for the admin dashboard.

## How it works

- Links are stored in Vercel KV under the key `linktree:links`.
- The landing page reads from `/api/links` and falls back to default links when none are stored.
- The admin page updates the list in real time and saves changes through the same API.

## Admin authentication

The admin dashboard is protected with HTTP Basic Auth.

Default credentials:

- Username: `admin`
- Password: `linktree-admin`

Override them by setting environment variables:

- `ADMIN_USER`
- `ADMIN_PASSWORD`

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Create a new project in Vercel and import the repository.
3. Add a Vercel KV database and attach it to the project.
4. Ensure the KV environment variables are available in Vercel:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
5. (Optional) Set `ADMIN_USER` and `ADMIN_PASSWORD` in Vercel for custom admin credentials.
6. Use the default Next.js build settings.
7. Deploy.

## Local development with KV

1. Create a Vercel KV database and link it to this project.
2. Pull the KV environment variables:

```bash
vercel env pull .env.local
```

3. Run the dev server:

```bash
npm run dev
```

4. (Optional) Add custom admin credentials in `.env.local`:

```
ADMIN_USER=your-user
ADMIN_PASSWORD=your-password
```

5. Configure storage (Vercel Blob) so link edits persist:

```
# Provided store base URL (defaults to this if unset)
BLOB_BASE_URL=https://c6w3nqm4lv3zlwxc.public.blob.vercel-storage.com
# From your Vercel Blob store connection panel
BLOB_READ_WRITE_TOKEN=...
BLOB_READ_ONLY_TOKEN=...
```

- In Vercel, go to Storage → your Blob store → Connections to copy the tokens.
- Add the same variables in your Vercel project settings and redeploy.
- For local dev, run `vercel link` then `vercel env pull` or paste the values into `.env.local` and restart `npm run dev`.

## Customize

- Update the profile name and bio in `app/page.tsx`.
- Change the default links in `lib/links.ts`.
- Adjust styling in `app/globals.css`.
