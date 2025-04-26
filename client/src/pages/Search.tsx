import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { usePoem } from '@/hooks/use-poem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { BookOpen, Search as SearchIcon, Filter, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import PoemCard from '@/components/PoemCard';
import TagBadge from '@/components/TagBadge';
import { getTagColor } from '@/lib/utils';

const Search = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const { openPoemModal } = usePoem();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Parse query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);
  
  // Update page title
  useEffect(() => {
    document.title = searchQuery 
      ? `Ҷустуҷӯ: ${searchQuery} - Балхӣ` 
      : 'Ҷустуҷӯ - Балхӣ';
  }, [searchQuery]);
  
  // Fetch search results
  const { data: results, isLoading, error } = useQuery({
    queryKey: [`/api/search?q=${encodeURIComponent(searchQuery)}`],
    enabled: searchQuery.length > 0,
    refetchOnWindowFocus: false,
  });
  
  // Filter results based on active tab and filters
  const filteredResults = results?.filter(poem => {
    if (activeTab === 'divan' && !('ghazalNumber' in poem)) {
      return false;
    }
    
    if (activeTab === 'masnavi' && !('bookId' in poem)) {
      return false;
    }
    
    if (activeFilters.length > 0 && 'tags' in poem) {
      return poem.tags.some(tag => activeFilters.includes(tag));
    }
    
    return true;
  });
  
  // Handle poem click
  const handlePoemClick = (poem: any) => {
    openPoemModal(poem);
  };
  
  // Handle filter toggle
  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setActiveTab('all');
  };
  
  // Extract all available tags from results
  const allTags = results 
    ? Array.from(new Set(
        results
          .filter(poem => 'tags' in poem)
          .flatMap(poem => poem.tags)
      ))
    : [];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ҷустуҷӯ</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Матни мавриди назаратонро дар осори Мавлоно Ҷалолуддини Балхӣ ҷустуҷӯ кунед.
        </p>
        
        <SearchBar
          initialValue={searchQuery}
          onSearch={(query) => setSearchQuery(query)}
          placeholder="Ҷустуҷӯ дар осори Мавлоно..."
        />
      </motion.div>
      
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Натиҷаҳои ҷустуҷӯ барои "{searchQuery}"
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isLoading ? 'Дар ҳоли ҷустуҷӯ...' : filteredResults?.length ? `${filteredResults.length} натиҷа ёфт шуд` : 'Натиҷа ёфт нашуд'}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center">
                  {activeFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="mr-2"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Тоза кардан
                    </Button>
                  )}
                  
                  <div className="text-gray-500 dark:text-gray-400 flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    Филтр
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">Ҳама</TabsTrigger>
                    <TabsTrigger value="divan">Девони Шамс</TabsTrigger>
                    <TabsTrigger value="masnavi">Маснавӣ</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {allTags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Мавзӯъҳо:</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => {
                      const isActive = activeFilters.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleFilter(tag)}
                          className={`inline-flex items-center text-sm rounded-full px-3 py-1 transition-colors ${
                            isActive 
                              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                          {isActive && <X className="ml-1 h-3 w-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <Separator className="mb-6" />
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg h-32"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Дар вақти ҷустуҷӯ хатогӣ рух дод.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                  >
                    Бори дигар кӯшиш кунед
                  </Button>
                </div>
              ) : filteredResults?.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">Натиҷае ёфт нашуд</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Мутаассифона, мо натавонистем ягон натиҷа барои ҷустуҷӯи шумо пайдо кунем.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Калимаи дигареро ҷустуҷӯ кунед ё филтрҳоро иваз кунед.
                  </p>
                  <Button onClick={clearFilters}>Тоза кардани филтрҳо</Button>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {filteredResults?.map((poem) => (
                    <motion.div 
                      key={`${poem.id}-${'ghazalNumber' in poem ? 'divan' : 'masnavi'}`}
                      variants={itemVariants}
                      onClick={() => handlePoemClick(poem)}
                      className="cursor-pointer"
                    >
                      <PoemCard poem={poem} highlightText={searchQuery} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          
          {!isLoading && !error && filteredResults?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Ҷустуҷӯҳои маъмул
              </h3>
              <div className="flex flex-wrap gap-3">
                {['ишқ', 'най', 'дӯст', 'хуршед', 'маърифат', 'ҳикмат'].map(term => (
                  <Link 
                    key={term} 
                    href={`/search?q=${encodeURIComponent(term)}`}
                  >
                    <a className="inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2 transition-colors">
                      <SearchIcon className="h-3 w-3 mr-2" />
                      {term}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {!searchQuery && (
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden text-center p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
            Ҷустуҷӯи худро оғоз кунед
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            Барои ёфтани мисраъҳо, калимаҳо ё мавзӯъҳои мавриди назаратон дар осори Мавлоно Ҷалолуддини Балхӣ, калимаҳои калидиро дар қисмати ҷустуҷӯ ворид кунед.
          </p>
          
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Ҷустуҷӯҳои маъмул:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['ишқ', 'най', 'дӯст', 'хуршед', 'маърифат', 'ҳикмат'].map(term => (
                <Link 
                  key={term} 
                  href={`/search?q=${encodeURIComponent(term)}`}
                >
                  <a className="inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2 transition-colors">
                    <SearchIcon className="h-3 w-3 mr-2" />
                    {term}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Search;
