import React, { useEffect } from 'react';
import { MovieCard } from './MovieCard';
import { Details } from './Details';
import { getMovieDetails } from "../actions/movieActions";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

export const MovieDetails = (props) => {
	const { movie, handleToggleFav, handleCardClick, isEmpty } = props;
	let urlArr = window.location.href.split('/');
	useEffect(() => {
	    props.dispatch(getMovieDetails(urlArr[4]));
	}, [urlArr[4]])
	return(
		<div className="movies_classList_outer movie_details_classList_outer">
			<div className="movies_classList">
				<div className="movies_cardOuter">
					<MovieCard 
						movie={movie} 
						handleToggleFav={handleToggleFav} 
						handleCardClick={handleCardClick}
						isEmpty={isEmpty}
					/>
				</div>
				<div className="movies_cardOuter details_cardOuter">
					<Details
						movie={movie} 
					/>
				</div>
			</div>
		</div>
	);
}