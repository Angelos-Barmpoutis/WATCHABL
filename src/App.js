import Header from './components/Header';
import Movies from './components/Movies';
import Pages from './components/Pages';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Movie from './components/Movie';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

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
  const [modal, setModal] = useState({
    isOpen: false,
    queryId: null,
    response: null
  })

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

  // Convert entire release date to only its year
  function getReleaseYear(releaseDate) {
    if (releaseDate) {
        const releaseYear = new Date(releaseDate).getFullYear()
        return releaseYear
    }
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
  const movies = allMovies.map((movie, index) => {
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
                getReleaseYear = {getReleaseYear}
                setModal = {setModal}
                category = {request.category}
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
        <main>
          <Movies 
          responseMovies = {allMovies}
          genres = {request.genres}
          category = {request.category}
          method = {request.method}
          searchInput = {request.searchInput[1]}
          getMovies = {getMovies}
          getTvShows = {getTvShows}
          getGenre = {getGenre}
          getReleaseYear = {getReleaseYear}
          movies = {movies}
          />
          {allMovies.length !== 0 && <Pages 
          page = {request.page}
          totalPages = {request.totalPages}
          onePageBack = {onePageBack}
          twoPagesBack = {twoPagesBack}
          onePageUp = {onePageUp}
          twoPagesUp = {twoPagesUp}
          /> }           
        </main>
        <Footer />
    </div>
  )
}

export default App