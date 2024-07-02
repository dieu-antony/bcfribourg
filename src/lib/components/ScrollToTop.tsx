import { ChevronUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 transition-opacity duration-300 ${isVisible ? 'opacity-70' : 'opacity-0'}`}>
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 text-white bg-picton-blue-600 rounded-full shadow-lg hover:bg-picton-blue-700 focus:outline-none"
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ScrollToTop;
