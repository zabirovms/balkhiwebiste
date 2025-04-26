import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Grid } from 'lucide-react';
import { usePoem } from '@/hooks/use-poem';
import { getTagColor } from '@/lib/utils';

const DivanSection = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { openPoemModal } = usePoem();
  
  // Fetch Divan poems data
  const { data: poems, isLoading, isError } = useQuery({
    queryKey: ['/api/divan-poems', page, activeTag],
    queryFn: async () => {
      const url = new URL('/api/divan-poems', window.location.origin);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', '3');
      if (activeTag) {
        url.searchParams.append('tag', activeTag);
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch poems');
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Function to handle poem click
  const handlePoemClick = (poem: any) => {
    openPoemModal(poem);
  };
  
  // Function to handle tag click
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
    setPage(1);
  };
  
  // Available tags for filtering
  const tags = ['Ишқ', 'Ҳикмат', 'Ирфон', 'Табиат', 'Инсон'];
  
  return (
    <section id="divan" className="mb-16 fade-in-section">
      <div className="flex items-center mb-6">
        <i className="fas fa-feather-alt text-2xl text-accent-600 mr-3"></i>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Девони Шамс</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6 md:border-r border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Дар бораи Девони Шамс</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Девони Шамс ё Девони кабир маҷмӯаи ғазалиёт ва рубоиёти Мавлоно мебошад, ки ба номи Шамси Табрезӣ, пири маънавии ӯ номгузорӣ шудааст.</p>
            
            <div className="flex flex-col space-y-3 mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-300">3,200+ ғазал</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-300">1,700+ рубоӣ</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-300">42,000+ байт</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Ҷустуҷӯ аз рӯи мавзӯъ</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const isActive = activeTag === tag;
                  const { bg, text } = getTagColor(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`inline-block ${isActive ? `${bg} ${text}` : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'} px-3 py-1 rounded-full text-sm transition`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Ғазалҳои интихобшуда</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-700 rounded p-4 h-32"></div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">Хатогии боргирӣ рух дод.</p>
                <Button variant="outline">Бори дигар кӯшиш кунед</Button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-0'}
              >
                {poems?.map((poem) => (
                  <motion.div 
                    key={poem.id} 
                    className="poem-card p-4 border-b border-gray-100 dark:border-gray-700 hover:shadow-sm"
                    variants={itemVariants}
                    onClick={() => handlePoemClick(poem)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        <Link href={`/divan/${poem.ghazalNumber}`}>
                          <a className="hover:text-primary-700 dark:hover:text-primary-400 transition">{poem.title}</a>
                        </Link>
                      </h4>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition" aria-label="Bookmark poem">
                          <i className="far fa-bookmark"></i>
                        </button>
                        <button className="text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition" aria-label="Share poem">
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                    <p className="poetry-text text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                      {poem.content.split('\n').slice(0, 2).join('\n')}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">{poem.baytCount} байт</span>
                        <div className="flex space-x-1">
                          {poem.tags.slice(0, 2).map(tag => {
                            const { bg, text } = getTagColor(tag);
                            return (
                              <span key={tag} className={`inline-block ${bg} ${text} text-xs px-2 py-0.5 rounded`}>
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <Button 
                        variant="link" 
                        className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 p-0 h-auto text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePoemClick(poem);
                        }}
                      >
                        Мутолиаи пурра
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            <div className="mt-6 flex justify-between items-center">
              <div>
                <span className="text-gray-600 dark:text-gray-300">Саҳифа: </span>
                <span className="font-medium">{page} аз 5</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => setPage(Math.min(5, page + 1))}
                  disabled={page === 5}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivanSection;
