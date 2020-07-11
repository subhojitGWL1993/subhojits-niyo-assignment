// const bind
export const FETCH_MOVIES_BEGIN   = 'FETCH_MOVIES_BEGIN';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const FAV_MOVIE_LIST = 'FAV_MOVIE_LIST';
export const MOVIE_DETAILS_SUCCESS = 'MOVIE_DETAILS_SUCCESS';
// export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
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

/*export const updateUsersSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user }
});*/

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
        console.log("json", json);
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
export function handleFavourites(movieKey) {
  let getList = localStorage.getItem('movieList');
  let getIndex = null;
  // let movieKey = movie.imdbID + '' + ind;
  console.log("fav handler", movieKey);
  if(getList) {
    getList = JSON.parse(getList);
    if(getList.length > 0 && getList !== null) {
      getList.map((list, index) => {
        if(list === movieKey) {
          getIndex = index;
        }
      })
      if(getIndex !== null)
        getList.splice(getIndex, 1);
      else
        getList.push(movieKey);
    }
    else {
      getList = [];
      getList.push(movieKey)
    }
  }
  else {
    getList = [];
    getList.push(movieKey)
  }
  let arrToString = JSON.stringify(getList);
  localStorage.setItem("movieList", arrToString);
  return dispatch => {
    dispatch(favMovieList(getList));
  };
}

// handle movie details
export function getMovieDetails(movieId) {
  console.log("movie details", movieId);
  return dispatch => {
    dispatch(fetchMoviesBegin());
    return fetch(`${OmdbUrl}&i=${movieId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if(json.Response)
          dispatch(movieDetailsSuccess(json));
        return json;
      })
      .catch(error => {
        dispatch(fetchMoviesFailure(error));
      });
  };
}

// put request for update
/*export function updateUsers(dataAction) {
  let id = dataAction.id;
  return dispatch => {
    dispatch(fetchUsersBegin());
    return fetch(`${userUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataAction),
    })
    .then(res => res.json())
    .then(json => {
      dispatch(updateUsersSuccess(json));
    })
    .catch(error => {
      dispatch(fetchUsersFailure(error))
    });
  }
}*/

// HTTP errors handling since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}