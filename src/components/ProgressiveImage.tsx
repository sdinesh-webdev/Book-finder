import { useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  index: number;
  currentIndex: number;
  onLoadNext: () => void;
}

export default function ProgressiveImage({ src, alt, index, currentIndex, onLoadNext }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (index === currentIndex) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoaded(true);
        onLoadNext(); // tell parent to load next
      };
    }
  }, [index, currentIndex, src, onLoadNext]);

  if (!loaded) {
    return (
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded" />
    );
  }

  return <img src={src} alt={alt} className="w-full h-48 object-cover rounded" />;
}
