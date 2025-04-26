import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="mb-16 fade-in-section">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Осори Мавлоно Ҷалолуддини Балхӣ</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Мутолиаи ашъори бузургтарин шоири ирфонӣ ва фалсафии тасаввуф дар маҷмӯаи комили осори адабӣ.</p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button asChild className="bg-primary-700 hover:bg-primary-800 text-white">
                <Link href="/masnavi/1">
                  <a className="inline-flex items-center">
                    <i className="fas fa-book mr-2"></i>Маснавии Маънавӣ
                  </a>
                </Link>
              </Button>
              <Button asChild className="bg-secondary-700 hover:bg-secondary-800 text-white">
                <Link href="/divan/24">
                  <a className="inline-flex items-center">
                    <i className="fas fa-feather-alt mr-2"></i>Девони Шамс
                  </a>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1560942485-b2a11cc13456?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Rumi manuscript illustration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
