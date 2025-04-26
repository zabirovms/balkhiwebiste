import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from "@/hooks/use-theme";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search as SearchIcon, 
  Sun, 
  Moon, 
  Menu, 
  X
} from "lucide-react";

const Header = () => {
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header className="bg-gradient-to-r from-primary-800 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and title */}
          <div className="flex items-center mb-4 md:mb-0">
            <i className="fas fa-book-open text-2xl mr-3 text-accent-300"></i>
            <Link href="/">
              <a className="text-2xl md:text-3xl font-bold">Балхӣ</a>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4 top-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-white hover:bg-primary-700"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Navigation and search */}
          <div className={`flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 w-full md:w-auto ${isMenuOpen ? 'block' : 'hidden md:flex'}`}>
            {/* Search input */}
            <form onSubmit={handleSearch} className="relative mr-4 w-full sm:w-auto mb-2 sm:mb-0">
              <Input
                type="text" 
                placeholder="Ҷустуҷӯ..." 
                className="w-full sm:w-64 px-4 py-2 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400 transition duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
            </form>
            
            {/* Navigation links */}
            <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-1 items-center">
              <Link href="/">
                <a className="px-3 py-2 rounded hover:bg-primary-700 transition">Асосӣ</a>
              </Link>
              <Link href="/masnavi/1">
                <a className="px-3 py-2 rounded hover:bg-primary-700 transition">Маснавӣ</a>
              </Link>
              <Link href="/divan/24">
                <a className="px-3 py-2 rounded hover:bg-primary-700 transition">Девони Шамс</a>
              </Link>
              <Link href="/about">
                <a className="px-3 py-2 rounded hover:bg-primary-700 transition">Дар бораи</a>
              </Link>
              
              {/* Theme toggle button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="ml-2 p-2 rounded-full hover:bg-primary-700 transition"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
