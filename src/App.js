import Header from './components/Header';
import Movies from './components/Movies';
import Pages from './components/Pages';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  // Variables & States declaration
  const [request, setRequest] = useState(
    {
    method: 'discover',
    category: 'movie',
    page: 1,
    searchInput: [false, ''],
    totalPages: 1,
    genres: []
    }
  );
  const [searchInput, setSearchInput] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [moviesOffSetTop, setMoviesOffSetTop] = useState();
  const [navOffsetHeight, setNavOffsetHeight] = useState();
  
  // App Variants
  const appVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.3
      }
    }
  }
  
  // Send request to get genres' list
  useEffect(() => {
    let requestUrl = `https://api.themoviedb.org/3/genre/${request.category}/list?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`;

    fetch(requestUrl)
    .then(response => response.json())
    .then(data => setRequest(prevRequest => (
      {
        ...prevRequest,
        genres: data.genres
      }
    )))
    .catch(error => console.log(error))
  }, [request.category])

  // Send request to get movies-tv shows
  useEffect(() => {
    let requestUrl = ''
    if (!request.searchInput[0]) {
      requestUrl = `https://api.themoviedb.org/3/${request.method}/${request.category}?sort_by=popularity.desc&api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${request.page}`
    } else {
      requestUrl = `https://api.themoviedb.org/3/${request.method}/${request.category}?sort_by=popularity.desc&api_key=6de482bc8c5768aa3648618b9c3cc98a&query=${request.searchInput[1]}&page=${request.page}`
    }

    fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      setAllMovies(data.results);
      setRequest(prevRequest => (
        {
          ...prevRequest,
          page: data.page,
          totalPages: data.total_pages
        }
      ))
      setMoviesOffSetTop(document.querySelector('#movies').offsetTop);
      setNavOffsetHeight(document.querySelector('.nav').offsetHeight);
    })
    .catch(error => console.log(error))
  }, [request.page, request.searchInput, request.method, request.category])

  // Set searchInput to whatever is being typed in searchInput
  function searchInputChange(e) {
    setSearchInput(e.target.value);
  }

  // Search for a query when searchForm gets submitted
  function searchFormSubmit(e) {
    e.preventDefault();

    if (searchInput && searchInput !== '') {
      setRequest(prevRequest => (
        {
          ...prevRequest,
          page: 1,
          method: 'search',
          searchInput: [true, searchInput]
        }
      ))
      scrollToMovies()
    }
  }

  // Set request's category to movie
  function getMovies() {
    setRequest(prevRequest => (
      {
        ...prevRequest,
        page: 1,
        category: 'movie'
      }
    ));
    scrollToMovies()
  }

  // Set request's category to tv
  function getTvShows() {
    setRequest(prevRequest => (
      {
        ...prevRequest,
        page: 1,
        category: 'tv'
      }
    ));
    scrollToMovies()
  }

  // Go up 1 page
  function onePageUp() {
    if (request.page < request.totalPages) {
      setRequest(prevRequest => ({
        ...prevRequest,
        page: prevRequest.page + 1
      }
      ));
      scrollToMovies()
    }
  }

  // Go up 2 pages
  function twoPagesUp() {
    setRequest(prevRequest => ({
      ...prevRequest,
      page: prevRequest.page + 2
    }
    ));
    scrollToMovies()
  }

  // Go back 1 page
  function onePageBack() {
    if (request.page > 1 ) {
      setRequest(prevRequest => ({
        ...prevRequest,
        page: prevRequest.page -1
      }
      ));
      scrollToMovies()
    }
  }

  // // Go back 2 pages
  function twoPagesBack() {
    setRequest(prevRequest => ({
      ...prevRequest,
      page: prevRequest.page - 2
    }
    ));
    scrollToMovies()
  }

  // Scroll to movies section
  function scrollToMovies() {
    window.scrollTo(0,  moviesOffSetTop - navOffsetHeight);
  }

  return (
    <motion.div
    className="container"
    variants = {appVariants}
    initial = 'hidden'
    animate = 'visible'
    >
        <Header 
        searchFormSubmit = {searchFormSubmit}
        searchInputChange = {searchInputChange}
        />
        <main>
          <Movies 
          responseMovies = {allMovies}
          genres = {request.genres}
          category = {request.category}
          method = {request.method}
          searchInput = {request.searchInput[1]}
          getMovies = {getMovies}
          getTvShows = {getTvShows}
          />
          <Pages 
          page = {request.page}
          totalPages = {request.totalPages}
          onePageBack = {onePageBack}
          twoPagesBack = {twoPagesBack}
          onePageUp = {onePageUp}
          twoPagesUp = {twoPagesUp}
          />
        </main>
        <Footer />
    </motion.div>
  )
}

export default App