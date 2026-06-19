import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '37.8313';
  const lon = searchParams.get('lon') || '-122.2852';

  try {
    const [res, geoRes] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&temperature_unit=fahrenheit`,
        { next: { revalidate: 300 } }
      ),
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    ]);
    
    const data = await res.json();
    const geoData = await geoRes.json().catch(() => ({}));
    
    return NextResponse.json({ ...data, city: geoData.city || 'Local' });
  } catch (error) {
    console.error('[/api/weather] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch weather' }, { status: 502 });
  }
}
