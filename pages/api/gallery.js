export default async function handler(req, res) {
  try {
    const response = await fetch("https://fapbank.vercel.app/api/images?allUsers=true&limit=50");
    const data = await response.json();
    
    if (data.success && data.images?.length > 0) {
      const shuffled = data.images.sort(() => 0.5 - Math.random());
      const urls = shuffled.slice(0, 10).map(img => img.url);
      return res.status(200).json({ images: urls });
    }
    
    return res.status(200).json({ images: [] });
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return res.status(200).json({ images: [] });
  }
}

