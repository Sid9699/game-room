export interface IGame {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  rating_top: number;
  description_raw: string;
}

export interface IGenre {
  id: number;
  name: string;
}
