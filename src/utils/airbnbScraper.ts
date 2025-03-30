
interface AirbnbImage {
  url: string;
  alt: string;
}

/**
 * Fetches images from an Airbnb listing page
 * @param listingId The Airbnb listing ID
 * @returns Promise with array of image objects
 */
export const fetchAirbnbImages = async (listingId: string): Promise<AirbnbImage[]> => {
  try {
    // For demo purposes, we're returning the hardcoded images
    // In production, this would be replaced with actual scraping logic
    // using a Supabase Edge Function or similar backend service
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        url: '/lovable-uploads/30f7ae55-434a-4043-b35b-112c7d4ed22b.png',
        alt: 'Living Room with Fireplace',
      },
      {
        url: '/lovable-uploads/987843e4-639a-47ab-a2f0-f3cd3e70c57b.png',
        alt: 'Guest Bedroom with Twin Beds',
      },
      {
        url: '/lovable-uploads/ef3e93d0-3727-4b7e-9f25-b9d3bbad9db6.png',
        alt: 'Open Concept Living and Dining Area',
      },
      {
        url: '/lovable-uploads/4e4c9c8a-e85d-4048-97ab-0443bec264d0.png',
        alt: 'Backyard with Pool',
      },
      {
        url: '/lovable-uploads/7290b63d-0f32-4f86-b97a-a38e3530dd45.png',
        alt: 'Modern Kitchen',
      },
      {
        url: '/lovable-uploads/eb259cdc-7e17-446f-96ce-f62d7eb072ba.png',
        alt: 'Master Bedroom',
      },
      {
        url: '/lovable-uploads/f6dd8635-cd4c-488a-ad01-66405d87d519.png',
        alt: 'Another View of Guest Bedroom',
      },
      {
        url: '/lovable-uploads/2c85f1fd-f59c-4b3a-a58f-ff0fb8d40ff8.png',
        alt: 'Modern Bathroom with Shower',
      },
      {
        url: '/lovable-uploads/5d6caf99-ca2e-48fd-a411-f4f1528065e2.png',
        alt: 'Half Bathroom',
      },
      {
        url: '/lovable-uploads/1f1401af-4d60-4a7a-ae57-31f802c5cd46.png',
        alt: 'Living Room Detail',
      },
      {
        url: '/lovable-uploads/a0878096-5c7e-4dba-849a-29101c017206.png',
        alt: 'Kitchen from Another Angle',
      },
      {
        url: '/lovable-uploads/834d30cd-0bc9-419d-9199-8ec3a0f57827.png',
        alt: 'Dining Area',
      },
      {
        url: '/lovable-uploads/e1a5f500-fed3-415e-aaf6-17848b88cad5.png',
        alt: 'Backyard from Different Angle',
      },
      {
        url: '/lovable-uploads/c913ac65-38e1-4219-b90a-f5b27ff0ce75.png',
        alt: 'Front of House',
      },
      {
        url: '/lovable-uploads/c36111be-3814-4d6c-9c05-f5176d4108d5.png',
        alt: 'Master Bedroom from Another Angle',
      },
      {
        url: '/lovable-uploads/67e5846d-3a2a-4a50-afc4-fedeafe6398c.png',
        alt: 'Another Bedroom',
      },
      {
        url: '/lovable-uploads/9b636bbe-3394-489d-b617-3e7034c3ec86.png',
        alt: 'Bathroom with Vanity',
      },
      {
        url: '/lovable-uploads/8cb89b30-2e65-46f1-919a-c8ff82644f22.png',
        alt: 'Master Bedroom with Queen Bed',
      },
    ];
  } catch (error) {
    console.error('Error fetching Airbnb images:', error);
    return [];
  }
};

/**
 * Gets the hero image from an Airbnb listing
 * @param listingId The Airbnb listing ID
 * @returns Promise with the hero image URL or null
 */
export const getHeroImage = async (listingId: string): Promise<string | null> => {
  const images = await fetchAirbnbImages(listingId);
  return images.length > 0 ? images[0].url : null;
};
