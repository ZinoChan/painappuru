# Recipe Sharing Platform 🍍🍲🚀

Welcome to the Recipe Sharing Platform API! This powerful API is designed to facilitate the creation, discovery, and sharing of mouth-watering recipes. Whether you're a seasoned chef or a home cook looking for inspiration, this platform has you covered.

## Key Features 🌟

- **Create Recipes**: Easily create and share your favorite recipes with the community.
- **View Recipes**: Explore a vast collection of recipes uploaded by fellow food enthusiasts.
- **Search Functionality**: Find recipes based on specific ingredients or categories, making it convenient to discover new dishes.
- **CRUD Operations**: Implement Create, Read, Update, and Delete operations to manage your recipe collection effectively.

## Technologies Used 🛠️

- **Next.js and TypeScript**: powerful combination of Next.js and TypeScript.
- **Tailwind CSS**: the utility-first CSS framework.
- **tRPC**: efficient data fetching and mutation.
- **NextAuth**: for a secure user experience.
- **Prisma**:  for effective data handling.

## How to run
 1. create .env:
```
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""


UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

DATABASE_URL=
SHADOW_DATABASE_URL=

```
 2. run dev :
```bash
npm run db:push
npm run dev
``` 
