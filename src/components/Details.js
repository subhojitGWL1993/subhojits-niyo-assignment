import React from 'react';

export const Details = (props) => {
	const { movie } = props;
	return (
		<div className="details_divOuter">
			<h3>Director:</h3> <p>{movie.Director}</p>
			<br/>
			<h3>Actors:</h3> <p>{movie.Actors}</p>
			<br/>
			<h3>Genre:</h3>	<p>{movie.Genre}</p>
			<br/>
			<h3>Plot:</h3> <p>{movie.Plot}</p>
			<br/>
			<h3>Language:</h3> <p>{movie.Language}</p>
			<br/>
			<h3>Country:</h3> <p>{movie.Country}</p>
			<br/>
			<h3>Awards:</h3> <p>{movie.Awards}</p>
			<br/>
			<h3>Box Office:</h3> <p>{movie.BoxOffice}</p>
			<br/>
			<h3>Released:</h3> <p>{movie.Released}</p>
			<br/>
			<h3>Production:</h3> <p>{movie.Production}</p>
			<br/>
			<h3>IMDB Rating:</h3> <p>{movie.imdbRating}</p>
		</div>
	);
}