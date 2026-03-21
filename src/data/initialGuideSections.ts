
import { GuideSections } from '@/types/guide';

// Sample guide sections data for initial state
export const initialGuideSections: GuideSections = {
  welcome: [
    {
      id: 'welcome-1',
      title: 'Welcome to The Ranch Modern',
      content: 'Welcome to The Ranch Modern in East Hampton! We\'re delighted to have you stay with us. This guide contains everything you need to know to make your stay comfortable and enjoyable.'
    },
    {
      id: 'welcome-2',
      title: 'House Rules',
      content: 'Please observe the following rules during your stay:\n- No smoking inside the house\n- No parties or events without prior approval\n- Please be mindful of noise levels, especially after 10 PM\n- No pets allowed without prior approval'
    },
    {
      id: 'welcome-3',
      title: 'Wi-Fi Information',
      content: 'Network Name: whoppinghollow\nPassword: 262626'
    }
  ],
  house: [
    {
      id: 'house-1',
      title: 'Check-in Instructions',
      content: 'Check-in time is 3:00 PM. Early check-in may be available upon request.\nTo access the property:\n1. Locate the lockbox to the right of the front door\n2. Enter the code provided by the owner\n3. Take the key and unlock the front door'
    },
    {
      id: 'house-2',
      title: 'Appliance Instructions',
      content: 'Kitchen Appliances:\n- Oven: Turn the dial to select temperature. Press the "Start" button to begin preheating.\n- Dishwasher: Add detergent to the dispenser, select cycle, and press "Start".\n- Coffee Maker: Add water to the reservoir, place coffee grounds in the filter, and press the power button.'
    },
    {
      id: 'house-3',
      title: 'Trash & Recycling Information',
      content: 'Trash and recycling bins are located on the side of the house. Please separate your waste according to these guidelines:\n- Trash (Black Bin): Food waste, plastic wrap, non-recyclable items\n- Recycling (Blue Bin): Glass bottles, plastic containers, paper, metal cans'
    }
  ],
  local: [
    {
      id: 'local-1',
      title: 'Directions & Location',
      content: 'Our property is located at The Ranch Modern, East Hampton, NY.'
    },
    {
      id: 'local-2',
      title: 'Local Recommendations',
      content: 'Restaurants:\n- Nick & Toni\'s: Upscale Italian, reservation recommended\n- Rowdy Hall: Casual pub fare, great for lunch\n- The 1770 House: Fine dining in historic setting'
    },
    {
      id: 'local-3',
      title: 'Transportation & Parking',
      content: 'Our driveway can accommodate up to 3 vehicles. Street parking is also available without restrictions.'
    }
  ],
  checkout: [
    {
      id: 'checkout-1',
      title: 'Check-out Instructions',
      content: 'Check-out time is 11:00 AM. Late check-out may be available upon request.\nBefore departing, please:\n- Wash and put away all dishes, or start the dishwasher\n- Remove all food from the refrigerator\n- Take out all trash and recycling to the appropriate bins'
    }
  ],
  emergency: [
    {
      id: 'emergency-1',
      title: 'Emergency Contacts',
      content: 'In case of emergency, dial 911\nOur exact address is: The Ranch Modern Road, East Hampton, NY\n\nOwner: Eddie - (916) 616-5376 - eddie@please.co\nHandyman: John Sebastian Ramirez (Prestine Management) - (631) 605-0294 - prestinemanagement631@gmail.com\nCleaning Service: Isabel Acevedo (Sisters Cleaning) - (631) 833-7932 - isabelacevedop@gmail.com\nProperty Manager: Stay Marquis - (631) 301-2960 - maintenance@staymarquis.com\nEast Hampton Hospital: (631) 324-8400\nPolice (Non-Emergency): (631) 324-0777'
    }
  ]
};
