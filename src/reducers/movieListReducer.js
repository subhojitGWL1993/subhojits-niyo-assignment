import {
  FETCH_MOVIES_BEGIN,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FAV_MOVIE_LIST,
  MOVIE_DETAILS_SUCCESS
  // UPDATE_USER_SUCCESS
} from '../actions/movieActions';

const initialState = {
  list: [],
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
      // Also, replace the persons with the ones from the server
      let moviesArr = action.payload.response.Search;
      if(action.payload.scrolled)
        moviesArr = state.list.concat(action.payload.response.Search);
      moviesArr = moviesArr.filter(function(movie) {
         return movie !== undefined;
      });
      // localStorage check // set favourites
      let getList = localStorage.getItem('movieList');
      if(getList)
        getList = JSON.parse(getList);
      moviesArr = moviesArr.map((movie, index) => {
        let movieKey = movie.imdbID + '' + index;
        let favourite = false;
        if(getList)
          for(var i = 0; i<getList.length; i++)
            if(getList[i] === movieKey)
              favourite = true;
        movie.isFavourite = favourite;
        movie.movieKey = movieKey;
        return movie;
      });
      return {
        ...state,
        loading: false,
        list: moviesArr,
        page: action.payload.page,
        totalResults: action.payload.response.totalResults,
        error: null,
        movieData: {}
      };

    case FAV_MOVIE_LIST:
      let movieList = state.list;
      let updatedList = action.payload.list;
      if(movieList.length > 0) {
        movieList = movieList.map((movie, index) => {
          // let movieKey = movie.imdbID + '' + index;
          movie.isFavourite = false;
          if(updatedList.length > 0)
            for(var j = 0; j<updatedList.length; j++)
              if(updatedList[j] === movie.movieKey)
                movie.isFavourite = true;
          return movie;
        })
      }
      return {
        ...state,
        list: movieList,
        movieData: {}
      };

    case MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        movieData: {...action.payload}
      };

    /*case UPDATE_USER_SUCCESS:
      // update the user
      let updatedUser = action.payload.user;
      let updatedUsers = state.persons.map(person => {
        if(person.id === updatedUser.id)
          return {...updatedUser};
        return person;
      });
      // All done: set loading "false".
      // Also, replace the persons with the updated users
      return {
        ...state,
        loading: false,
        persons: updatedUsers,
        updatedUser: {...action.payload.user}
      };*/

    case FETCH_MOVIES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, hence, set `persons` empty.
      let error = action.payload.error + ' not found!';
      return {
        ...state,
        loading: false,
        error,
        list: [],
        movieData: {}
      };

    default:
      // default case in a reducer
      return state;
  }
}