import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  initialValue = '', 
  placeholder = 'Ҷустуҷӯ...', 
  onSearch 
}) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  
  // Update search value when initialValue changes
  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };
  
  // Clear search input
  const clearSearch = () => {
    setSearchValue('');
    // Optional: also trigger search with empty value
    // onSearch('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex relative shadow-sm transition-all duration-300 rounded-lg ${
        isFocused ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
      }`}
    >
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full py-3 pr-12 pl-4 rounded-l-lg bg-white dark:bg-gray-800 border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      
      {searchValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      <Button 
        type="submit" 
        className="rounded-l-none rounded-r-lg"
      >
        <Search className="h-5 w-5 mr-2" />
        Ҷустуҷӯ
      </Button>
    </form>
  );
};

export default SearchBar;
