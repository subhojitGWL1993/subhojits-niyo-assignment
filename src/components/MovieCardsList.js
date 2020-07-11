import React from 'react';
import { MovieCard } from './MovieCard';

export const MovieCardsList = (props) => {
	const { movies, error, lastMovieRef, handleToggleFav, favourites, handleCardClick, isEmpty } = props;
	let movieList = (
		<div className="list_loadingText">
			Loading ...
		</div>
	);
	if(movies.length > 0) {
		let filteredMovies = [...movies];
		if(favourites)
			filteredMovies = movies.filter(movie => {
				return movie.isFavourite === favourites;
			})
		movieList = filteredMovies.map((movie, index) => {
			let movieCards = (
				<MovieCard 
					movie={movie} 
					handleToggleFav={handleToggleFav} 
					handleCardClick={handleCardClick}
					isEmpty={isEmpty}
				/>
			);
			return(
				<div key={movie.movieKey} className="movies_cardOuter">
					{movieCards}
				</div>
			);
		})
	}
	else if(error !== null)
		movieList = (
			<div className="list_errorText">
				{error}
			</div>
		);
	
	if(Array.isArray(movieList) && movieList.length === 0)
		movieList = (
			<div className="list_errorText">
				List is empty!
			</div>
		);
	return(
		<div className="movies_classList_outer">
			<div className="movies_classList">
				{movieList}
			</div>
		</div>
	);
}