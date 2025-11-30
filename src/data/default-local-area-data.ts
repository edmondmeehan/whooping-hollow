
import { LocalAreaData } from '../types/local-area';

// Default local area data
export const defaultLocalAreaData: LocalAreaData = {
  eastHampton: {
    title: "East Hampton: Coastal Elegance",
    description: "Known for its pristine beaches, historic homes, and celebrity hideaways, East Hampton is the perfect blend of laid-back charm and upscale living.",
    highlights: [
      "Beaches: Spend the day at Main Beach, one of the most beautiful (and cleanest!) beaches on the East Coast.",
      "Shopping & Dining: Stroll through East Hampton Village for boutique shopping, local galleries, and charming cafes.",
      "Culture: Catch a film at Guild Hall or check out art exhibits and live performances.",
      "Dining: The area is home to world-class restaurants, wineries, and scenic biking trails.",
      "Celebrity Spotting: Keep your eyes open — you just might spot a few familiar faces from the big screen."
    ],
    imageUrl: "/east-hampton-sisi.jpg"
  },
  sagHarbor: {
    title: "Sag Harbor: Historic & Artsy Harbor Town",
    description: "Just a 15-minute drive away, Sag Harbor offers a more nautical, small-town vibe with deep literary and maritime roots.",
    highlights: [
      "History: Explore the Sag Harbor Whaling & Historical Museum, or walk the historic Main Street filled with independent bookstores, cozy restaurants, and antique shops.",
      "Marina: Grab a coffee and stroll the marina — the perfect low-key day trip.",
      "Dining: Don't miss sunset drinks by the water at The American Hotel or Baron's Cove.",
      "Arts Scene: Catch an independent film or live performance at the Sag Harbor Cinema Arts Center."
    ],
    imageUrl: "/sag-harbor-avenue.jpg"
  },
  nearbyFavorites: {
    title: "Nearby Favorites",
    items: [
      {
        name: "Wölffer Estate Vineyard",
        description: "Wine tasting with a view",
        distance: "20 min drive",
        imageUrl: "/wolffer-estate.jpg"
      },
      {
        name: "The Lobster Roll (LUNCH)",
        description: "Classic roadside seafood shack",
        distance: "15 min drive",
        imageUrl: "/lobster-roll.jpg"
      },
      {
        name: "Cavaniola's Gourmet",
        description: "For charcuterie lovers",
        distance: "15 min drive"
      },
      {
        name: "Amber Waves Farm",
        description: "Organic produce, café, and flower picking",
        distance: "10 min drive"
      }
    ]
  },
  summerEvents: {
    title: "Summer Events in East Hampton & Sag Harbor",
    description: "The summer season brings a plethora of events that showcase the vibrant community spirit of the Hamptons. Here are some highlights:",
    events: [
      {
        name: "Sag Harbor American Music Festival",
        description: "An annual celebration featuring a diverse range of musical performances across various venues in Sag Harbor.",
        dates: "Typically held in late September",
        activities: "Enjoy live music spanning genres from jazz to folk, with both free and ticketed events"
      },
      {
        name: "East Hampton Summer Art Show",
        description: "Hosted by the Artist Alliance of East Hampton, this exhibition showcases works from local artists.",
        dates: "Usually takes place in late June to early July",
        activities: "Explore a variety of artworks, including paintings, sculptures, and photography"
      },
      {
        name: "Hamptons International Film Festival",
        description: "A prestigious event featuring films from around the world, attracting filmmakers and enthusiasts alike.",
        dates: "Occurs in October, marking the culmination of the summer season",
        activities: "Attend screenings, panel discussions, and special events with industry professionals"
      },
      {
        name: "Hampton Classic Horse Show",
        description: "One of the largest outdoor horse shows in the U.S., showcasing top equestrian talent.",
        dates: "Held annually during the week leading up to Labor Day",
        activities: "Witness world-class show jumping competitions, enjoy boutique shopping, and savor gourmet food options"
      }
    ]
  },
  insiderTips: {
    title: "Insider Tips",
    tips: [
      "Avoid beach parking headaches by taking a local bike or shuttle.",
      "East Hampton is bike-friendly and walkable — bring or rent bikes for a true Hamptons experience.",
      "Visit off-season for quiet beauty, art events, and better availability.",
      "Most restaurants and attractions are busiest from Thursday evening through Sunday during summer months—plan accordingly.",
      "Early dinner reservations (before 7pm) are much easier to secure during peak season."
    ]
  }
};
