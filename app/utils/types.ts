export type Car = {
  id: number;
  image: string;
  brand: string;
  model: string;
  color: string;
  price: number;
  year: number;
  engineType: 'Electric' | 'Diesel' | 'Gasoline';
  range?: number;
  transmission?: 'Automatic' | 'Manual' | 'Robotic';
};
