import React from 'react';

export const SearchComponent = (props) => {
	const { handleSearch, handleDropDown, handleSearchClick } = props;
	return(
		<div className="search_component">
			<div className="searchDiv_outer">
				<form onSubmit={handleSearchClick}>
					<div className="search_displayInline search_inputClass">
						<input 
							type="text" 
							className="search_inputField"
							onChange={handleSearch} 
						/>
					</div>
					<div className="search_displayInline">
						<select className="search_selectClass" onChange={handleDropDown}>
						  <option defaultValue>All</option>
						  <option>Movies</option>
						  <option>Series</option>
						  <option>Episodes</option>
						</select>
					</div>
					<div className="search_displayInline">
		                <button 
		                  type="submit" 
		                  className="searchButton_class"
		                >
		                  Search
		                </button>
		            </div>
	            </form>
			</div>
		</div>
	);
}