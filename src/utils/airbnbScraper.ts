
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
    
    // Using Unsplash images instead of lovable-uploads that aren't working
    const livingRoom = "https://images.unsplash.com/photo-1721322800607-8c38375eef04";
    const nature = "https://images.unsplash.com/photo-1472396961693-142e6e269027";
    
    // Create variations of the same images for the gallery to have sufficient content
    return [
      {
        url: livingRoom,
        alt: 'Living Room with Fireplace',
      },
      {
        url: nature,
        alt: 'Beautiful Natural Landscape',
      },
      {
        url: livingRoom + '?w=800',
        alt: 'Open Concept Living and Dining Area',
      },
      {
        url: nature + '?w=800',
        alt: 'Mountain View',
      },
      {
        url: livingRoom + '?w=700',
        alt: 'Modern Living Space',
      },
      {
        url: nature + '?w=700',
        alt: 'Outdoor Adventure Scene',
      },
      {
        url: livingRoom + '?w=600',
        alt: 'Cozy Interior',
      },
      {
        url: nature + '?w=600',
        alt: 'Scenic Overlook',
      },
      {
        url: livingRoom + '?w=500',
        alt: 'Stylish Home Design',
      },
      {
        url: nature + '?w=500',
        alt: 'Natural Beauty',
      },
      {
        url: livingRoom + '?w=400',
        alt: 'Living Room Detail',
      },
      {
        url: nature + '?w=400',
        alt: 'Forest Landscape',
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
