import { useEffect, useRef } from 'react';

// Hook to handle fade-in animations on scroll
export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Create the observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all sections with fade-in-section class
    document.querySelectorAll('.fade-in-section').forEach(section => {
      section.classList.remove('fade-in');
      observerRef.current?.observe(section);
    });
    
    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  return { observerRef };
}

export default useScrollAnimation;
