# BookMart Deployment Guide

Your bookstore website is ready to deploy anywhere! Here's how to move it to different hosting platforms.

## Quick Export Instructions

1. **Download all files** from this Replit project
2. The entire project is in this folder - just copy everything
3. You have a complete, working bookstore website!

## Hosting Options (Free/Cheap)

### Option 1: Vercel (Recommended - Free)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Upload your project folder
3. Set build command: `npm run build`
4. Your site will be live at: `yoursite.vercel.app`

### Option 2: Netlify (Free)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your project folder
3. Set build command: `npm run build`
4. Your site will be live at: `yoursite.netlify.app`

### Option 3: Railway (Free tier)
1. Go to [railway.app](https://railway.app) and sign up
2. Connect your GitHub repository
3. Automatic deployment - no configuration needed
4. Your site will be live with a railway.app domain

## Email Setup for Order Notifications

After deploying, add these environment variables to receive order emails:

```
GMAIL_USER=erikselimi205@gmail.com
GMAIL_PASS=your-app-password-here
```

### Getting Gmail App Password:
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate password for "BookMart Website"
5. Use that 16-character password (not your regular Gmail password)

## Managing Your Books and Prices

Once deployed, access your admin panel at:
`https://yoursite.com/admin`

From there you can:
- Edit book titles and descriptions
- Update prices instantly
- Change book cover images
- Add new books
- Delete books

### Adding Book Images:
1. Upload your book photos to [imgur.com](https://imgur.com) (free)
2. Copy the direct image link
3. Paste it in the admin panel
4. Save changes

## Local Development

To run locally on your computer:

```bash
npm install
npm run dev
```

Then visit: `http://localhost:5000`

## Project Structure

- `client/` - Website frontend (React)
- `server/` - Backend API (Express)
- `shared/` - Shared types and schemas
- Books stored in: `server/storage.ts`
- Email service: `server/services/emailService.ts`

## Customization

### Changing Colors/Styling:
Edit `client/src/index.css` - all colors are defined at the top

### Adding More Books:
1. Use the admin panel at `/admin`, or
2. Edit `server/storage.ts` and add to the `sampleBooks` array

### Modifying Order Form:
Edit `client/src/components/CheckoutModal.tsx`

## Database Option (Optional)

Current setup uses in-memory storage (data resets on server restart).

For permanent storage, you can:
1. Set up a free PostgreSQL database (Supabase, PlanetScale)
2. Update connection in `drizzle.config.ts`
3. Run migrations with `npm run db:push`

## Support

The website includes:
- Grade filtering (1st-9th grade)
- Shopping cart
- Order management
- Email notifications to erikselimi205@gmail.com
- Mobile-responsive design
- Admin panel for book management

Everything is ready to go - just copy the code and deploy!