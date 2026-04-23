export type PlaceSuggestion = {
  description: string;
  placeId: string;
};

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

type NominatimSearchResult = {
  display_name?: string;
  osm_type?: string;
  osm_id?: number;
};

type NominatimReverseResult = {
  display_name?: string;
};

export async function getPlaceSuggestions(input: string): Promise<PlaceSuggestion[]> {
  const query = input.trim();
  if (query.length < 3) return [];

  const url = new URL(`${NOMINATIM_BASE_URL}/search`);
  url.searchParams.set('q', query);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', '5');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as NominatimSearchResult[];

    return data
      .map((item) => {
        const description = item.display_name ?? '';
        const placeId = item.osm_type && item.osm_id ? `${item.osm_type}:${item.osm_id}` : '';
        return description && placeId ? { description, placeId } : null;
      })
      .filter(Boolean) as PlaceSuggestion[];
  } catch {
    return [];
  }
}

export const reverseGeocodePlace = async (lat: number, lng: number): Promise<string | null> => {
  const url = new URL(`${NOMINATIM_BASE_URL}/reverse`);
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lng));
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as NominatimReverseResult;
    return data.display_name ?? null;
  } catch {
    return null;
  }
};