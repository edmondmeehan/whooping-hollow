
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
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Make sure these paths match exactly how the images were uploaded
    return [
      {
        url: 'lovable-uploads/1.png',
        alt: 'Living Room with Fireplace',
      },
      {
        url: 'lovable-uploads/2.png',
        alt: 'Guest Bedroom with Twin Beds',
      },
      {
        url: 'lovable-uploads/3.png',
        alt: 'Open Concept Living and Dining Area',
      },
      {
        url: 'lovable-uploads/4.png',
        alt: 'Backyard with Pool',
      },
      {
        url: 'lovable-uploads/5.png',
        alt: 'Modern Kitchen',
      },
      {
        url: 'lovable-uploads/6.png',
        alt: 'Master Bedroom',
      },
      {
        url: 'lovable-uploads/7.png',
        alt: 'Another View of Guest Bedroom',
      },
      {
        url: 'lovable-uploads/8.png',
        alt: 'Modern Bathroom with Shower',
      },
      {
        url: 'lovable-uploads/9.png',
        alt: 'Half Bathroom',
      },
      {
        url: 'lovable-uploads/10.png',
        alt: 'Living Room Detail',
      },
      {
        url: 'lovable-uploads/11.png',
        alt: 'Kitchen from Another Angle',
      },
      {
        url: 'lovable-uploads/12.png',
        alt: 'Dining Area',
      },
      {
        url: 'lovable-uploads/13.png',
        alt: 'Backyard from Different Angle',
      },
      {
        url: 'lovable-uploads/14.png',
        alt: 'Front of House',
      },
      {
        url: 'lovable-uploads/15.png',
        alt: 'Master Bedroom from Another Angle',
      },
      {
        url: 'lovable-uploads/16.png',
        alt: 'Another Bedroom',
      },
      {
        url: 'lovable-uploads/17.png',
        alt: 'Bathroom with Vanity',
      },
      {
        url: 'lovable-uploads/18.png',
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
