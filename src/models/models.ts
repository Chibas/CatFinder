export interface BasicImage {
  id: string;
  url: string;
}

export interface CatImage extends BasicImage {
  width?: number;
  height?: number;
  breeds?: Breed;
  vote?: Partial<Vote>;
  favourite?: Partial<Vote>;
}

export interface Favourite {
  created_at: string;
  id: number;
  image: BasicImage;
  image_id: string;
  sub_id: string;
  user_id: string;
}

export interface Vote {
  created_at: string;
  id: number;
  image: BasicImage;
  image_id: string;
  sub_id: string;
  user_id: string;
  country_code: string;
  value: number;
}

export interface Breed {
  weight: Weight;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
}

export interface Weight {
  imperial: string;
  metric: string;
}
