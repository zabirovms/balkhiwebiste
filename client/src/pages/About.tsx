import { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  BookOpen, 
  Globe, 
  History, 
  Calendar, 
  MapPin, 
  Mail, 
  Heart
} from 'lucide-react';

const About = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Дар бораи - Балхӣ';
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
      <div className="mb-8">
        <Link href="/">
          <a className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center">
            <i className="fas fa-arrow-left mr-2"></i>
            Бозгашт ба саҳифаи асосӣ
          </a>
        </Link>
      </div>
      
      {/* Hero Section */}
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <img 
              src="https://images.unsplash.com/photo-1586158531775-37e8cf578256?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=900&q=80" 
              alt="Mawlana Jalaluddin Balkhi" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:col-span-2 p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Мавлоно Ҷалолуддини Балхӣ
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Шоир, мутафаккир ва орифи бузург (1207-1273)
            </p>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p>
                Мавлоно Ҷалолуддини Балхӣ, ки дар Ғарб бо номи Румӣ низ машҳур аст, яке аз бузургтарин шоирон, мутафаккирон ва орифони ҷаҳон мебошад. Ӯ таъсири бузурге ба адабиёт, фалсафа ва ирфони исломӣ гузоштааст ва осори ӯ то имрӯз дар саросари ҷаҳон хонда ва эҳтиром карда мешавад.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="inline-flex items-center bg-primary-700 hover:bg-primary-800 text-white">
                <Link href="#life">
                  <a>
                    <History className="mr-2 h-4 w-4" />
                    Зиндагинома
                  </a>
                </Link>
              </Button>
              
              <Button asChild className="inline-flex items-center bg-secondary-700 hover:bg-secondary-800 text-white">
                <Link href="#works">
                  <a>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Осор
                  </a>
                </Link>
              </Button>
              
              <Button asChild className="inline-flex items-center bg-accent-600 hover:bg-accent-700 text-accent-950">
                <Link href="#influence">
                  <a>
                    <Globe className="mr-2 h-4 w-4" />
                    Таъсир дар ҷаҳон
                  </a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="biography" className="mb-12">
        <TabsList className="mb-8 flex justify-center">
          <TabsTrigger value="biography" className="px-8 py-3">Зиндагинома</TabsTrigger>
          <TabsTrigger value="works" className="px-8 py-3">Осор</TabsTrigger>
          <TabsTrigger value="influence" className="px-8 py-3">Таъсир дар ҷаҳон</TabsTrigger>
          <TabsTrigger value="about-us" className="px-8 py-3">Дар бораи мо</TabsTrigger>
        </TabsList>
        
        {/* Biography Tab */}
        <TabsContent value="biography" id="life">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <User className="text-primary-600 mr-3 h-6 w-6" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Зиндагии Мавлоно</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-3">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>
                        Ҷалолуддин Муҳаммад ибни Баҳоуддин Муҳаммад ибни Ҳусайн, машҳур ба Мавлоно (ё Мавлавӣ) ва дар Ғарб бо номи Румӣ, дар 30 сентябри соли 1207 дар шаҳри Балх (дар Афғонистони имрӯза) таваллуд шудааст.
                      </p>
                      
                      <p>
                        Падари ӯ, Баҳоуддин Валад, ки бо лақаби "Султон-ул-уламо" (Султони донишмандон) машҳур буд, донишманди барҷаста ва воизи маъруф буд. Ҳангоме ки Ҷалолуддин кӯдак буд, оилаи онҳо маҷбур шуд аз Балх фирор кунад. Сабаби аниқи ин фирор маълум нест, вале эҳтимол дорад, ки таҳдидҳои Муғулҳо ё ихтилофи назар бо Фахриддин Розӣ, мутафаккири машҳури он замон, боиси он гардидааст.
                      </p>
                      
                      <p>
                        Оилаи Ҷалолуддин баъд аз тарки Балх ба шаҳрҳои мухталифи Хуросон, Бағдод ва дар ниҳоят барои адои ҳаҷ ба Макка сафар намуданд. Пас аз бозгашт аз ҳаҷ, оила муддате дар Сурия монд, сипас бо даъвати Алоуддин Кайқубод, ҳокими Салҷуқии Рум, дар шаҳри Қуния (дар Туркияи имрӯза) иқомат ихтиёр кард.
                      </p>
                      
                      <p>
                        Ҷалолуддин дар Қуния ба омӯзиши улуми диннӣ ва тасаввуф машғул шуд. Пас аз вафоти падараш дар соли 1231, ӯ ҷонишини падар гардид ва ба тадриси улуми диннӣ пардохт. Дар ин давра Ҷалолуддин мисли падараш воиз ва фақеҳи маъруф буд, вале ҳанӯз ба мартабаи шеъру ирфон нарасида буд.
                      </p>
                      
                      <p>
                        Дар соли 1244, Ҷалолуддин бо шахсе бо номи Шамси Табрезӣ вохӯрд, ки ин вохӯрӣ ҳаёти ӯро комилан тағйир дод. Шамс дарвеши ғайримаъмулӣ ва шӯридаҳол буд, ки назариёти радикалӣ дошт. Ӯ Ҷалолуддинро аз донишманди хушк ба шоир ва ориф табдил дод. Таъсири Шамс ба Ҷалолуддин чунон амиқ буд, ки ӯ дигар ба тадрис таваҷҷуҳи чандоне надошт ва бисёр вақти худро бо Шамс мегузаронид.
                      </p>
                      
                      <p>
                        Аммо муридони Ҷалолуддин ба Шамс ҳасадат бурданд ва ниҳоятан, дар соли 1247, Шамс ба таври мармузе ғайб зад ва эҳтимолан кушта шуд. Ҷалолуддин аз ғайбати Шамс бисёр андӯҳгин шуд ва дар ҷустуҷӯи ӯ ба Димишқ (Сурия) сафар кард, вале ӯро пайдо накард.
                      </p>
                      
                      <p>
                        Пас аз бозгашт ба Қуния, Ҷалолуддин дар ғаму андӯҳи Шамс шеърҳои бешуморе суруд, ки бо тахаллуси "Шамс" ё "Шамси Табрезӣ" имзо кард. Ин ашъор баъдҳо дар маҷмӯаи бузурге бо номи "Девони Шамси Табрезӣ" ё "Девони кабир" ҷамъоварӣ шуд.
                      </p>
                      
                      <p>
                        Дар солҳои охири ҳаёташ, Ҷалолуддин "Маснавии Маънавӣ"-ро, ки шоҳкори азими адабию ирфонӣ аст, бо ёрии мурид ва котиби худ, Ҳисомуддин Чалабӣ, таълиф кард. Маснавӣ аз шаш дафтар иборат аст ва беш аз 25 000 байт дорад.
                      </p>
                      
                      <p>
                        Ҷалолуддин дар 17 декабри соли 1273 дар Қуния даргузашт. Мақбараи ӯ дар Қуния воқеъ аст ва имрӯз зиёратгоҳи муҳим ва мақоми сайёҳӣ мебошад. Пас аз вафоти ӯ, муридонаш тариқати Мавлавия (дар Ғарб маъруф ба "дарвешони чархзананда") таъсис карданд, ки то имрӯз идома дорад.
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Рӯйдодҳои муҳим</h3>
                      
                      <div className="space-y-3">
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1207</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Таваллуд дар шаҳри Балх</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1219-1220</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Муҳоҷират аз Балх</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1231</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Вафоти падар, Баҳоуддин Валад</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1244</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Мулоқот бо Шамси Табрезӣ</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1247</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Нопадид шудани Шамс</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1256-1273</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Таълифи Маснавии Маънавӣ</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mr-2">
                            <Calendar className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">1273</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Вафот дар Қуния</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <MapPin className="text-secondary-600 mr-3 h-6 w-6" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Ҷойҳои муҳим дар зиндагии Мавлоно</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <img 
                      src="https://images.unsplash.com/photo-1636555577406-748e27d97c12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                      alt="Balkh, Afghanistan" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent>
                      <h3 className="text-lg font-semibold mt-4 mb-2">Балх, Афғонистон</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Шаҳри таваллуди Мавлоно, ки дар он замон яке аз марказҳои муҳими илму адаб дар ҷаҳони исломӣ буд.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <img 
                      src="https://images.unsplash.com/photo-1598453384856-63bf86b35cfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                      alt="Konya, Turkey" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent>
                      <h3 className="text-lg font-semibold mt-4 mb-2">Қуния, Туркия</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Шаҳре, ки Мавлоно бештари умри худро дар он гузаронид, дар ҳамин ҷо Маснавии Маънавиро таълиф кард ва мақбараи ӯ низ дар ҳамин шаҳр аст.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <img 
                      src="https://images.unsplash.com/photo-1622877435524-89a91e623564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80" 
                      alt="Damascus, Syria" 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent>
                      <h3 className="text-lg font-semibold mt-4 mb-2">Димишқ, Сурия</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Шаҳре, ки Мавлоно пас аз нопадид шудани Шамс барои ҷустуҷӯи ӯ ба он ҷо сафар кард.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        {/* Works Tab */}
        <TabsContent value="works" id="works">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="text-primary-600 mr-3 h-6 w-6" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Осори Мавлоно</h2>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p>
                    Мавлоно Ҷалолуддини Балхӣ аз маъруфтарин шоирон ва мутафаккирони тасаввуф аст. Осори ӯ ба забони форсӣ-тоҷикӣ таълиф шуда, ба тамоми ҷаҳон шӯҳрат пайдо кардааст. Машҳуртарин осори ӯ инҳоянд:
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <Card className="overflow-hidden">
                    <div className="relative h-64">
                      <img 
                        src="https://images.unsplash.com/photo-1567016546367-c27a0d56712e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80" 
                        alt="Masnavi Manuscript" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-2xl font-bold text-white mb-2">Маснавии Маънавӣ</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="prose dark:prose-invert">
                      <p>
                        Маснавии Маънавӣ бузургтарин асари Мавлоно аст, ки дар шаш дафтар ва наздик ба 25 000 байт навишта шудааст. Ин асар маҷмӯаи ҳикоятҳои тамсилӣ аст, ки мафҳумҳои ирфониро ба таври осон ва ҷолиб баён мекунад.
                      </p>
                      <p>
                        Мавзӯъҳои Маснавӣ хеле гуногунанд: ишқ, маърифати Худо, ахлоқ, худшиносӣ, камолоти инсонӣ ва ҳикматҳои зиндагӣ. Маснавӣ дар тамоми ҷаҳон эътироф шудааст ва ба бисёр забонҳо тарҷума шудааст.
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/masnavi/1">
                          <a>Мутолиаи Маснавӣ</a>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="relative h-64">
                      <img 
                        src="https://images.unsplash.com/photo-1604845184254-dbc0cb29c2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=400&q=80" 
                        alt="Divan-e Shams" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-2xl font-bold text-white mb-2">Девони Шамс</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="prose dark:prose-invert">
                      <p>
                        Девони Шамс ё Девони кабир маҷмӯаи ғазалиёт ва рубоиёти Мавлоно мебошад, ки аксаран бо тахаллуси "Шамс" ва "Шамси Табрезӣ" навишта шудаанд. Ин девон беш аз 3000 ғазал ва 1700 рубоӣ дорад.
                      </p>
                      <p>
                        Девони Шамс саршор аз шӯру эҳсосот ва ваҷду ҳол аст. Ин ашъор таҷрибаи шахсии Мавлоноро аз ишқи илоҳӣ, ки тавассути дӯстиаш бо Шамси Табрезӣ шукуфон шуд, инъикос мекунанд.
                      </p>
                      <Button asChild className="mt-4">
                        <Link href="/divan/24">
                          <a>Мутолиаи Девони Шамс</a>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Фиҳи мо фиҳи</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Маҷмӯаи суханронӣ ва дарсҳои Мавлоно, ки аз ҷониби шогирдонаш ҷамъоварӣ шудааст. Ин китоб суханони Мавлоноро дар бораи масъалаҳои гуногуни ирфонӣ дар бар мегирад.
                      </p>
                      <Button variant="outline" id="fihi-ma-fihi">Маълумоти бештар</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Мактубот</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Маҷмӯаи номаҳои Мавлоно ба дӯстон, шогирдон ва ҳокимони замони худ. Ин номаҳо нишондиҳандаи дидгоҳҳои ахлоқӣ ва иҷтимоии Мавлоно мебошанд.
                      </p>
                      <Button variant="outline" id="maktubat">Маълумоти бештар</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <i className="fas fa-quote-right text-2xl text-secondary-600 mr-3"></i>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Иқтибосҳои машҳур</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 mb-3">
                      "Биё, биё, ҳар чи ҳастӣ, биё,
                      Гар кофирӣ, гар бидпарастӣ, биё."
                    </blockquote>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Девони Шамс, Ғазали 24</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 mb-3">
                      "Бишнав аз най чун ҳикоят мекунад,
                      Аз ҷудоиҳо шикоят мекунад."
                    </blockquote>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Маснавии Маънавӣ, Дафтари аввал</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 mb-3">
                      "Ту макун дар ҷисм ва дар хун нигаҳ,
                      Мо ҳамон андешаем, эй эътибор."
                    </blockquote>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Маснавии Маънавӣ, Дафтари дуюм</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 mb-3">
                      "Нури ҳақро набувад нуру дигар,
                      Нест андар рухи ӯ ранги дигар."
                    </blockquote>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Девони Шамс, Ғазали 100</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        {/* Influence Tab */}
        <TabsContent value="influence" id="influence">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Globe className="text-primary-600 mr-3 h-6 w-6" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Таъсири Мавлоно дар ҷаҳон</h2>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p>
                    Таъсири Мавлоно Ҷалолуддини Балхӣ танҳо ба ҷаҳони исломӣ маҳдуд намешавад, балки ӯ яке аз маъруфтарин шоирон ва мутафаккирони ҷаҳон аст. Осори ӯ ба бисёр забонҳо тарҷума шудааст ва дар саросари ҷаҳон хонандагони зиёд дорад.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Дар адабиёт</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Мавлоно ба адабиёти форсӣ-тоҷикӣ ва тамоми адабиёти ҷаҳон таъсири амиқ гузоштааст. Ӯ дар шеъри ирфонӣ навовариҳои муҳим кард ва сабки шеърии ӯ то имрӯз мавриди тақлид аст. Шоирони зиёде дар тамоми ҷаҳон аз осори ӯ илҳом гирифтаанд.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Дар тасаввуф</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Маснавии Маънавӣ яке аз муҳимтарин манбаъҳои тасаввуф аст ва то имрӯз дар ҳалқаҳои сӯфиёна омӯхта мешавад. Мавлоно бунёнгузори тариқати Мавлавия аст, ки яке аз муҳимтарин тариқатҳои тасаввуф ба шумор меравад.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Дар фарҳанги ғарбӣ</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Дар ғарб Мавлоно бо номи Румӣ машҳур аст ва осори ӯ дар байни хонандагони ғарбӣ маҳбубияти зиёд дорад. Ашъори ӯ ба бисёр забонҳои ғарбӣ тарҷума шудааст ва дар ИМА ӯ яке аз серхонандатарин шоирон аст.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Мавлоно дар фарҳанги муосир</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Имрӯз осори Мавлоно ҳамоно мубрам аст ва паёми ишқу сулҳ, таҳаммул ва якпорчагии ӯ дар ҷаҳони тақсимшуда ва низоъомези имрӯза аҳамияти хос дорад. Андешаҳои Мавлоно дар мавриди гуногунӣ ва пазириши ҳама афрод сарфи назар аз дину эътиқод ва фарҳангашон барои ҷаҳони имрӯз паёми муҳим дорад.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Осори Мавлоно дар мусиқӣ, кино, театр ва дигар намудҳои санъати муосир истифода мешавад. Дар бисёр кишварҳои ҷаҳон фестивалҳо ва ҷашнвораҳо ба муносибати солгарди таваллуд ё вафоти ӯ баргузор мегарданд.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">ЮНЕСКО ва Мавлоно</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ЮНЕСКО соли 2007-ро ба муносибати 800-умин солгарди таваллуди Мавлоно "Соли байналмиллалии Мавлоно" эълон кард. Дар тамоми ҷаҳон чорабиниҳои гуногун ба муносибати ин сана баргузор гардиданд.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Мавлоно ва Барномаи Ҷаҳонии Ғизо</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Барномаи Ҷаҳонии Ғизои Созмони Милали Муттаҳид аз суханони Мавлоно "Саховат манбаи оромиш аст" ҳамчун шиори худ истифода мебарад.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
        
        {/* About Us Tab */}
        <TabsContent value="about-us">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
              variants={itemVariants}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Heart className="text-primary-600 mr-3 h-6 w-6" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100" id="about-us">Дар бораи вебсайти мо</h2>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p>
                    Вебсайти "Балхӣ" бо ҳадафи муаррифӣ ва дастрас кардани осори Мавлоно Ҷалолуддини Балхӣ (Румӣ) ба хонандагони тоҷикзабон таъсис дода шудааст. Мо бовар дорем, ки паёми ишқу сулҳи Мавлоно барои ҷаҳони имрӯз бисёр муҳим аст.
                  </p>
                  <p>
                    Ҳадафи мо ҷамъоварӣ, тафсир ва шарҳи осори Мавлоно ба забони тоҷикӣ мебошад, то хонандагон битавонанд бо осори ин шоир ва мутафаккири бузург ба таври осон ва муассир шинос шаванд.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div id="team">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Гурӯҳи мо</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Гурӯҳи мо аз мутахассисони адабиёт, забоншиносӣ, таърих ва фановарии иттилоот иборат аст. Мо барои беҳтар кардани вебсайт ва тавсеаи мӯҳтавои он пайваста кор мекунем.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Агар шумо ҳам ба осори Мавлоно Ҷалолуддини Балхӣ таваҷҷуҳ доред ва мехоҳед ба гурӯҳи мо ҳамкорӣ кунед, лутфан бо мо тамос бигиред.
                    </p>
                  </div>
                  
                  <div id="contact">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Тамос бо мо</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary-600 mr-3" />
                        <span className="text-gray-600 dark:text-gray-300">info@balkhi.tj</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fab fa-telegram text-primary-600 mr-3 text-xl"></i>
                        <span className="text-gray-600 dark:text-gray-300">@BalkhiBot</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fab fa-instagram text-primary-600 mr-3 text-xl"></i>
                        <span className="text-gray-600 dark:text-gray-300">@balkhi_official</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div id="privacy">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Сиёсати махфият</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Мо ба махфияти корбарони худ эҳтиром мегузорем. Маълумоти шахсии шумо танҳо барои беҳтар кардани хидматрасонии мо истифода мешавад ва ба шахсони сеюм дода намешавад.
                    </p>
                    <Button variant="outline">Маълумоти бештар</Button>
                  </div>
                  
                  <div id="terms">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Шартҳои истифода</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Тамоми мӯҳтавои вебсайти мо таҳти иҷозатномаи "Creative Commons Attribution-NonCommercial-ShareAlike" қарор дорад. Шумо метавонед онро бо зикри манбаъ истифода кунед, аммо истифодаи тиҷоратии он бидуни иҷозати қаблӣ мамнӯъ аст.
                    </p>
                    <Button variant="outline">Маълумоти бештар</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
