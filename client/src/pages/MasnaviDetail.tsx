import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { usePoem } from '@/hooks/use-poem';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  BookOpen, 
  Bookmark, 
  Play, 
  Share
} from 'lucide-react';
import { motion } from 'framer-motion';
import PoemCard from '@/components/PoemCard';
import AudioPlayer from '@/components/AudioPlayer';
import { getTagColor, getDaftarColor, shareContent } from '@/lib/utils';

const MasnaviDetail = () => {
  const { daftarNumber } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { openPoemModal } = usePoem();
  const [activeTab, setActiveTab] = useState('stories');
  
  // Convert daftarNumber to number
  const bookId = parseInt(daftarNumber || '1');
  
  // Fetch Masnavi book details
  const { data: book, isLoading: isLoadingBook, error: bookError } = useQuery({
    queryKey: [`/api/masnavi-books/daftar/${bookId}`],
    refetchOnWindowFocus: false,
  });
  
  // Fetch Masnavi poems for this book
  const { data: poems, isLoading: isLoadingPoems, error: poemsError } = useQuery({
    queryKey: [`/api/masnavi-poems/book/${book?.id || 0}`],
    enabled: !!book?.id,
    refetchOnWindowFocus: false,
  });
  
  // Update page title
  useEffect(() => {
    if (book) {
      document.title = `${book.title} - Маснавии Маънавӣ | Балхӣ`;
    } else {
      document.title = 'Маснавии Маънавӣ | Балхӣ';
    }
  }, [book]);
  
  // Error handling
  useEffect(() => {
    if (bookError) {
      toast({
        title: "Хатогӣ",
        description: "Хангоми боргирии маълумот хатогӣ рух дод. Лутфан дубора кӯшиш кунед.",
        variant: "destructive",
      });
    }
  }, [bookError, toast]);
  
  // Handle poem click
  const handlePoemClick = (poem: any) => {
    openPoemModal(poem);
  };
  
  // Navigation to previous/next daftar
  const goToPreviousDaftar = () => {
    if (bookId > 1) {
      setLocation(`/masnavi/${bookId - 1}`);
    }
  };
  
  const goToNextDaftar = () => {
    if (bookId < 6) { // Assuming there are 6 daftars
      setLocation(`/masnavi/${bookId + 1}`);
    }
  };
  
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
  
  if (isLoadingBook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!book && !isLoadingBook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800 p-6">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Дафтар ёфт нашуд</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Мутаассифона, дафтари дархостшуда мавҷуд нест ё хатогӣ рух дод.</p>
            <Button asChild>
              <Link href="/masnavi/1">
                <a>Бозгашт ба дафтари аввал</a>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back navigation */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          asChild 
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <Link href="/">
            <a className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Бозгашт ба саҳифаи асосӣ
            </a>
          </Link>
        </Button>
      </div>
      
      {/* Book header */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={book?.imageUrl} 
            alt={book?.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <span className={`inline-block ${getDaftarColor(book?.daftarNumber || 1)} text-white px-3 py-1 rounded text-sm font-bold mb-2`}>
              Дафтари {book?.daftarNumber}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{book?.title}</h1>
            <div className="flex items-center text-gray-200 text-sm">
              <span className="mr-4">{book?.baytCount} байт</span>
              <span>Маснавии Маънавӣ</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">{book?.description}</p>
          
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Button variant="outline" className="inline-flex items-center bg-primary-50 hover:bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
              <BookOpen className="h-4 w-4 mr-2" />
              Оғози мутолиа
            </Button>
            <Button variant="outline" className="inline-flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Нигоҳ доштан
            </Button>
            <Button variant="outline" className="inline-flex items-center" onClick={() => shareContent(book?.title || '', book?.description || '')}>
              <Share className="h-4 w-4 mr-2" />
              Мубодила
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation between daftars */}
      <div className="flex justify-between mb-8">
        <Button 
          variant="outline" 
          onClick={goToPreviousDaftar} 
          disabled={bookId <= 1}
          className="inline-flex items-center"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Дафтари пешин
        </Button>
        <Button 
          variant="outline" 
          onClick={goToNextDaftar}
          disabled={bookId >= 6}
          className="inline-flex items-center"
        >
          Дафтари оянда
          <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
        </Button>
      </div>
      
      {/* Poems section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Мундариҷа</h2>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="stories">Ҳикоятҳо</TabsTrigger>
              <TabsTrigger value="themes">Мавзӯъҳо</TabsTrigger>
              <TabsTrigger value="favorites">Маҳбубтарин</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stories" className="space-y-0">
              {isLoadingPoems ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-700 rounded p-4 h-24"></div>
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {poems?.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-600 dark:text-gray-300">Ҳикоятҳо барои ин дафтар ҳоло илова нашудаанд.</p>
                    </div>
                  ) : (
                    poems?.map((poem) => (
                      <motion.div 
                        key={poem.id}
                        variants={itemVariants}
                        onClick={() => handlePoemClick(poem)}
                      >
                        <PoemCard poem={poem} />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </TabsContent>
            
            <TabsContent value="themes">
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-300">Мавзӯъҳои асосии ин дафтар дар ҳоли таҳия мебошанд.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              {poems?.filter(poem => poem.isFavorite).length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600 dark:text-gray-300">Шумо ҳоло ягон ҳикоятро ба рӯйхати маҳбубон илова накардаед.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Барои илова кардани ҳикоят, тугмаи "Нигоҳ доштан"-ро пахш кунед.</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {poems?.filter(poem => poem.isFavorite).map((poem) => (
                    <motion.div 
                      key={poem.id}
                      variants={itemVariants}
                      onClick={() => handlePoemClick(poem)}
                    >
                      <PoemCard poem={poem} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Featured poem with audio */}
      {poems && poems.length > 0 && poems[0].audioUrl && (
        <motion.div 
          className="bg-gradient-to-r from-primary-800 to-primary-700 text-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Шеъри мунтахаб</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white bg-white/20 hover:bg-white/30"
              onClick={() => handlePoemClick(poems[0])}
            >
              Намоиши пурра
            </Button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm mb-4">
            <p className="poetry-text text-xl mb-4">
              {poems[0].content.split('\n').slice(0, 4).join('\n')}...
            </p>
            <p className="text-sm opacity-80">{poems[0].title}</p>
          </div>
          
          <AudioPlayer audioUrl={poems[0].audioUrl} />
        </motion.div>
      )}
    </div>
  );
};

export default MasnaviDetail;
