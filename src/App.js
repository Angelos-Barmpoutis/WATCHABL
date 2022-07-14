import Header from './components/Header';
import Movies from './components/Movies';
import Pages from './components/Pages';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Movie from './components/Movie';
import Sneakpeak from './components/Sneakpeak';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  // Variables & States declaration
  const [searchInput, setSearchInput] = useState('');
  const [moviesOffSetTop, setMoviesOffSetTop] = useState();
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
    totalPages: 1,
    genres: []
    }
  );
  const [response, setResponse] = useState(
    {
      results: [],
      totalPages: 1,
      genres: []
    }
  )

  const [mostPopular, setMostPopular] = useState(
    {
      method: 'discover',
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: [],
      genres: []
    }
  )

  const [trending, setTrending] = useState(
    {
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: [],
      genres: []
    }
  )

  const [topRated, setTopRated] = useState(
    {
      category: 'movie',
      page: 1,
      totalPages: 1,
      results: [],
      genres: []
    }
  )

    // Fetch dynamic data based on the request
    async function fetchData(url) {
      const response = await fetch(url);
      const responseData = await response.json()
  
      return await responseData
    }
  
    // Fetch & store to state
    async function fetchState(url, state, setState) {
    fetchData(url, state)
      .then(responseData => {
        setState(previousState => (
          {
            ...previousState,
            results: responseData.results,
            totalPages: responseData.total_pages
          }
        ))
      })
    }
  
    // Fetch Most Popular
    useEffect(() => {
      fetchState(`https://api.themoviedb.org/3/${mostPopular.method}/${mostPopular.category}?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${mostPopular.page}`, mostPopular, setMostPopular)
    }, [mostPopular.page, mostPopular.searchInput, mostPopular.method, mostPopular.category])

    // Fetch Trending
    useEffect(() => {
      fetchState(`https://api.themoviedb.org/3/trending/${trending.category}/week?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${trending.page}`, trending, setTrending)
    }, [trending.page, trending.searchInput, trending.method, trending.category])

    // Fetch Trending
    useEffect(() => {
      fetchState(`https://api.themoviedb.org/3/${topRated.category}/top_rated?api_key=6de482bc8c5768aa3648618b9c3cc98a&page=${topRated.page}`, topRated, setTopRated)
    }, [topRated.page, topRated.searchInput, topRated.method, topRated.category])

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
      setResponse(prevResponse => (
        {
          ...prevResponse,
          results: data.results
        }
      ));
      setRequest(prevRequest => (
        {
          ...prevRequest,
          page: data.page,
          totalPages: data.total_pages
        }
      ))
      setMoviesOffSetTop(document.querySelector('#movies').offsetTop);
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
      document.getElementById('searchInput').value = '';
      scrollToMovies()
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
    // scrollToMovies()
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
    // scrollToMovies()
  }

  // Convert genre IDs from numbers to words
  function getGenre(genreIds) {
    const genreMap = genreIds.map(genreId => {
      for (let i = 0; i < request.genres.length; i++) {
        if (request.genres[i].id === genreId) {
          return request.genres[i].name;
        }
      }
      return null;
      })
      return genreMap.toString().replaceAll(',', ', ');
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
    window.scrollTo(0,  moviesOffSetTop);
  }

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
  const movies = response.results.map((movie, index) => {
    const {title, overview, id, poster_path, vote_average, genre_ids, release_date, name, first_air_date} = movie;
    if (poster_path !== null && overview) {
        return (
            <Movie
                key = {id}
                id = {id}
                index = {index}
                movieTitle = {title}
                tvTitle = {name}
                overview = {overview}
                image = {poster_path}
                rating = {vote_average}
                genre = {genre_ids}
                movieReleaseDate = {release_date}
                tvReleaseDate = {first_air_date}
                getGenre = {getGenre}
                setModal = {setModal}
                category = {request.category}
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
        openModal = {openModal}
        />
        <AnimatePresence>
          {modal.isOpen && <Modal
              closeModal = {closeModal}
              modal = {modal}
              category = {request.category}
              setModal = {setModal}
          />}
        </AnimatePresence>
        <main>
          <Sneakpeak
            getMovies = {getMovies}
            getTvShows = {getTvShows}
            state = {mostPopular}
            setState = {setMostPopular}
            header = 'Most Popular'
            results = {mostPopular.results}
          />
          <Sneakpeak
            getMovies = {getMovies}
            getTvShows = {getTvShows}
            state = {trending}
            setState = {setTrending}
            header = "Week's Trending"
            results = {trending.results}
          />
          <Sneakpeak
            getMovies = {getMovies}
            getTvShows = {getTvShows}
            state = {topRated}
            setState = {setTopRated}
            header = "Top Rated"
            results = {topRated.results}
          />
          {/* <Movies 
          responseMovies = {response.results}
          genres = {request.genres}
          category = {request.category}
          method = {request.method}
          searchInput = {request.searchInput[1]}
          getMovies = {getMovies}
          getTvShows = {getTvShows}
          getGenre = {getGenre}
          movies = {movies}
          />
          {response.results.length !== 0 && <Pages 
          page = {request.page}
          totalPages = {request.totalPages}
          onePageBack = {onePageBack}
          twoPagesBack = {twoPagesBack}
          onePageUp = {onePageUp}
          twoPagesUp = {twoPagesUp}
          /> }            */}
        </main>
        <Footer />
    </div>
  )
}

export default App