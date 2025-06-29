import React, { useState } from 'react';

const images: string[] = [
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=2',
  'https://picsum.photos/300/200?random=3',
  'https://picsum.photos/300/200?random=4',
  'https://picsum.photos/300/200?random=5',
  'https://picsum.photos/300/200?random=6',
  'https://picsum.photos/300/200?random=7',
  'https://picsum.photos/300/200?random=8',
  'https://picsum.photos/300/200?random=9',
  'https://picsum.photos/300/200?random=10',
  'https://picsum.photos/300/200?random=11',
  'https://picsum.photos/300/200?random=12',
  'https://picsum.photos/300/200?random=13',
  'https://picsum.photos/300/200?random=14',
  'https://picsum.photos/300/200?random=15',
  'https://picsum.photos/300/200?random=16',
];

const Gallery: React.FC = () => {
  const [enlargedImage, setEnlargedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setEnlargedImage(index);
  };

  const handleOverlayClick = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
        Image Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className={`w-full h-48 object-cover gallery-image ${
                enlargedImage === index ? 'enlarged' : ''
              }`}
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>
      {enlargedImage !== null && (
        <div className="overlay" onClick={handleOverlayClick}></div>
      )}
    </div>
  );
};

export default Gallery;