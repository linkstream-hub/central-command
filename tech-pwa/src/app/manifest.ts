import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'APT Tech Dashboard',
    short_name: 'APT Tech',
    description: 'APT Maintenance Inc. Tech Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#111318',
    theme_color: '#111318',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
