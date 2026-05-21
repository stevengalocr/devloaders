# GaloDev Downloaders

Backup del código de descargadores sociales extraído de galodev.com.

## Archivos

- `app/api/download/route.ts` — API route unificada para Instagram + TikTok (RapidAPI)
- `app/api/download/proxy/route.ts` — Proxy de streaming para descarga directa
- `components/tools/SocialDownloader.tsx` — UI compartida con rate limiting y cooldown
- `components/tools/ReelsDownloader.tsx` — Wrapper para Instagram Reels
- `components/tools/TikTokDownloader.tsx` — Wrapper para TikTok

## Variables de entorno necesarias

```
RAPIDAPI_KEY=tu_clave_aqui
```

## APIs de RapidAPI usadas

- Instagram: `instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com`
- TikTok: `tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com`

## Notas

Extraído de galodev3.0 el 2026-05-16 para mantener el proyecto principal limpio para AdSense.
Rate limit: 5 requests/min por IP.
