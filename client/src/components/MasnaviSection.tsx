import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { getDaftarColor } from '@/lib/utils';

const MasnaviSection = () => {
  // Fetch Masnavi books data
  const { data: books, isLoading, isError } = useQuery({
    queryKey: ['/api/masnavi-books'],
    refetchOnWindowFocus: false,
  });
  
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
    <section id="masnavi" className="mb-16 fade-in-section">
      <div className="flex items-center mb-6">
        <i className="fas fa-book text-2xl text-primary-600 mr-3"></i>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Маснавии Маънавӣ</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4">Маснавии Маънавӣ ё Маснавии Мавлавӣ шоҳкории бузургтарини адабиёти форсӣ дар мавзӯи фалсафа ва ирфон мебошад.</p>
        
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/4 p-2">
            <div className="flex items-center">
              <div className="mr-3 text-primary-800 dark:text-primary-400 text-lg font-bold">24,000+</div>
              <div className="text-gray-600 dark:text-gray-400">байт</div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2">
            <div className="flex items-center">
              <div className="mr-3 text-primary-800 dark:text-primary-400 text-lg font-bold">6</div>
              <div className="text-gray-600 dark:text-gray-400">дафтар</div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2">
            <div className="flex items-center">
              <div className="mr-3 text-primary-800 dark:text-primary-400 text-lg font-bold">150+</div>
              <div className="text-gray-600 dark:text-gray-400">ҳикоя</div>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-2">
            <div className="flex items-center">
              <div className="mr-3 text-primary-800 dark:text-primary-400 text-lg font-bold">13</div>
              <div className="text-gray-600 dark:text-gray-400">асри адабӣ</div>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-md h-72"></div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Хатогии боргирӣ рух дод.</p>
          <button className="text-primary-700 dark:text-primary-400 font-medium">Бори дигар кӯшиш кунед</button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books?.map((book) => (
            <motion.div 
              key={book.id}
              className="book-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              variants={itemVariants}
            >
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={book.imageUrl} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
                  <div className="p-4">
                    <span className={`inline-block ${getDaftarColor(book.daftarNumber)} text-white px-2 py-1 rounded text-xs font-bold`}>
                      Дафтари {book.daftarNumber}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{book.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{book.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{book.baytCount} байт</span>
                  <Link href={`/masnavi/${book.daftarNumber}`}>
                    <a className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center transition">
                      Мутолиа кунед
                      <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      <div className="flex justify-center mt-8">
        <Button asChild className="inline-flex items-center bg-primary-100 hover:bg-primary-200 text-primary-800 dark:bg-primary-900 dark:hover:bg-primary-800 dark:text-primary-100">
          <Link href="/masnavi">
            <a>
              <i className="fas fa-books mr-2"></i>Ҳамаи дафтарҳо
            </a>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default MasnaviSection;
