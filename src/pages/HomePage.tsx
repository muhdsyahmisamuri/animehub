import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, Film, Clapperboard, Tv, Disc, Search } from 'lucide-react';
import { AppDispatch, RootState } from '../store/store';
import { fetchTopAnime, fetchSeasonNow } from '../store/slices/homeSlice';
import AnimeCarousel from '../components/AnimeCarousel';
import HeroSection from '../components/HeroSection';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { topAnime, seasonNow, loading } = useSelector(
    (state: RootState) => state.home
  );

  useEffect(() => {
    dispatch(fetchTopAnime());
    dispatch(fetchSeasonNow());
  }, [dispatch]);

  return (
    <div className="home-page">
      <HeroSection />
      
      <div className="home-sections">
        <section className="anime-section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp className="title-icon" size={28} />
              Popular Anime
            </h2>
            <Link to="/search" className="see-all-link">
              See All
            </Link>
          </div>
          <AnimeCarousel animes={topAnime} loading={loading.topAnime} />
        </section>

        <section className="anime-section">
          <div className="section-header">
            <h2 className="section-title">
              <Star className="title-icon" size={28} />
              This Season
            </h2>
            <Link to="/search" className="see-all-link">
              See All
            </Link>
          </div>
          <AnimeCarousel animes={seasonNow} loading={loading.seasonNow} />
        </section>

        <section className="anime-section">
          <div className="section-header">
            <h2 className="section-title">
              <Film className="title-icon" size={28} />
              Explore More
            </h2>
          </div>
          <div className="explore-grid">
            <Link to="/search?type=movie" className="explore-card">
              <Clapperboard className="explore-card-icon" size={32} />
              <h3>Movies</h3>
              <p>Anime films and specials</p>
            </Link>
            <Link to="/search?type=tv" className="explore-card">
              <Tv className="explore-card-icon" size={32} />
              <h3>TV Series</h3>
              <p>Ongoing and completed series</p>
            </Link>
            <Link to="/search?type=ova" className="explore-card">
              <Disc className="explore-card-icon" size={32} />
              <h3>OVA</h3>
              <p>Original video animations</p>
            </Link>
            <Link to="/search" className="explore-card">
              <Search className="explore-card-icon" size={32} />
              <h3>Search All</h3>
              <p>Find your favorite anime</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;

