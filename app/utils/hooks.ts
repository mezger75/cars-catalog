import { useEffect, useState, useRef } from 'react';
import { fetchCarDetails, fetchCars } from './api';
import { Car } from './types';

export const useCarDetails = (id: string) => {
  const [car, setCar] = useState<Partial<Car>>({});

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await fetchCarDetails(id);
        setCar(carData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCar();
  }, [id]);

  return { car };
};

const LIMIT = 10;

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      try {
        const data = await fetchCars(page, LIMIT);
        const newCars = data.cars.filter(
          (car: Car) =>
            !allCars.some((existingCar) => existingCar.id === car.id)
        );

        if (newCars.length > 0) {
          setAllCars((prevCars) => {
            const existingCarIds = new Set(prevCars.map((car) => car.id));
            const filteredNewCars = newCars.filter(
              (car: Car) => !existingCarIds.has(car.id)
            );

            return [...prevCars, ...filteredNewCars];
          });

          setCars((prevCars) => {
            const existingCarIds = new Set(prevCars.map((car) => car.id));
            const filteredNewCars = newCars.filter(
              (car: Car) => !existingCarIds.has(car.id)
            );

            return [...prevCars, ...filteredNewCars];
          });
        }

        setLoading(false);
        setHasMore(newCars.length === LIMIT);

        if (page === 1) {
          const uniqueBrands = Array.from(
            new Set(data.cars.map((car: Car) => car.brand))
          );
          const uniqueColors = Array.from(
            new Set(data.cars.map((car: Car) => car.color))
          );
          setBrands(uniqueBrands as string[]);
          setColors(uniqueColors as string[]);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getCars();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    let filteredCars = allCars;

    if (selectedBrand) {
      filteredCars = filteredCars.filter(
        (car: Car) => car.brand === selectedBrand
      );
    }

    if (selectedColor) {
      filteredCars = filteredCars.filter(
        (car: Car) => car.color === selectedColor
      );
    }

    if (sortBy === 'year') {
      filteredCars.sort((a: Car, b: Car) =>
        sortOrder === 'asc' ? a.year - b.year : b.year - a.year
      );
    }

    if (sortBy === 'price') {
      filteredCars.sort((a: Car, b: Car) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    }

    setCars(filteredCars);
  }, [selectedBrand, selectedColor, sortBy, sortOrder, allCars]);

  const handleSort = (sortKey: string) => {
    if (sortBy === sortKey) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(sortKey);
      setSortOrder('asc');
    }
  };

  return {
    cars,
    loading,
    brands,
    selectedBrand,
    setSelectedBrand,
    colors,
    selectedColor,
    setSelectedColor,
    sortBy,
    sortOrder,
    handleSort,
    observerRef,
    hasMore,
  };
};
