export interface CatImage {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds: Breed;
  vote: Partial<Vote>;
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

export interface Vote {
  country_code: string;
  created_at: string;
  id: number;
  image: Partial<CatImage>;
  image_id: string;
  sub_id: string;
  value: number;
}

export interface Weight {
  imperial: string;
  metric: string;
}
