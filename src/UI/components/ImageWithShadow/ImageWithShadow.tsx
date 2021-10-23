import React from 'react';
import './ImageWithShadow.scss'

interface IProps {
  src: string;
  alt: string;
  height?: string;
  width?: string;
}

const ImageWithShadow: React.FC<IProps> = ({src, alt, height, width}) => {
  return (
    <div className="image-with-shadow">
      <img className="image-with-shadow__image" 
        src={src} 
        alt={alt}
        height={height}
        width={width}
      />
    </div>
  );
};

export default ImageWithShadow;