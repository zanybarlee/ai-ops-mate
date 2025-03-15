
/**
 * Animation utility functions for smooth transitions and effects
 */

export const fadeIn = (element: HTMLElement, duration: number = 500, delay: number = 0): void => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
  
  // Force reflow
  void element.offsetWidth;
  
  // Start animation
  element.style.opacity = '1';
};

export const fadeOut = (element: HTMLElement, duration: number = 500, delay: number = 0): Promise<void> => {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }
    
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
    
    // Force reflow
    void element.offsetWidth;
    
    // Start animation
    element.style.opacity = '0';
    
    setTimeout(() => {
      resolve();
    }, duration + delay);
  });
};

export const slideUp = (element: HTMLElement, distance: number = 20, duration: number = 500, delay: number = 0): void => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = `translateY(${distance}px)`;
  element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
  
  // Force reflow
  void element.offsetWidth;
  
  // Start animation
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
};

export const slideDown = (element: HTMLElement, distance: number = 20, duration: number = 500, delay: number = 0): void => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = `translateY(-${distance}px)`;
  element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
  
  // Force reflow
  void element.offsetWidth;
  
  // Start animation
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
};

export const staggered = (elements: HTMLElement[], staggerAmount: number = 100, animationFn: (el: HTMLElement, d: number) => void): void => {
  elements.forEach((element, index) => {
    const delay = index * staggerAmount;
    animationFn(element, delay);
  });
};

export const pulse = (element: HTMLElement, scale: number = 1.05, duration: number = 300): void => {
  if (!element) return;
  
  element.style.transform = 'scale(1)';
  element.style.transition = `transform ${duration}ms ease-in-out`;
  
  // Force reflow
  void element.offsetWidth;
  
  // Start animation
  element.style.transform = `scale(${scale})`;
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, duration);
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};
