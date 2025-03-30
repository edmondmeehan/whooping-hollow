
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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/dd42ec84-5df3-43bf-9da9-ce67e57f1422.jpeg?im_w=1200',
        alt: 'House Exterior',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/d06bcbbe-1aee-4a23-9c01-d1c1e8b39ef6.jpeg?im_w=1200',
        alt: 'Living Room',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/1c2ba6ef-cdee-4d46-805e-77ad68a81905.jpeg?im_w=1200',
        alt: 'Kitchen',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/98a96c23-79be-47b5-a97d-3a8889cf1f83.jpeg?im_w=1200',
        alt: 'Master Bedroom',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/8bea76df-ec38-4ee9-9f5e-ae7ebc3a3c11.jpeg?im_w=1200',
        alt: 'Bathroom',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/e17bd9fa-1a3f-48da-88e1-9a3200468198.jpeg?im_w=1200',
        alt: 'Patio',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/e4ccb460-0493-4ddc-aaa7-49ddd938cfa5.jpeg?im_w=1200',
        alt: 'Pool Area',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/e8c6da0f-ea99-4102-9776-26022dda8b4c.jpeg?im_w=1200',
        alt: 'Outdoor Space',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/d60a9597-bb3d-4f5c-812a-cfd0308d5a33.jpeg?im_w=1200',
        alt: 'Bedroom 2',
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
