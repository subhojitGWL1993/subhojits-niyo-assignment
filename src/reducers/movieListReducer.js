import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FAV_MOVIE_LIST,
  MOVIE_DETAILS_SUCCESS
} from '../actions/movieActions';

const initialState = {
  list: [],
  favList: [],
  loading: false,
  error: null,
  page: 1,
  totalResults: 0,
  movieData: {}
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_MOVIES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something later on as usecase
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
        movieData: {}
      };

    case FETCH_MOVIES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the movie list with the ones from the server
      let moviesArr = [...action.payload.response.Search];
      // eslint-disable-next-line
      let favList = [...state.favList];
      if(action.payload.scrolled)
        moviesArr = state.list.concat(action.payload.response.Search);
      moviesArr = moviesArr.filter(function(movie) {
         return movie !== undefined;
      });
      // localStorage check // set favourites
      let getList = localStorage.getItem('movieList');
      if(getList){
        getList = JSON.parse(getList);
        if(getList.length > 0)
          getList = getList.map(list => {
            list.isFavourite = true;
            return list;
          });
      }
      moviesArr = moviesArr.map((movie, index) => {
        let favourite = false;
        if(getList){
          for(var i = 0; i<getList.length; i++){
            if(getList[i].imdbID === movie.imdbID) {
              favourite = true;
            }
          }
        }
        movie.isFavourite = favourite;
        return movie;
      });
      return {
        ...state,
        loading: false,
        list: moviesArr,
        page: action.payload.page,
        totalResults: action.payload.response.totalResults,
        error: null,
        movieData: {},
        favList: getList
      };

    case FAV_MOVIE_LIST:
      // All done: set loading "false".
      // Also, get fav movie list
      let movieList = state.list;
      let updatedList = action.payload.list;
      if(updatedList && updatedList.length > 0){
        updatedList = updatedList.map(list => {
          list.isFavourite = true;
          return list;
        })
      }
      if(movieList.length > 0) {
        movieList = movieList.map((movie, index) => {
          movie.isFavourite = false;
          if(updatedList.length > 0)
            for(var j = 0; j<updatedList.length; j++){
              if(updatedList[j].imdbID === movie.imdbID){
                movie.isFavourite = true;
                // updatedList[j].isFavourite = true;
              }
            }
          return movie;
        })
      }
      return {
        ...state,
        list: movieList,
        movieData: {},
        favList: updatedList
      };

    case MOVIE_DETAILS_SUCCESS:
      // get movie details
      return {
        ...state,
        movieData: {...action.payload}
      };

    case FETCH_MOVIES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, hence, set `list` empty.
      let error = action.payload.error + ' not found!';
      return {
        ...state,
        loading: false,
        error,
        movieData: {}
      };

    default:
      // default case in a reducer
      return state;
  }
}