import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isCard1Hovered, setCard1Hovered] = useState(false);
  const [isCard2Hovered, setCard2Hovered] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('./src/images/manila-hd.png')] bg-cover">
      <div className="container mx-auto p-4">
        <h1 className="text-center mb-20 text-white font-medium text-3xl drop-shadow-md">
          Welcome <span className="font-medium text-emerald-500">to </span><span className="font-medium text-blue-500">Centralized</span>
          <span className="font-medium text-red-500"> Manila</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            imageSrc="./src/images/mnl.svg"
            description="Citizen Portal"
            isHovered={isCard1Hovered}
            handleHover={() => setCard1Hovered(true)}
            handleLeave={() => setCard1Hovered(false)}
            to="/indexuser"
          />
          <Card
            imageSrc="./src/images/mnl_admin.svg"
            description="Admin Portal"
            isHovered={isCard2Hovered}
            handleHover={() => setCard2Hovered(true)}
            handleLeave={() => setCard2Hovered(false)}
            to="/indexadmin"
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ imageSrc, description, isHovered, handleHover, handleLeave, to }) => {
  const cardStyle = {
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)',
    color: isHovered ? 'black' : 'black',
    boxShadow: isHovered
      ? '0 4px 6px rgba(255, 255, 255, 0.7), 0 -4px 6px rgba(255, 255, 255, 0.9)'
      : 'none',
    transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out',
  };

  return (
    <Link to={to} className="p-4">
      <div
        style={cardStyle}
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => handleLeave()}
        className="w-full h-full flex flex-col justify-center items-center rounded-lg p-6"
      >
        <img src={imageSrc} alt="Card Image" className="max-w-full lg:w-40 w-20 h-auto mb-2" />
        <p className="text-center font-medium">{description}</p>
      </div>
    </Link>
  );
};

export default LandingPage;
