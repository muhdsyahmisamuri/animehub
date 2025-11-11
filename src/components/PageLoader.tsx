import './PageLoader.css';

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
}

export default PageLoader;

