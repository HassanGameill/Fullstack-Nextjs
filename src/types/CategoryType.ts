

export type TCategory = {
  id?: number; 
  heading?: string; 
  heading2?: string; 
  imgSrc?: string | HTMLImageElement ;
  t: (key: string) => string; 
  className?: string;
  content?: {       // Making content optional if it may not always be present
    title: string;
    description: string;
  }[];  
};







