interface ISortingButtonsProps {
  sortBy: string;
  sortOrder: string;
  handleSort: (sortKey: string) => void;
}

const SortingButtons = ({
  sortBy,
  sortOrder,
  handleSort,
}: ISortingButtonsProps) => {
  return (
    <div className="flex gap-4">
      <button
        className="p-2 bg-blue-400 text-white rounded flex items-center"
        onClick={() => handleSort('year')}
      >
        <span className="mr-2">Sort by Year</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-300 ${
            sortBy === 'year' && sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <button
        className="p-2 bg-blue-400 text-white rounded flex items-center"
        onClick={() => handleSort('price')}
      >
        <span className="mr-2">Sort by Price</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-300 ${
            sortBy === 'price' && sortOrder === 'asc'
              ? 'rotate-0'
              : 'rotate-180'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default SortingButtons;
