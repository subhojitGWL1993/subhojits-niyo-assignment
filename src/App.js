import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import { connect } from "react-redux";
import { fetchMovies, handleFavourites } from "./actions/movieActions";
import { MovieCardsList } from './components/MovieCardsList';
import { SearchComponent } from './components/SearchComponent';
import { HeaderComponent } from './components/HeaderComponent';
import { MovieDetails } from './components/MovieDetails';
import './App.css';
// react router import
import { Switch, Route, withRouter } from 'react-router-dom';
const Favourites = "favourites";

function App(props) {
  const { movies, error, loading, movieData, dispatch, favList } = props;
  const obj = { searchText: 'abc', type: 'All', pageNumber: 1, reRender: false, scrolled: false };
  const [dropData, setDropData] = useState({...obj});
  const urlArr = window.location.href.split('/');
  useEffect(() => {
    if(!urlArr[4])
      props.dispatch(fetchMovies(dropData.pageNumber, dropData.searchText, dropData.type, dropData.scrolled));
     // eslint-disable-next-line
  }, [dropData.reRender])
  // empty object check
  const isEmpty = obj => {
    for(var key in obj)
      if(obj.hasOwnProperty(key))
        return false;
    return true;
  }
  // search field onchange handler
  const handleSearch = e => {
    let searchText = e.target.value;
    if(searchText !== '')
      setDropData(prevData => ({...prevData, searchText}));
    else
      setDropData(prevData => ({...prevData, searchText: 'abc'}));
  }
  // dropdown onchange handler
  const handleDropDown = e => {
    let type = e.target.value;
    setDropData(prevData => ({...prevData, type}));
  }
  // search onsubmit handler
  const handleSearchClick = e => {
    e.preventDefault();
    setDropData(prevData => ({...prevData, reRender: !prevData.reRender, scrolled: false, pageNumber: 1}));
  }
  // toggle favourite handler
  const handleToggleFav = (e, movie) => {
    props.dispatch(handleFavourites(movie));
  }
  // movie card click handler
  const handleCardClick = (e, movieId) => {
    window.location.href = `/list/${movieId}`;
  }
  // search field check
  let searchField = (
    <SearchComponent
      handleSearch={handleSearch}
      handleDropDown={handleDropDown}
      handleSearchClick={handleSearchClick}
    />
  );
  if(urlArr[4] || (urlArr[3] && urlArr[3] === Favourites))
    searchField = "";
  return (
    <div className="App">
      <HeaderComponent />
      {searchField}
      <Switch>
        <Route exact path="/">
          <MovieCardsList 
            movies={movies}
            loading={loading}
            error={error}
            handleToggleFav={handleToggleFav}
            handleCardClick={handleCardClick}
            isEmpty={isEmpty} 
          />
        </Route>
        <Route exact path="/favourites">
          <MovieCardsList 
            movies={favList}
            loading={loading}
            error={error}
            handleToggleFav={handleToggleFav} 
            favourites={true}
            handleCardClick={handleCardClick}
            isEmpty={isEmpty}
          />
        </Route>
        <Route exact path="/list/:id">
          <MovieDetails
            movie={movieData}
            handleCardClick={handleCardClick}
            handleToggleFav={handleToggleFav}
            dispatch={dispatch}
            isEmpty={isEmpty}
          />
        </Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.movies.list,
    loading: state.movies.loading,
    error: state.movies.error,
    page: state.movies.page,
    totalResults: state.movies.totalResults,
    movieData: state.movies.movieData,
    favList: state.movies.favList
  }
}

export default withRouter(connect(mapStateToProps)(App));
