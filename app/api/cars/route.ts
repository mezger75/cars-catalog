import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { cars } from './cars';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (id) {
    const car = cars.find((car) => String(car.id) === id);
    if (car) {
      return NextResponse.json({ car });
    } else {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedCars = cars.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cars.length / limit);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json({
    cars: paginatedCars,
    totalPages,
  });
}

export async function POST(request: NextRequest) {
  const newCar = await request.json();

  const carWithId = {
    ...newCar,
    id: nanoid(5),
  };
  cars.push(carWithId);

  return NextResponse.json(cars);
}
