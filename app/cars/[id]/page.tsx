'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';

import placeholder from '@/public/placeholder.jpg';
import { useCarDetails } from '@/app/utils/hooks';

type CarDetailsProps = {
  params: {
    id: string;
  };
};

const CarDetails = ({ params }: CarDetailsProps) => {
  const { car } = useCarDetails(params.id);

  if (!car) {
    return notFound();
  }

  return (
    <div className="mx-auto p-4">
      <div className="h-[350px]">
        <Image
          src={car.image || placeholder.src}
          alt={car.brand as string}
          className="w-full h-full object-cover mb-4"
          width={300}
          height={200}
          unoptimized={!!car.image}
        />
      </div>
      <h1 className="text-2xl font-bold">
        {car.brand} {car.model}
      </h1>
      <p>Color: {car.color}</p>
      <p>Price: ${car.price}</p>
      <p>Year: {car.year}</p>
      <p>Engine Type: {car.engineType}</p>
      {car.engineType === 'Electric' && <p>Range: {car.range} km</p>}
      {car.transmission && <p>Transmission: {car.transmission}</p>}
    </div>
  );
};

export default CarDetails;
