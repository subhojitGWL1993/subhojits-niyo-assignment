// const bind
export const FETCH_MOVIES_BEGIN   = 'FETCH_MOVIES_BEGIN';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const FAV_MOVIE_LIST = 'FAV_MOVIE_LIST';
export const MOVIE_DETAILS_SUCCESS = 'MOVIE_DETAILS_SUCCESS';
// user url set
const OmdbUrl = `http://www.omdbapi.com/?apikey=fc32c816`;
const ALL = 'All';

export const fetchMoviesBegin = () => ({
  type: FETCH_MOVIES_BEGIN
});

export const fetchMoviesSuccess = (response, page, scrolled) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: { response, page, scrolled }
});

export const movieDetailsSuccess = response => ({
  type: MOVIE_DETAILS_SUCCESS,
  payload: {...response}
});

export const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: { error }
});

export const favMovieList = list => ({
  type: FAV_MOVIE_LIST,
  payload: { list }
});

// fetch action
export function fetchMovies(page, searchText, type, scrolled, totalResults) {
  let fetchUrl = `${OmdbUrl}&s=${searchText}&page=${page}&totalResults=${totalResults}`;
  if(type !== ALL)
    fetchUrl = `${OmdbUrl}&s=${searchText}&type=${type}&page=${page}&totalResults=${totalResults}`;
  return dispatch => {
    dispatch(fetchMoviesBegin());
    return fetch(fetchUrl)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        if(json.Response)
          dispatch(fetchMoviesSuccess(json, page, scrolled));
        return json;
      })
      .catch(error => {
        dispatch(fetchMoviesFailure(type));
      });
  };
}

// handle favourites
export function handleFavourites(movie) {
  let getList = localStorage.getItem('movieList');
  let getIndex = null;
  if(getList) {
    getList = JSON.parse(getList);
    if(getList.length > 0 && getList !== null) {
      getList.map((list, index) => {
        if(list.imdbID === movie.imdbID) {
          getIndex = index;
        }
      })
      if(getIndex !== null)
        getList.splice(getIndex, 1);
      else
        getList.push(movie);
    }
    else {
      getList = [];
      getList.push(movie)
    }
  }
  else {
    getList = [];
    getList.push(movie)
  }
  let arrToString = JSON.stringify(getList);
  localStorage.setItem("movieList", arrToString);
  return dispatch => {
    dispatch(favMovieList(getList));
  };
}

// get movie details
export function getMovieDetails(movieId) {
  return dispatch => {
    dispatch(fetchMoviesBegin());
    return fetch(`${OmdbUrl}&i=${movieId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        if(json.Response)
          dispatch(movieDetailsSuccess(json));
        return json;
      })
      .catch(error => {
        dispatch(fetchMoviesFailure(error));
      });
  };
}

// HTTP errors handling since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}