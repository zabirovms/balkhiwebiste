import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, BookOpen, Bookmark, Play, Share, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import AudioPlayer from '@/components/AudioPlayer';
import TagBadge from '@/components/TagBadge';
import { usePoem } from '@/hooks/use-poem';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { shareContent } from '@/lib/utils';

const DivanDetail = () => {
  const { ghazalNumber } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('poem');
  const { openPoemModal } = usePoem();
  
  // Convert ghazalNumber to number
  const poemNumber = parseInt(ghazalNumber || '1');
  
  // Fetch Ghazal details
  const { data: poem, isLoading, error, refetch } = useQuery({
    queryKey: [`/api/divan-poems/ghazal/${poemNumber}`],
    refetchOnWindowFocus: false,
  });
  
  // Update bookmark state when poem data loads
  useEffect(() => {
    if (poem) {
      setIsBookmarked(poem.isFavorite);
    }
  }, [poem]);
  
  // Update page title
  useEffect(() => {
    if (poem) {
      document.title = `${poem.title} - Девони Шамс | Балхӣ`;
    } else {
      document.title = 'Девони Шамс | Балхӣ';
    }
  }, [poem]);
  
  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Хатогӣ",
        description: "Хангоми боргирии маълумот хатогӣ рух дод. Лутфан дубора кӯшиш кунед.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  // Toggle bookmark
  const toggleBookmark = async () => {
    if (!poem) return;
    
    try {
      const response = await apiRequest('POST', `/api/divan-poems/${poem.id}/toggle-favorite`, {});
      if (response.ok) {
        setIsBookmarked(!isBookmarked);
        queryClient.invalidateQueries({ queryKey: [`/api/divan-poems/ghazal/${poemNumber}`] });
        
        toast({
          title: isBookmarked ? "Аз рӯйхати маҳбубон хориҷ карда шуд" : "Ба рӯйхати маҳбубон илова карда шуд",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Хатогӣ",
        description: "Натавонистем ғазалро ба рӯйхати маҳбубон илова кунем.",
        variant: "destructive",
      });
    }
  };
  
  // Share poem
  const handleShare = () => {
    if (poem) {
      shareContent(poem.title, poem.content, window.location.href);
    }
  };
  
  // Navigation to previous/next ghazal
  const goToPreviousGhazal = () => {
    if (poemNumber > 1) {
      setLocation(`/divan/${poemNumber - 1}`);
    }
  };
  
  const goToNextGhazal = () => {
    setLocation(`/divan/${poemNumber + 1}`);
  };
  
  // Function to open poem in modal
  const viewInModal = () => {
    if (poem) {
      openPoemModal(poem);
    }
  };
  
  // Line-by-line animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };
  
  if (isLoading) {
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
  
  if (!poem && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800 p-6">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ғазал ёфт нашуд</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Мутаассифона, ғазали дархостшуда мавҷуд нест ё хатогӣ рух дод.</p>
            <Button asChild>
              <Link href="/divan/24">
                <a>Бозгашт ба ғазали машҳур</a>
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
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Poem content */}
        <div className="lg:col-span-3">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{poem.title}</h1>
                  <p className="text-gray-600 dark:text-gray-300">Девони Шамс</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleBookmark}
                    className={`${isBookmarked ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-200' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-primary-500 dark:fill-primary-300' : ''}`} />
                    {isBookmarked ? 'Маҳбуб' : 'Маҳбуб кардан'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Мубодила
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={viewInModal}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Тамошо
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="poem">Матн</TabsTrigger>
                  <TabsTrigger value="explanation">Шарҳ</TabsTrigger>
                  {poem.audioUrl && <TabsTrigger value="audio">Қироат</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="poem">
                  <ScrollArea className="h-[60vh] pr-4">
                    <motion.div 
                      className="poetry-text text-xl text-gray-800 dark:text-gray-200 leading-relaxed"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {poem.content.split('\n').map((line, index) => (
                        <motion.p 
                          key={index} 
                          className={`mb-2 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}
                          variants={lineVariants}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </motion.div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="explanation">
                  <ScrollArea className="h-[60vh] pr-4">
                    {poem.explanation ? (
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-800 dark:text-gray-200">{poem.explanation}</p>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-600 dark:text-gray-300">Шарҳ ва тавзеҳот барои ин ғазал ҳоло мавҷуд нест.</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                
                {poem.audioUrl && (
                  <TabsContent value="audio">
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="max-w-lg mx-auto">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Қироати ғазал</h3>
                        <AudioPlayer audioUrl={poem.audioUrl} />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                          Барои шунидани қироати пурра, тугмаи "Pахш"-ро пахш кунед.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
            
            {/* Poem navigation */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
              <Button 
                variant="ghost" 
                onClick={goToPreviousGhazal} 
                disabled={poemNumber <= 1}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Ғазали пешин
              </Button>
              <Button 
                variant="ghost" 
                onClick={goToNextGhazal}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Ғазали оянда
                <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Дар бораи ин ғазал</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Шумораи ғазал</h4>
                  <p className="text-gray-800 dark:text-gray-200">{poem.ghazalNumber}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Миқдори байт</h4>
                  <p className="text-gray-800 dark:text-gray-200">{poem.baytCount}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Мавзӯъҳо</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {poem.tags.map(tag => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Link href="/divan">
                    <a className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center transition">
                      Мушоҳидаи ҳамаи ғазалҳо
                      <ChevronLeft className="ml-1 h-4 w-4 rotate-180" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Related poems suggestion */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Ғазалҳои марбут</h3>
              
              <div className="space-y-4">
                {[
                  { id: 1, number: (poemNumber + 1) % 400, title: `Ғазали ${(poemNumber + 1) % 400}` },
                  { id: 2, number: (poemNumber + 24) % 400, title: `Ғазали ${(poemNumber + 24) % 400}` },
                  { id: 3, number: (poemNumber + 50) % 400, title: `Ғазали ${(poemNumber + 50) % 400}` },
                ].map(related => (
                  <Link key={related.id} href={`/divan/${related.number}`}>
                    <a className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{related.title}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Девони Шамс</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DivanDetail;
