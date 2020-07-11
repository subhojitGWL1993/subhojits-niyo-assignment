import React from 'react';

export const MovieCard = (props) => {
	const { movie, handleToggleFav, handleCardClick, isEmpty } = props;
	const urlArr = window.location.href.split('/');
	let details_Av = '';
	let buttonDiv = (
		<div>
			<div className="movies_toggleFavOuter">
				<button 
					type="button" 
					className="movies_toggleFav"
					onClick={(e) => handleToggleFav(e, movie.movieKey)} 
				>
					{ movie.isFavourite ? 'Unfavourite' : 'Favourite' }
				</button>
			</div>
		</div>
	);
	if(urlArr[4]) {
		details_Av = ' details_Av';
		buttonDiv = '';
	}
	if(!isEmpty(movie))
		return(
			<div className="movie_card_div">
				<div className="movies_card" onClick={(e) => handleCardClick(e, movie.imdbID)}>
					<div className={"movies_Avatar" + details_Av}>
						<img src={movie.Poster} alt={movie.Title} className="movies_img"/>
					</div>
					<div className="movies_fullName movies_textFont">
						<div className="movies_textSection">
							{movie.Title}
						</div>
					</div>
					<div className="movies_email movies_textFont">
						<div className="movies_textSection">
							Release Year:&nbsp;<strong className="movie_yearText">{movie.Year}</strong>
						</div>
					</div>
				</div>
				{buttonDiv}
			</div>
		);
	else
		return (
			<strong style={{color: '#FFFFFF'}}>
				No movie details
			</strong>
		);
}