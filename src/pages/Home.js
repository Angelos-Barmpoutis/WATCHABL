import Sneakpeak from '../components/Sneakpeak';
import Hero from '../components/Hero';
import Categories from '../components/Categories';

const Home = ({getMovies, getTvShows, mostPopular, setMostPopular, airingToday, setAiringToday, trending, setTrending, nowPlaying, setNowPlaying, topRated, setTopRated, searchFormSubmit, searchInputChange}) => {
  return (
    <>
    <div className="categories-search-container wrapper">
      <Categories
        state = {mostPopular}
        states = {[setMostPopular, setTopRated, setTrending]}
        getMovies = {getMovies}
        getTvShows = {getTvShows}
      />
      <form className="search-form" onSubmit={searchFormSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="search-input" name="searchInput" placeholder='Search...' autoComplete="off" onChange={searchInputChange}/>
      </form>
    </div>  
      <Hero/>
      <Sneakpeak
          getMovies = {getMovies}
            getTvShows = {getTvShows}
            state = {mostPopular}
            setState = {setMostPopular}
            header = 'Most Popular'
            results = {mostPopular.results}
            href = '/mostPopular'
        />
        <Sneakpeak
          getMovies = {getMovies}
            getTvShows = {getTvShows}
            state = {trending}
            setState = {setTrending}
            header = "Trending Today"
            results = {trending.results}
            href = '/trending'
        />
        <Sneakpeak
          getMovies = {getMovies}
            getTvShows = {getTvShows}
            state = {topRated}
            setState = {setTopRated}
            header = "Top Rated"
            results = {topRated.results}
            href = '/topRated'
        />
    </>
  )
}

export default Home