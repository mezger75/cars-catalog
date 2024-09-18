interface IFiltersProps {
  brands: string[];
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  colors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const FilterSelects = ({
  brands,
  selectedBrand,
  setSelectedBrand,
  colors,
  selectedColor,
  setSelectedColor,
}: IFiltersProps) => {
  return (
    <div className="flex gap-4">
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Colors</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelects;
