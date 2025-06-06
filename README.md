# Daisy AI - Dairy Analytics Platform

This is a Next.js project for Daisy AI, an advanced analytics platform for dairy cooperatives.

## Features

- **Modern Tech Stack**: Built with Next.js, React, TypeScript, and Tailwind CSS
- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Dark Mode Support**: Automatically adapts to user's system preferences
- **Fast Performance**: Optimized for speed and user experience
- **SEO Friendly**: Built-in SEO optimization with Next.js
- **Easy Deployment**: Ready to deploy to Vercel with minimal configuration

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing the Landing Page Image

To replace the hero image on the landing page with your own:

1. **Prepare your image**:
   - Choose an image that is high quality and relevant to dairy farming or analytics
   - Recommended dimensions: at least 1200x800 pixels
   - Supported formats: JPG, PNG, WebP

2. **Add your image to the project**:
   - Place your image in the `/public` folder
   - Name it `hero-image.jpg` (or update the src in `src/app/landing.tsx` if using a different filename or format)

3. **Alternative method (using the Images folder)**:
   - Create an `/public/images` folder if it doesn't exist
   - Place your image in this folder (e.g., `/public/images/hero-image.jpg`)
   - Update the src in `src/app/landing.tsx` to `/images/hero-image.jpg`

4. **Verify your changes**:
   - Run the development server to see your new image
   - Check how it looks on different screen sizes

## Project Structure

- `/src/app` - Main application code
  - `/components` - Reusable UI components
  - `page.tsx` - Main entry point that renders the landing page
  - `landing.tsx` - Landing page component
  - `dashboard/page.tsx` - Dashboard page component

## Deployment

This project can be deployed on Vercel or any other platform that supports Next.js applications.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Documentation](https://vercel.com/docs)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Environment Setup

This application uses a Hugging Face API key for the LLM query functionality. 

### Local Development

1. Create a `.env.local` file in the root directory
2. Add your Hugging Face API key:
   ```
   HUGGING_FACE_API_KEY=your_huggingface_api_key_here
   ```
3. Restart your development server if it's already running

### Vercel Deployment

When deploying to Vercel, you need to add the environment variable in the Vercel dashboard:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add a new environment variable with the name `HUGGING_FACE_API_KEY` and your API key as the value
4. Redeploy your application to apply the changes

## API Integration

The application uses the Hugging Face API with the Mistral 7B model for answering dairy farming questions. The API is called from the `/api/llm` endpoint in the application.

For security reasons, never commit API keys to GitHub. The `.env.local` file is included in `.gitignore` to prevent accidental commits of sensitive information.
#   A g T e c h v 0 
 
 