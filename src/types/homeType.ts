export interface HomeContent {
  title: string;
  description: string;
  heroImage: string;
  ctaText: string;
  aboutUsTitle: string;
  aboutUsDescription: string;
  
}

export const initialHomeContent: HomeContent = {
  title: "",
  description: "",
  heroImage: "",
  ctaText: "",
  aboutUsTitle: "",
  aboutUsDescription: "",
  
};


export interface EventItem {
  images: string[]; 
  category: string;
  title: string;
  description: string;
  location: string;
  googleMap:string;
  dateTime: string;
  address: string;
}

