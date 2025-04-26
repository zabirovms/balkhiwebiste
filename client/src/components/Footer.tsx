import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site info */}
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-book-open text-2xl mr-3 text-accent-300"></i>
              <h3 className="text-xl font-bold">Балхӣ</h3>
            </div>
            <p className="text-gray-400 mb-4">Маҷмӯаи комили осори Мавлоно Ҷалолуддини Балхӣ ба забони тоҷикӣ бо тафсир ва шарҳи муфассал.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-telegram"></i></a>
            </div>
          </div>
          
          {/* About section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Шаффофият</h4>
            <ul className="space-y-2">
              <li><Link href="/about"><a className="text-gray-400 hover:text-white transition">Дар бораи мо</a></Link></li>
              <li><Link href="/about#team"><a className="text-gray-400 hover:text-white transition">Гурӯҳи мо</a></Link></li>
              <li><Link href="/about#contact"><a className="text-gray-400 hover:text-white transition">Тамос</a></Link></li>
              <li><Link href="/about#privacy"><a className="text-gray-400 hover:text-white transition">Сиёсати махфият</a></Link></li>
            </ul>
          </div>
          
          {/* Poetry section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Кашфи осор</h4>
            <ul className="space-y-2">
              <li><Link href="/masnavi/1"><a className="text-gray-400 hover:text-white transition">Маснавии Маънавӣ</a></Link></li>
              <li><Link href="/divan/24"><a className="text-gray-400 hover:text-white transition">Девони Шамс</a></Link></li>
              <li><Link href="/about#fihi-ma-fihi"><a className="text-gray-400 hover:text-white transition">Фиҳи мо фиҳи</a></Link></li>
              <li><Link href="/about#maktubat"><a className="text-gray-400 hover:text-white transition">Мактубот</a></Link></li>
            </ul>
          </div>
          
          {/* Newsletter signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Пайванд шавед</h4>
            <p className="text-gray-400 mb-3">Барои дарёфти тозатарин ашъор нишонии почтаи электронии худро ворид кунед.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Почтаи электронӣ" 
                className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent-400 w-full"
              />
              <button 
                type="submit" 
                className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-r-lg transition"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Балхӣ. Ҳамаи ҳуқуқ ҳифз шудаанд.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/about#terms"><a className="text-gray-400 hover:text-white text-sm transition">Шартҳои истифода</a></Link>
            <Link href="/about#privacy"><a className="text-gray-400 hover:text-white text-sm transition">Сиёсати махфият</a></Link>
            <Link href="/about#cookies"><a className="text-gray-400 hover:text-white text-sm transition">Истифодаи кукиҳо</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
