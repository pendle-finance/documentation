import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function useLottieAnimation(animationData, name) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        name,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [animationData, name]);

  const playAnimation = () => {
    lottie.play(name);
  };

  const stopAnimation = () => {
    lottie.stop(name);
  };

  return {
    containerRef,
    playAnimation,
    stopAnimation,
  };
}