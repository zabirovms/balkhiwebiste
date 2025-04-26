import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const FeaturedCollections = () => {
  // Fetch collections data
  const { data: collections, isLoading, isError } = useQuery({
    queryKey: ['/api/collections'],
    refetchOnWindowFocus: false,
  });
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="mb-16 fade-in-section">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <i className="fas fa-star text-2xl text-accent-500 mr-3"></i>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Гулчини ашъор</h2>
        </div>
        <Link href="/collections">
          <a className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition">
            Ҳамаи маҷмӯаҳо <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-md h-64"></div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Хатогии боргирӣ рух дод.</p>
          <button className="text-primary-700 dark:text-primary-400 font-medium">Бори дигар кӯшиш кунед</button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {collections?.slice(0, 3).map((collection) => (
            <motion.div 
              key={collection.id} 
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              variants={itemVariants}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={collection.imageUrl} 
                  alt={collection.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{collection.title}</h3>
                  <p className="text-gray-200 text-sm">{collection.poemCount} ашъор</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{collection.description}</p>
                <Link href={`/collections/${collection.id}`}>
                  <a className="text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center transition">
                    Мутолиа кунед
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedCollections;
