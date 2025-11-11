import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import PageLoader from './components/PageLoader'

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/anime/:id" element={<DetailPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
