/**
 * Geolocation Utility for CC2.0
 */

export interface Coords {
  lat: number;
  lng: number;
}

export async function getCurrentPosition(): Promise<Coords | null> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return null;
  }
  // In mock/dev mode (no real API configured), skip geolocation entirely
  if (process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation failed:", err.message);
        resolve(null);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

/**
 * Haversine formula to calculate distance between two points in miles.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
