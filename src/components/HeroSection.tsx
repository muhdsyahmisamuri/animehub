import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Search } from 'lucide-react';
import './HeroSection.css';

const FEATURED_ANIME = [
  {
    id: 16498,
    title: 'Attack on Titan',
    description: 'Humanity lives in cities surrounded by enormous walls due to Titans, gigantic humanoid creatures.',
    image: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg'
  },
  {
    id: 38000,
    title: 'Demon Slayer',
    description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister who is turned into a demon.',
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg'
  },
  {
    id: 40748,
    title: 'Jujutsu Kaisen',
    description: 'A boy swallows a cursed talisman and must learn to control the demon within to save humanity.',
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'
  }
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_ANIME.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = FEATURED_ANIME[currentIndex];

  return (
    <div className="hero-section">
      <div className="hero-background">
        <img
          src={current.image}
          alt={current.title}
          key={currentIndex}
          className="hero-background-image"
        />
        <div className="hero-overlay" />
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">{current.title}</h1>
          <p className="hero-description">{current.description}</p>
          <div className="hero-buttons">
            <Link to={`/anime/${current.id}`} className="hero-button primary">
              <Play className="button-icon" size={18} />
              View Details
            </Link>
            <Link to="/search" className="hero-button secondary">
              <Search className="button-icon" size={18} />
              Explore More
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-indicators">
        {FEATURED_ANIME.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;

