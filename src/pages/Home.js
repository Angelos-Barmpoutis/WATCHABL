import Sneakpeak from '../components/Sneakpeak';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import { motion } from 'framer-motion';

const Home = ({openModal, heroTrending, searchInputValue, search, getMovies, getTvShows, mostPopular, setMostPopular, trending, setTrending, topRated, setTopRated, searchFormSubmit, searchInputChange}) => {
  return (
    <motion.div
    initial = {{opacity: 0}}
    animate = {{opacity: 1}}
    transition = {{duration: .8, ease: 'easeInOut'}}
    exit = {{opacity: 0, transition : {ease: 'easeInOut'}}}
    >
    <div className="categories-search-container wrapper">
      <Categories
        state = {mostPopular}
        states = {[setMostPopular, setTopRated, setTrending]}
        getMovies = {getMovies}
        getTvShows = {getTvShows}
      />
      <form className="search-form" onSubmit={searchFormSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="search-input" name="searchInput" placeholder='Search...' value={searchInputValue} autoComplete="off" onChange={searchInputChange}/>
      </form>
    </div>
      {/* <h1 className="page-title">
        Week's Top 5 Movies
      </h1>  */}
      {heroTrending && <Hero
        heroTrending = {heroTrending}
        openModal = {openModal}
      />}
      <Sneakpeak
        openModal = {openModal}
        state = {mostPopular}
        header = 'Most Popular'
        href = '/mostPopular'
      />
      <Sneakpeak
        openModal = {openModal}
        state = {trending}
        header = "Trending Today"
        href = '/trending'
      />
      <Sneakpeak
        openModal = {openModal} 
        state = {topRated}
        header = "Top Rated"
        href = '/topRated'
      />
    </motion.div>
  )
}

export default Home