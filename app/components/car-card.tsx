import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import placeholder from '@/public/placeholder.jpg';

type CarProps = {
  car: {
    id: number;
    image: string;
    brand: string;
    model: string;
    year: number;
  };
};

const CarCard: FC<CarProps> = ({ car }) => (
  <Link href={`/cars/${car.id}`} rel="noreferrer noopener">
    <div className="border p-4 rounded shadow-md cursor-pointer">
      <div className="overflow-hidden">
        <Image
          src={car.image || placeholder.src}
          alt={car.brand}
          className="w-full h-40 object-cover hover:scale-105 transition-transform"
          width={350}
          height={200}
          unoptimized={!!car.image}
        />
      </div>
      <h2 className="text-xl font-bold">
        {car.brand} {car.model}
      </h2>
      <p>{car.year}</p>
    </div>
  </Link>
);

export default CarCard;
