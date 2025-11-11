import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Anime } from '../types/anime';
import './AnimeCard.css';

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card">
      <div className="anime-card-image">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          loading="lazy"
        />
        {anime.score && (
          <div className="anime-card-score">
            <Star size={14} fill="currentColor" /> {anime.score.toFixed(1)}
          </div>
        )}
      </div>
      <div className="anime-card-content">
        <h3 className="anime-card-title">{anime.title}</h3>
        <div className="anime-card-meta">
          <span className="anime-card-type">{anime.type || 'Unknown'}</span>
          {anime.episodes && (
            <span className="anime-card-episodes">
              {anime.episodes} {anime.episodes === 1 ? 'Episode' : 'Episodes'}
            </span>
          )}
        </div>
        {anime.synopsis && (
          <p className="anime-card-synopsis">
            {anime.synopsis.length > 150
              ? `${anime.synopsis.substring(0, 150)}...`
              : anime.synopsis}
          </p>
        )}
      </div>
    </Link>
  );
}

export default AnimeCard;

