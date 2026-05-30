<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# E-Ticaret Projesi

Bu proje Next.js 16, Prisma 7 (SQLite), Stripe ile oluşturulmuş bir e-ticaret sitesidir.

## Önemli Notlar
- `params` ve `searchParams` Promise'dir, `await` ile kullanılır
- Prisma 7 driver adapter gerektirir: `@prisma/adapter-better-sqlite3`
- API route'lar `route.ts` içinde named export (GET, POST) ile yapılır
- Tüm component'ler varsayılan olarak Server Component'tir
- Client component için `'use client'` eklenir

## Komutlar
- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run start` - Production sunucu
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript kontrol
- `npm run db:migrate` - Migration oluştur
- `npm run db:deploy` - Production migration
- `npm run db:seed` - Veritabanını doldur
- `npm run prisma:generate` - Prisma Client oluştur
