import axios from 'axios';

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
