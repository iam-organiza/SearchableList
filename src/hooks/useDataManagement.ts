import * as React from "react";
import { type DataItem, generateMockData } from "../tests/mockDataGenerator";

// This is the expected return type for the useDataManagement hook
export type DataManagementResult = {
  items: DataItem[];
  totalItems: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  categories: string[];
  search?: string;
  currentPage: number;
  category?: string;
  sortBy?: string;
  nextPage: () => void;
  previousPage: () => void;
  setSearch: (q: string) => void;
  setCategory: (cat: string) => void;
  setSortBy: (srt: string) => void;
};

export function useDataManagement(): DataManagementResult {
  // Implement your solution here
  const [allItems, setAllItems] = React.useState<DataItem[] | null>(null);
  const [data, setData] = React.useState<DataItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState<string | undefined>(undefined);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = React.useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalItems = React.useMemo(() => data ? data.length : 0, [data]);
  const totalPages = React.useMemo(() => data ? Math.round(data.length / 10) : 0, [data]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await generateMockData();
      
      if (response) {
        setAllItems(response);
        setData(response.slice(0, 10));
      }
    } catch (e) {
      const error = e as {message: string};
      setError(error?.message || "An error occured fetching mock data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (totalPages === currentPage) return;

    
    if (allItems && data) {
      setCurrentPage(prev => prev + 1);
      const nextItems = {...allItems.slice(data.length, data.length + 10)}
      setData({...nextItems});
    }
  }

  const handlePreviousPage = () => {
    if (currentPage === 1) return;

    
    if (allItems && data) {
      setCurrentPage(prev => prev - 1);
      const prevItems = {...allItems.slice(currentPage - 1 * 10, 10)}
      setData({...prevItems});
    }
  }

  const handleSearch = (text: string) => {
    if (text.length) {
      setSearch(text);
    }
  }
  
  const handleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategory(cat);
    }
  }

  const handleSortBy = (srt: string) => {
    if (srt) {
      setSortBy(srt);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (data) {
      const initial: string[] = [];
      const result = data.reduce((previousValue, currentValue) => {

        if (!previousValue.includes(currentValue.category)) {
          previousValue.push(currentValue.category);
        }

        return previousValue;
      }, initial);

      if (result.length) {
        setCategories(result);
      }
    }
  }, [data]);

  // Return an object with the necessary properties as described in the DataManagementResult type
  return {
    items: data || [],
    totalItems,
    totalPages,
    isLoading,
    error,
    categories,
    search,
    currentPage,
    category,
    sortBy,
    nextPage: handleNextPage,
    previousPage: handlePreviousPage,
    setSearch: handleSearch,
    setCategory: handleCategory,
    setSortBy: handleSortBy
  };
}
