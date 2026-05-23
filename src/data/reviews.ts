export interface Review {
  id: number;
  ownerName: string;
  ownerLocation: string;
  ownerPhoto: string;
  petName: string;
  petType: string;
  petPhoto: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  helpful: number;
  reply?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    ownerName: 'Sarah J.',
    ownerLocation: 'Austin, TX',
    ownerPhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    petName: 'Max',
    petType: 'Dog',
    petPhoto: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    rating: 5,
    text: "Pet Horizon saved my cat's life with medicine reminders. The app is intuitive and the notifications are spot on.",
    date: '2 weeks ago',
    verified: true,
    helpful: 24,
    reply: "Thanks Sarah! We're so glad Whiskers is healthy! 🐱",
  },
  {
    id: 2,
    ownerName: 'Mike D.',
    ownerLocation: 'Seattle, WA',
    ownerPhoto: 'https://images.pexels.com/photos/458799/pexels-photo-458799.jpeg',
    petName: 'Buddy',
    petType: 'Dog',
    petPhoto: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    rating: 5,
    text: 'Best app ever! My golden retriever never misses walk time thanks to the schedule feature.',
    date: '1 week ago',
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    ownerName: 'Lena K.',
    ownerLocation: 'Boston, MA',
    ownerPhoto: 'https://images.pexels.com/photos/3995209/pexels-photo-3995209.jpeg',
    petName: 'Whiskers',
    petType: 'Cat',
    petPhoto: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg',
    rating: 5,
    text: "The medicine reminders saved my diabetic cat. No more missed doses!",
    date: '3 weeks ago',
    verified: true,
    helpful: 30,
  },
  {
    id: 4,
    ownerName: 'Carlos M.',
    ownerLocation: 'Miami, FL',
    ownerPhoto: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    petName: 'Rio',
    petType: 'Bird',
    petPhoto: 'https://images.pexels.com/photos/1343592/pexels-photo-1343592.jpeg',
    rating: 4,
    text: "Love tracking my parrot's daily activities. The app keeps me informed.",
    date: '5 days ago',
    verified: true,
    helpful: 12,
  },
  {
    id: 5,
    ownerName: 'Nina P.',
    ownerLocation: 'Chicago, IL',
    ownerPhoto: 'https://images.pexels.com/photos/3817103/pexels-photo-3817103.jpeg',
    petName: 'Bunny',
    petType: 'Rabbit',
    petPhoto: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg',
    rating: 5,
    text: 'Managing 3 pets finally feels easy with the unified dashboard.',
    date: '4 days ago',
    verified: true,
    helpful: 9,
  },
  {
    id: 6,
    ownerName: 'Tom S.',
    ownerLocation: 'Denver, CO',
    ownerPhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    petName: 'Goldie',
    petType: 'Fish',
    petPhoto: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg',
    rating: 5,
    text: "This app taught me everything as a first‑time pet parent. So helpful!",
    date: '1 week ago',
    verified: true,
    helpful: 22,
  },
];
