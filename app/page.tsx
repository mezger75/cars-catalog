'use client';

import CarCard from '@/app/components/car-card';
import FilterSelects from '@/app/components/filter-selects';
import SortingButtons from '@/app/components/sorting-buttons';
import { Car } from '@/app/utils/types';
import { useCars } from '@/app/utils/hooks';

const Home = () => {
  const {
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
  } = useCars();

  if (loading && cars.length === 0)
    return (
      <div className="flex justify-center items-center grow">Loading...</div>
    );

  return (
    <>
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <FilterSelects
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            colors={colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <SortingButtons
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car: Car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div ref={observerRef} className="h-2"></div>
      {loading && <div className="text-center">Loading...</div>}
      {!hasMore && cars.length !== 0 && (
        <div className="text-center">No more cars available</div>
      )}

      {cars.length === 0 && !loading && (
        <div className="flex justify-center items-center grow">
          No results for this request 😢
        </div>
      )}
    </>
  );
};

export default Home;
