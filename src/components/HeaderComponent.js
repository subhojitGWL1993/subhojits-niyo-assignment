import React from 'react';

export const HeaderComponent = (props) => {
	return(
		<header className="App-header">
	        <div className="display_Inline left_Align flex_Align">
	          <a href="/" className="textFont font_important">
	            Home
	          </a>
	        </div>
	        <div className="display_Inline right_Align flex_Align">
	          <a href="/favourites" className="textFont">
	            Favourites
	          </a>
	        </div>
	    </header>
	);
}