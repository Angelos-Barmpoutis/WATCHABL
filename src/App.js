import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Movie from './components/Movie';
import Widget from './components/Widget';
import Home from './pages/Home';
import MostPopular from './pages/MostPopular';
import Trending from './pages/Trending';
import TopRated from './pages/TopRated';
import NowPlaying from './pages/NowPlaying'
import AiringToday from './pages/AiringToday';
import Search from './pages/Search';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const App = () => {

  // Variables & States declaration
  const NOW_PLAYING_URL = 'http://localhost:3000/nowPlaying';
  const AIRING_TODAY_URL = 'http://localhost:3000/airingToday';

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [genres, setGenres] = useState({
    movie : [],
    tv : []
  })

  const [modal, setModal] = useState({
    isOpen: false,
    queryId: null,
    results: null
  })

  const [heroTrending, setHeroTrending] = useState(
    {
      category: 'movie',
      page: 1,
      results: []
    }
  );

  const [searchInputValue, setSearchInputValue] = useState('');

  const [search, setSearch] = useState(
    {
      title: 'Search',
      query: '',
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  );

  const [mostPopular, setMostPopular] = useState(
    {
      title: 'Most Popular',
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  );

  const [trending, setTrending] = useState(
    { 
      title: 'Trending Today',
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  );

  const [topRated, setTopRated] = useState(
    {
      title: 'Top Rated',
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  );

  const [airingToday, setAiringToday] = useState(
    {
      title: 'Airing Today',
      category: 'tv',
      page: 1,
      totalPages: 1,
      results: []
    }
  );
  
  const [nowPlaying, setNowPlaying] = useState(
    {
      title: 'Now Playing',
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  );

  // Check if modal is open. If so, set body's overflow --> hidden
  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
 }, [modal.isOpen]);

  // Fetch TV genres' list
  useEffect(() => {
      let requestUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`;
  
      fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => setGenres(prevGenres => (
        {
          ...prevGenres,
          tv: responseData.genres
        }
      )))
      .catch(error => console.log(error))
  }, [])

  // Fetch Movie genres' list
  useEffect(() => {
      let requestUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`;
  
      fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => setGenres(prevGenres => (
        {
          ...prevGenres,
          movie: responseData.genres
        }
      )))
      .catch(error => console.log(error))
  }, [])

  // Fetch Hero Trending
  useEffect(() => {
    const requestUrl = `https://api.themoviedb.org/3/trending/${heroTrending.category}/week?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=1`;

      fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        setHeroTrending(previousState => (
          {
            ...previousState,
            results: responseData.results,
            page: responseData.page
          }
        ))
      })
}, [heroTrending.category])

  // Fetch Most Popular
  useEffect(() => {
    const requestUrl = `https://api.themoviedb.org/3/discover/${mostPopular.category}?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${mostPopular.page}`

      fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        setMostPopular(previousState => (
          {
            ...previousState,
            results: responseData.results,
            totalPages: responseData.total_pages,
            page: responseData.page
          }
        ))
      })
      .catch(err => console.log(err))
  }, [mostPopular.category, mostPopular.page])

  // Fetch Trending
  useEffect(() => {
      const requestUrl = `https://api.themoviedb.org/3/trending/${trending.category}/day?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${trending.page}`;
  
        fetch(requestUrl)
        .then(response => response.json())
        .then(responseData => {
          setTrending(previousState => (
            {
              ...previousState,
              results: responseData.results,
              totalPages: responseData.total_pages,
              page: responseData.page
            }
          ))
        })
  }, [trending.category, trending.page])

  // Fetch Top Rated
  useEffect(() => {
      const requestUrl = `https://api.themoviedb.org/3/${topRated.category}/top_rated?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${topRated.page}`;
  
        fetch(requestUrl)
        .then(response => response.json())
        .then(responseData => {
          setTopRated(previousState => (
            {
              ...previousState,
              results: responseData.results,
              totalPages: responseData.total_pages,
              page: responseData.page
            }
          ))
        })
  }, [topRated.category, topRated.page])

  // Fetch Airing Today
  useEffect(() => {
    const requestUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${airingToday.page}`;

      fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        setAiringToday(previousState => (
          {
            ...previousState,
            results: responseData.results,
            totalPages: responseData.total_pages
          }
        ))
      })
  }, [airingToday.page])

  // Fetch Now Playing
  useEffect(() => {
    const requestUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${nowPlaying.page}`;

      fetch(requestUrl)
      .then(response => response.json())
      .then(responseData => {
        setNowPlaying(previousState => (
          {
            ...previousState,
            results: responseData.results,
            totalPages: responseData.total_pages
          }
        ))
      })
  }, [nowPlaying.page])

  // Fetch Search Results
  useEffect(() => {

    if(search.query !== '') {
      fetch(`https://api.themoviedb.org/3/search/${search.category}?api_key=6de482bc8c5768aa3648618b9c3cc98a&query=${search.query}&page=${search.page}`)
      .then(response => response.json())
      .then(responseData => {
        setSearch(prevSearch => (
          {
            ...prevSearch,
            results: responseData.results,
            totalPages: responseData.total_pages
          }
        ))
      })
      
    }
  }, [search.category, search.page, search.query])

  // Set search to whatever is being typed in searchInput
  function searchInputChange(e) {
    setSearchInputValue(e.target.value);
  }

  // Search for a query when searchForm gets submitted
  function searchFormSubmit(e) {
    e.preventDefault();

    if (searchInputValue && searchInputValue !== ' ') {
      setSearch(prevSearch => (
        {
          ...prevSearch,
          query: searchInputValue
        }
      ));

      navigate('./search')

      setSearchInputValue('');
    }
  }

  // Set request's category to movie
  function getMovies(setState) {
    setState(prevRequest => (
      {
        ...prevRequest,
        page: 1,
        category: 'movie'
      }
    ));
  }

  // Set request's category to tv
  function getTvShows(setState) {
    setState(prevRequest => (
      {
        ...prevRequest,
        page: 1,
        category: 'tv'
      }
    ));
  }

  // Convert Movie genre IDs from numbers to words
  function getMovieGenre(genreIds) {
    const genreMap = genreIds.map(genreId => {
      for (let i = 0; i < genres.movie.length; i++) {
        if (genres.movie[i].id === genreId) {
          return genres.movie[i].name;
        }
      }
      return null;
      })
      return genreMap.toString().replaceAll(',', ', ');
  }

  // Convert TV genre IDs from numbers to words
  function getTvGenre(genreIds) {
      const genreMap = genreIds.map(genreId => {
        for (let i = 0; i < genres.tv.length; i++) {
          if (genres.tv[i].id === genreId) {
            return genres.tv[i].name;
          }
        }
        return null;
        })
        return genreMap.toString().replaceAll(',', ', ');
  }

  // Convert Release Date to Release Year
  const getReleaseYear = (date) => {
    const year = new Date(date);

    if (isNaN(year.getFullYear())) {
      return null
    } else {
      return `(${year.getFullYear()})`;
    }
  }

  // Go up 1 page
  function onePageUp(state, setState) {
    if (state.page < state.totalPages) {
      setState( (prevState) => ({
        ...prevState,
        page: prevState.page + 1
      }
      ));
      scrollToTop()
    }
  }

  // Go up 2 pages
  function twoPagesUp(setState) {
    setState(prevState => ({
      ...prevState,
      page: prevState.page + 2
    }
    ));
    scrollToTop()
  }

  // Go back 1 page
  function onePageBack(state, setState) {
    if (state.page > 1 ) {
      setState(prevState => ({
        ...prevState,
        page: prevState.page -1
      }
      ));
      scrollToTop()
    }
  }

  // // Go back 2 pages
  function twoPagesBack(setState) {
    setState(prevState => ({
      ...prevState,
      page: prevState.page - 2
    }
    ));
    scrollToTop()
  }

  // Scroll to top
  function scrollToTop() {
    window.scrollTo(0,  0);
  }

  function openModal(id, category) {
    fetch(`https://api.themoviedb.org/3/${category}/${id}?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`)
    .then(response => response.json())
    .then(responseData => {
      setModal (prevModal => (
        {
          ...prevModal,
          isOpen: true,
          queryId: id,
          results: responseData
        }
      ))
    })
  }

  // Close modal and reset its state
  function closeModal() {
    setModal(prevModal => ({
      ...prevModal,
      isOpen: false,
      queryId: null,
      results: null
    }));
  }
  
  // Create Movie component
  const createMovieItem = (state) => {
    const movieItem = state.results.map((item, index) => {

      const {title, overview, id, poster_path, vote_average, genre_ids, release_date, name, first_air_date} = item;
      return (
          <Movie
            state = {state}
            key = {id}
            id = {id}
            index = {index}
            title = {title ? title : name}
            overview = {overview}
            image = {poster_path}
            rating = {vote_average}
            genre = {genre_ids}
            releaseDate = {release_date ? getReleaseYear(release_date) : getReleaseYear(first_air_date)}
            getGenre = {state.category === 'movie' ? getMovieGenre : getTvGenre}
            setModal = {setModal}
            openModal = {openModal}
          />
      )
    })
    
    return movieItem;
  }

  return (
    <motion.div
      className="container"
      initial = {{opacity: 0}}
      animate = {{opacity: 1}}
      transition= {{ type: 'spring'}}
    >
        <Header 
        searchFormSubmit = {searchFormSubmit}
        searchInputChange = {searchInputChange}
        />
        <AnimatePresence>
          {modal.isOpen && <Modal
              closeModal = {closeModal}
              modal = {modal}
          />}
        </AnimatePresence>
        <main>
          <AnimatePresence>
            <Routes location={location} key={location.key}>
              <Route exact path='/' element={
                  <Home
                    searchInputValue = {searchInputValue}
                    search = {search}
                    getMovies={getMovies}
                    getTvShows={getTvShows}
                    mostPopular={mostPopular}
                    setMostPopular={setMostPopular}
                    airingToday={airingToday}
                    setAiringToday={setAiringToday}
                    trending={trending}
                    setTrending={setTrending}
                    nowPlaying={nowPlaying}
                    setNowPlaying={setNowPlaying}
                    topRated={topRated}
                    setTopRated={setTopRated}
                    heroTrending = {heroTrending}
                    setHeroTrending = {setHeroTrending}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    openModal = {openModal}
                  />
                }>
              </Route>
              <Route path='/mostPopular' element={
                  <MostPopular
                    searchInputValue = {searchInputValue}
                    search = {search}
                    movies = {createMovieItem(mostPopular)}
                    state = {mostPopular}
                    states = {[setMostPopular]}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    getMovies = {getMovies}
                    getTvShows = {getTvShows}
                    onePageBack = {onePageBack}
                    twoPagesBack = {twoPagesBack}
                    onePageUp = {onePageUp}
                    twoPagesUp = {twoPagesUp}
                  />
                }>
              </Route>
              <Route path='/trending' element={
                  <Trending
                    searchInputValue = {searchInputValue}
                    search = {search}
                    movies = {createMovieItem(trending)}
                    state = {trending}
                    states = {[setTrending]}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    getMovies = {getMovies}
                    getTvShows = {getTvShows}
                    onePageBack = {onePageBack}
                    twoPagesBack = {twoPagesBack}
                    onePageUp = {onePageUp}
                    twoPagesUp = {twoPagesUp}
                  />
                }>
              </Route>
              <Route path='/topRated' element={
                  <TopRated
                    searchInputValue = {searchInputValue}
                    search = {search}
                    movies = {createMovieItem(topRated)}
                    state = {topRated}
                    states = {[setTopRated]}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    getMovies = {getMovies}
                    getTvShows = {getTvShows}
                    onePageBack = {onePageBack}
                    twoPagesBack = {twoPagesBack}
                    onePageUp = {onePageUp}
                    twoPagesUp = {twoPagesUp}
                  />
                }>
              </Route>
              <Route path='/nowPlaying' element={
                  <NowPlaying
                    searchInputValue = {searchInputValue}
                    search = {search}
                    movies = {createMovieItem(nowPlaying)}
                    state = {nowPlaying}
                    states = {[setNowPlaying]}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    getMovies = {getMovies}
                    getTvShows = {getTvShows}
                    onePageBack = {onePageBack}
                    twoPagesBack = {twoPagesBack}
                    onePageUp = {onePageUp}
                    twoPagesUp = {twoPagesUp}
                  />
                }>
              </Route>
              <Route path='/airingToday' element={
                  <AiringToday
                    searchInputValue = {searchInputValue}
                    search = {search}
                    movies = {createMovieItem(airingToday)}
                    state = {airingToday}
                    states = {[setAiringToday]}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    getMovies = {getMovies}
                    getTvShows = {getTvShows}
                    onePageBack = {onePageBack}
                    twoPagesBack = {twoPagesBack}
                    onePageUp = {onePageUp}
                    twoPagesUp = {twoPagesUp}
                  />
                }>
              </Route>
              <Route path='/search' element={
                  <Search
                    searchInputValue = {searchInputValue}
                    search = {search}
                    movies = {createMovieItem(search)}
                    state = {search}
                    states = {[setSearch]}
                    searchFormSubmit = {searchFormSubmit}
                    searchInputChange = {searchInputChange}
                    getMovies = {getMovies}
                    getTvShows = {getTvShows}
                    onePageBack = {onePageBack}
                    twoPagesBack = {twoPagesBack}
                    onePageUp = {onePageUp}
                    twoPagesUp = {twoPagesUp}
                  />
                }></Route>
            </Routes>
          </AnimatePresence>
        </main>
        <aside>
          <div className="wrapper">
            {window.location.href !== AIRING_TODAY_URL && <Widget
              openModal = {openModal}
              state = {airingToday}
              genres = {genres}
              getGenre = {getTvGenre}
              href = '/airingToday'
            />}

            {window.location.href !== NOW_PLAYING_URL && <Widget
              openModal = {openModal}
              state = {nowPlaying}
              genres = {genres}
              getGenre = {getMovieGenre}
              href = '/nowPlaying'
            />}

          </div>
        </aside>
        <Footer />
    </motion.div>
  )
}

export default App