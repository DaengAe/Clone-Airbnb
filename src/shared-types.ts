export interface User {
  id: number;
  name: string;
  email: string;
  role: 'HOST' | 'USER';
  createdAt: string;
}

export interface AccommodationPhoto {
  id: number;
  photoUrl: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  userId: number;
  accommodationId: number;
  rating: number;
  content: string;
  createdAt: string;
}

export interface Like {
  id: number;
  userId: number;
  accommodationId: number;
  createdAt: string;
}

export interface Accommodation {
  id: number;
  hostId: number;
  name: string;
  city: string;
  district: string;
  detailAddress: string;
  pricePerNight: number;
  bedroomCount: number;
  amenities: string[] | null;
  extraInfo: string | null;
  createdAt: string;
  photos: AccommodationPhoto[];
  comments: Comment[];
  likes: Like[];
  averageRating?: number;
}