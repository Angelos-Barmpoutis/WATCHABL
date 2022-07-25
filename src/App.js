import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Movie from './components/Movie';
import Home from './components/Home';
import Widget from './components/Widget';
import MostPopular from './components/MostPopular';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  // Variables & States declaration
  const [searchInput, setSearchInput] = useState('');
  // const [moviesOffSetTop, setMoviesOffSetTop] = useState();
  const [genres, setGenres] = useState({
    movie : [],
    tv : []
  })
  const [modal, setModal] = useState({
    isOpen: false,
    queryId: null,
    response: null
  })
  const [request, setRequest] = useState(
    {
    method: 'discover',
    category: 'movie',
    page: 1,
    searchInput: [false, ''],
    totalPages: 1
    }
  );

  const [mostPopular, setMostPopular] = useState(
    {
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  )

  const [trending, setTrending] = useState(
    {
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  )

  const [topRated, setTopRated] = useState(
    {
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: []
    }
  )

  const [airingToday, setAiringToday] = useState(
    {
      page: 1,
      totalPages: 1,
      results: []
    }
  )
  
  const [nowPlaying, setNowPlaying] = useState(
    {
      page: 1,
      totalPages: 1,
      results: []
    }
  )

  // Send request to get TV genres' list
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

  // Send request to get Movie genres' list
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
            totalPages: responseData.total_pages
          }
        ))
      })
  }, [mostPopular.category, mostPopular.page])

  // Fetch Trending
  useEffect(() => {
      const requestUrl = `https://api.themoviedb.org/3/trending/${trending.category}/week?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${trending.page}`;
  
        fetch(requestUrl)
        .then(response => response.json())
        .then(responseData => {
          setTrending(previousState => (
            {
              ...previousState,
              results: responseData.results,
              totalPages: responseData.total_pages
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
              totalPages: responseData.total_pages
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

  // // Send request to get movies-tv shows
  // useEffect(() => {
  //   let requestUrl = ''
  //   if (!request.searchInput[0]) {
  //     requestUrl = `https://api.themoviedb.org/3/${request.method}/${request.category}?sort_by=popularity.desc&api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${request.page}`
  //   } else {
  //     requestUrl = `https://api.themoviedb.org/3/${request.method}/${request.category}?sort_by=popularity.desc&api_key=6de482bc8c5768aa3648618b9c3cc98a&query=${request.searchInput[1]}&page=${request.page}`
  //   }

  //   fetch(requestUrl)
  //   .then(response => response.json())
  //   .then(data => {
  //     setResponse(prevResponse => (
  //       {
  //         ...prevResponse,
  //         results: data.results
  //       }
  //     ));
  //     setRequest(prevRequest => (
  //       {
  //         ...prevRequest,
  //         page: data.page,
  //         totalPages: data.total_pages
  //       }
  //     ))
  //     setMoviesOffSetTop(document.querySelector('#movies').offsetTop);
  //   })
  //   .catch(error => console.log(error))
  // }, [request.page, request.searchInput, request.method, request.category])

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
      document.getElementById('searchInput').value = '';
      // scrollToMovies()
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
    return `(${year.getFullYear()})`;
  }

  // Go up 1 page
  function onePageUp() {
    if (request.page < request.totalPages) {
      setRequest(prevRequest => ({
        ...prevRequest,
        page: prevRequest.page + 1
      }
      ));
      // scrollToMovies()
    }
  }

  // Go up 2 pages
  function twoPagesUp() {
    setRequest(prevRequest => ({
      ...prevRequest,
      page: prevRequest.page + 2
    }
    ));
    // scrollToMovies()
  }

  // Go back 1 page
  function onePageBack() {
    if (request.page > 1 ) {
      setRequest(prevRequest => ({
        ...prevRequest,
        page: prevRequest.page -1
      }
      ));
      // scrollToMovies()
    }
  }

  // // Go back 2 pages
  function twoPagesBack() {
    setRequest(prevRequest => ({
      ...prevRequest,
      page: prevRequest.page - 2
    }
    ));
    // scrollToMovies()
  }

  // Scroll to movies section
  // function scrollToMovies() {
  //   window.scrollTo(0,  moviesOffSetTop);
  // }

  function openModal(category, id, title) {
    fetch(`https://api.themoviedb.org/3/${category}/${id}?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`)
    .then(response => response.json())
    .then(responseData => {
      // Check if it's a movie or tv show
      // IF its a movie =>
      if (responseData.title === title) {
        setModal(prevModal => ({
          ...prevModal,
          isOpen: true,
          queryId: id,
          response: responseData
        }))
      } else {
        // If it's a tv show =>
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=6de482bc8c5768aa3648618b9c3cc98a&language=en-US`)
        .then(response => response.json())
        .then(responseData => {
          setModal(prevModal => ({
            ...prevModal,
            isOpen: true,
            queryId: id,
            response: responseData
          }))
        })
      }

    })
}

  // Close modal and reset its state
  function closeModal() {
    setModal(prevModal => ({
      ...prevModal,
      isOpen: false,
      queryId: null,
      response: null
    }));
  }
  
  // Create Movie component
  const movies = mostPopular.results.map((movie, index) => {
    const {title, overview, id, poster_path, vote_average, genre_ids, release_date, name, first_air_date} = movie;
    if (poster_path !== null && overview) {
        return (
            <Movie
                key = {id}
                id = {id}
                index = {index}
                title = {title ? title : name}
                overview = {overview}
                image = {poster_path}
                rating = {vote_average}
                genre = {genre_ids}
                releaseDate = {release_date ? getReleaseYear(release_date) : getReleaseYear(first_air_date)}
                getGenre = {mostPopular.category === 'movie' ? getMovieGenre : getTvGenre}
                setModal = {setModal}
                openModal = {openModal}
             />
        );
    }
    return null;
  })

  return (
    <div className="container">
        <Header 
        searchFormSubmit = {searchFormSubmit}
        searchInputChange = {searchInputChange}
        />
        <AnimatePresence>
          {modal.isOpen && <Modal
              closeModal = {closeModal}
              modal = {modal}
              category = {request.category}
              setModal = {setModal}
          />}
        </AnimatePresence>
        <div className="main-aside">
        <main>
        <Routes>
          <Route exact path='/' element={
              <Home
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
                request = {request}
                setRequest = {setRequest}
                searchFormSubmit = {searchFormSubmit}
                searchInputChange = {searchInputChange}
              />
            }>

          </Route>
          <Route path='/mostPopular' element={
              <MostPopular
                movies = {movies}
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
                title = 'the Most Popular'
              />
            }>
          </Route>
        </Routes>
        </main>
          <aside>
            <div className="wrapper">
              <Widget
              results = {nowPlaying.results}
              header = 'Now Playing'
              genres = {genres}
              getGenre = {getMovieGenre}
            />
            <Widget
              results = {airingToday.results}
              header = 'Airing Today'
              genres = {genres}
              getGenre = {getTvGenre}
            />
            </div>
          </aside>
        </div>
        <Footer />
    </div>
  )
}

export default App