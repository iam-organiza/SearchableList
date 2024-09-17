import { useDataManagement } from "../hooks/useDataManagement";

const BUTTON_STYLE =
  "h-8 rounded bg-gray-300/20 px-2.5 py-1.5 text-xs hover:bg-gray-300/70 transition-colors duration-200 min-w-24";

const CHEVRON = (
  <svg
    className="pointer-events-none absolute right-1 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Implement your solution here and also feel free to create new files as needed folder. Although, this is the entry component that will be tested
 */

export const SearchableList = () => {
  const {items,
    totalItems,
    totalPages,
    isLoading,
    error,
    categories,
    search,
    currentPage,
    category,
    sortBy,
    nextPage,
    previousPage,
    setSearch,
    setCategory,
    setSortBy} = useDataManagement();

  /**
   * Use the test id - data-test-id="loading-indicator" for your loader component
   * Use the test id - data-test-id="error-indicator" for your error component
   */

  return (
    <div className="rounded-md border border-neutral-200 text-sm">
      {
        error && <div className="alert alert-danger" data-test-id="error-indicator"><p>{error}</p></div>
      }
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 border-b border-b-neutral-200 p-4">
        {/* Modify this for your search functionality */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-test-id="search-input"
          placeholder="Search by name..."
          className="h-9 w-full rounded-md border px-2 text-sm placeholder:text-xs sm:basis-1/4"
        />

        <div className="h- hidden min-h-8 w-[1px] bg-neutral-200 sm:flex" />

        {/* Modify this for your category filtering */}
        <div className="relative grid sm:basis-1/4">
          {CHEVRON}
          <select
            defaultValue=""
            onChange={(e) => setCategory(e.target.value)}
            data-test-id="category-select"
            className="block h-9 w-full appearance-none rounded-md border bg-white px-2 text-sm"
          >
            <option value="" className="text-sm">
              Select category
            </option>
            {
              categories.map(category => (
                <option value={category} className="text-sm">
               {category}
              </option>
              ))
            }
          </select>
        </div>

        <div className="h- hidden min-h-8 w-[1px] bg-neutral-200 sm:flex" />

        {/* Modify this for your sorting */}
        <div className="relative grid sm:basis-1/4">
          {CHEVRON}
          <select
            defaultValue={""}
            onChange={(e) => setSortBy(e.target.value)}
            data-test-id="sort-select"
            className="block h-9 w-full appearance-none rounded-md border bg-white px-2 text-sm"
          >
            <option value="" className="text-sm">
              Sort by
            </option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="dateAdded">Date</option>
          </select>
        </div>
      </div>

      <div className="p-4">
        {/** Good luck */}

        {
        isLoading && <div data-test-id="loading-indicator"><p>loading...</p></div>
      }

        {/** Iterate over this component */}
        {
          items.map(({name, description, category, dateAdded}) => (
            <div data-test-id="list-item">
              <p data-test-id="list-item-name">{name}</p>
              <p data-test-id="list-item-description">{description}</p>
              <p data-test-id="list-item-category">{category}</p>
              <p data-test-id="list-item-date">{dateAdded}</p>
            </div>
          ))
        }
      </div>

      <div
        data-test-id="pagination-controls"
        className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-2 border-t border-t-neutral-200 p-4 text-xs"
      >
        <div>
          <p>{`Page ${currentPage} of ${totalPages}`}</p>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-end gap-x-2 gap-y-2">
          <button
            type="button"
            data-test-id="previous-page-button"
            className={BUTTON_STYLE}
            onClick={nextPage}
          >
            Previous
          </button>
          <button
            type="button"
            data-test-id="next-page-button"
            className={BUTTON_STYLE}
            onClick={previousPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
