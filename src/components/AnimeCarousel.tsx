import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Anime } from '../types/anime';
import './AnimeCarousel.css';

interface AnimeCarouselProps {
  animes: Anime[];
  loading: boolean;
}

function AnimeCarousel({ animes, loading }: AnimeCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="carousel-container">
        <div className="carousel-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="carousel-card skeleton">
              <div className="carousel-card-image-skeleton" />
              <div className="carousel-card-overlay">
                <div className="skeleton-text" />
                <div className="skeleton-text short" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <button
        className="carousel-nav carousel-nav-left"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      
      <div className="carousel-track" ref={carouselRef}>
        {animes.map((anime) => (
          <Link
            key={anime.mal_id}
            to={`/anime/${anime.mal_id}`}
            className="carousel-card"
          >
            <div className="carousel-card-image">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                loading="lazy"
              />
            </div>
            <div className="carousel-card-overlay">
              <div className="carousel-card-content">
                <h3 className="carousel-card-title">{anime.title}</h3>
                <div className="carousel-card-meta">
                  {anime.score && (
                    <span className="carousel-card-score">
                      <Star size={14} fill="currentColor" /> {anime.score.toFixed(1)}
                    </span>
                  )}
                  <span className="carousel-card-type">{anime.type}</span>
                </div>
                {anime.genres && anime.genres.length > 0 && (
                  <div className="carousel-card-genres">
                    {anime.genres.slice(0, 3).map((genre) => (
                      <span key={genre.mal_id} className="genre-badge">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        className="carousel-nav carousel-nav-right"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

export default AnimeCarousel;

