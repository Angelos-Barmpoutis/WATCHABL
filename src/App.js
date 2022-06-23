import Header from './components/Header';
import Movies from './components/Movies';
import Pages from './components/Pages';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

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
  const [movieInput, setMovieInput] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  
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
    })
  }, [request.page, request.searchInput, request.method, request.category])

  // Set movieInput to whatever is being typed in searchInput
  function searchInputChange(e) {
    setMovieInput(e.target.value);
  }

  // Search for a query when searchButton gets clicked
  function searchFormSubmit(e) {
    e.preventDefault();
    setRequest(prevRequest => (
      {
        ...prevRequest,
        method: 'search',
        searchInput: [true, movieInput]
      }
    ))
  }

  // Set request's category to movie
  function getMovies() {
    setRequest(prevRequest => (
      {
        ...prevRequest,
        page: 1,
        category: 'movie'
      }
    ))
  }

  // Set request's category to tv
  function getTvShows() {
    setRequest(prevRequest => (
      {
        ...prevRequest,
        page: 1,
        category: 'tv'
      }
    ))
  }

  // Go up 1 page
  function onePageUp() {
    if (request.page < request.totalPages) {
      setRequest(prevRequest => ({
        ...prevRequest,
        page: prevRequest.page + 1
      }
      ));
    }
  }

  // Go up 2 pages
  function twoPagesUp() {
    setRequest(prevRequest => ({
      ...prevRequest,
      page: prevRequest.page + 2
    }
    ));
  }

  // Go back 1 page
  function onePageBack() {
    if (request.page > 1 ) {
      setRequest(prevRequest => ({
        ...prevRequest,
        page: prevRequest.page -1
      }
      ));
    }
  }

  // // Go back 2 pages
  function twoPagesBack() {
    setRequest(prevRequest => ({
      ...prevRequest,
      page: prevRequest.page - 2
    }
    ));
  }

  return (
    <div className="container">
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
    </div>
  )
}

export default App