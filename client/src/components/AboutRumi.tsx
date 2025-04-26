import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AboutRumi = () => {
  return (
    <section id="about" className="mb-16 fade-in-section">
      <div className="flex items-center mb-6">
        <i className="fas fa-user-alt text-2xl text-secondary-600 mr-3"></i>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Дар бораи Мавлоно Ҷалолуддини Балхӣ</h2>
      </div>
      
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1630519162658-e5a4570c6035?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800&q=80" 
              alt="Rumi portrait illustration" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">Мавлоно Ҷалолуддини Балхӣ (1207-1273), ки дар Ғарб бо номи Румӣ машҳур аст, яке аз бузургтарин шоирон ва мутафаккирони ирфонии ҷаҳон мебошад. Ӯ дар Балх (ҳоло дар Афғонистон) таваллуд шуда, бо падараш Баҳоуддин Валад ба Кония (Туркияи имрӯза) муҳоҷират кардааст.</p>
              
              <p className="mb-4">Пас аз мулоқот бо Шамси Табрезӣ дар соли 1244, ҳаёти Мавлоно тағйир ёфт ва эҷодиёти шеърии ӯ авҷ гирифт. Девони Шамс, ки маҷмӯаи ғазалиёти ӯ мебошад, дар натиҷаи ин таҳаввул ба вуҷуд омадааст.</p>
              
              <p className="mb-4">Маснавии Маънавӣ шоҳкории дигари ӯст, ки шаш дафтар ва 25,000 байтро дар бар мегирад. Ин асари бузург ганҷинаи ҳикмат, ирфон ва ахлоқ буда, яке аз таъсиргузортарин асарҳои адабии ҷаҳон маҳсуб мешавад.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button asChild variant="outline" className="bg-secondary-100 hover:bg-secondary-200 text-secondary-800 dark:bg-secondary-900 dark:hover:bg-secondary-800 dark:text-secondary-100">
                  <Link href="/about#life">
                    <a className="inline-flex items-center">
                      <i className="fas fa-history mr-2"></i>Зиндагинома
                    </a>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="bg-accent-100 hover:bg-accent-200 text-accent-800 dark:bg-accent-900 dark:hover:bg-accent-800 dark:text-accent-100">
                  <Link href="/about#works">
                    <a className="inline-flex items-center">
                      <i className="fas fa-book mr-2"></i>Осор
                    </a>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="bg-primary-100 hover:bg-primary-200 text-primary-800 dark:bg-primary-900 dark:hover:bg-primary-800 dark:text-primary-100">
                  <Link href="/about#influence">
                    <a className="inline-flex items-center">
                      <i className="fas fa-globe mr-2"></i>Таъсир дар ҷаҳон
                    </a>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutRumi;
