const API_BASE_URL = "https://panchanga-digital-museum.onrender.com";

export async function getPanchanga({
  date,
  time,
  latitude,
  longitude,
  timezone,
}) {
  const params = new URLSearchParams({
    date,
    time,
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: String(timezone),
  });

  const response = await fetch(
    `${API_BASE_URL}/api/panchanga?${params.toString()}`
  );

  if (!response.ok) {
    let message = "Unable to calculate Panchāṅga.";

    try {
      const error = await response.json();

      if (error.detail) {
        message =
          typeof error.detail === "string"
            ? error.detail
            : JSON.stringify(error.detail);
      }
    } catch {
      // Keep default error message.
    }

    throw new Error(message);
  }

  return response.json();
}
