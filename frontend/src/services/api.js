const API_URL =
  const API_URL =
  "https://panchanga-digital-museum.onrender.com" ||
  "http://127.0.0.1:8000";

export async function getPanchanga(params) {
  const query = new URLSearchParams({
    date: params.date,
    time: params.time,
    latitude: params.latitude,
    longitude: params.longitude,
    timezone: params.timezone,
  });

  const response = await fetch(
    `${API_URL}/api/panchanga?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Panchāṅga API error: ${response.status}`
    );
  }

  return response.json();
} ||
  "http://127.0.0.1:8000";

export async function getPanchanga(params) {
  const query = new URLSearchParams({
    date: params.date,
    time: params.time,
    latitude: params.latitude,
    longitude: params.longitude,
    timezone: params.timezone,
  });

  const response = await fetch(
    `${API_URL}/api/panchanga?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Panchāṅga API error: ${response.status}`
    );
  }

  return response.json();
}
