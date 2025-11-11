import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, TrendingUp, Heart, Users, Flame, ExternalLink } from 'lucide-react';
import { AppDispatch, RootState } from '../store/store';
import { fetchAnimeDetail } from '../store/slices/detailSlice';
import ErrorMessage from '../components/ErrorMessage';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { anime, loading, error } = useSelector((state: RootState) => state.detail);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(Number(id)));
    }
  }, [id, dispatch]);

  const handleRetry = () => {
    if (id) {
      dispatch(fetchAnimeDetail(Number(id)));
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-skeleton">
          <div className="detail-skeleton-image" />
          <div className="detail-skeleton-content">
            <div className="detail-skeleton-title" />
            <div className="detail-skeleton-text" />
            <div className="detail-skeleton-text" />
            <div className="detail-skeleton-text" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="detail-page">
        <ErrorMessage message="Anime not found" />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <div className="detail-hero-background">
          <img src={anime.images.jpg.large_image_url} alt="" />
        </div>
        <div className="detail-hero-content">
          <div className="detail-poster">
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            {anime.score && (
              <div className="detail-score">
                <div className="score-label">Score</div>
                <div className="score-value">
                  <Star size={18} fill="currentColor" /> {anime.score.toFixed(1)}
                </div>
                <div className="score-votes">
                  {anime.scored_by?.toLocaleString()} votes
                </div>
              </div>
            )}
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 className="detail-title-alt">{anime.title_english}</h2>
            )}
            {anime.title_japanese && (
              <p className="detail-title-japanese">{anime.title_japanese}</p>
            )}

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Type</span>
                <span className="meta-value">{anime.type || 'Unknown'}</span>
              </div>
              {anime.episodes && (
                <div className="meta-item">
                  <span className="meta-label">Episodes</span>
                  <span className="meta-value">{anime.episodes}</span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value">{anime.status}</span>
              </div>
              {anime.season && anime.year && (
                <div className="meta-item">
                  <span className="meta-label">Premiered</span>
                  <span className="meta-value">
                    {anime.season} {anime.year}
                  </span>
                </div>
              )}
            </div>

            {anime.genres.length > 0 && (
              <div className="detail-genres">
                {anime.genres.map((genre) => (
                  <span key={genre.mal_id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {anime.studios.length > 0 && (
              <div className="detail-section">
                <h3 className="section-title">Studios</h3>
                <div className="studios-list">
                  {anime.studios.map((studio) => (
                    <span key={studio.mal_id} className="studio-name">
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="detail-body">
        {anime.synopsis && (
          <div className="detail-section">
            <h3 className="section-title">Synopsis</h3>
            <p className="detail-synopsis">{anime.synopsis}</p>
          </div>
        )}

        {anime.background && (
          <div className="detail-section">
            <h3 className="section-title">Background</h3>
            <p className="detail-background">{anime.background}</p>
          </div>
        )}

        <div className="detail-stats">
          <div className="stat-card">
            <TrendingUp className="stat-icon" size={32} strokeWidth={1.5} />
            <div className="stat-label">Rank</div>
            <div className="stat-value">#{anime.rank || 'N/A'}</div>
          </div>
          <div className="stat-card">
            <Heart className="stat-icon" size={32} strokeWidth={1.5} />
            <div className="stat-label">Favorites</div>
            <div className="stat-value">{anime.favorites.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" size={32} strokeWidth={1.5} />
            <div className="stat-label">Members</div>
            <div className="stat-value">{anime.members.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <Flame className="stat-icon" size={32} strokeWidth={1.5} />
            <div className="stat-label">Popularity</div>
            <div className="stat-value">#{anime.popularity}</div>
          </div>
        </div>

        <div className="detail-links">
          <a
            href={anime.url}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            View on MyAnimeList
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;

