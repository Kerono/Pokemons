import React, { FC, useState, useEffect } from 'react';

type Props = {
	id: number;
	name: string;
	url: string;
	searchingName: string;
}

const Card: FC<Props> = ({ id, name, url, searchingName }) => {
	const [pokemonImg, setPokemonImg] = useState("")
	const [pokemonColor, setPokemonColor] = useState("")
	let searchValue = false;
	if (searchingName === "") {
		searchValue = true 
	} else if (name.includes(searchingName)) {
		searchValue = true
	}
	const stylesBackground: {
		backgroundColor: string
	} = { 
		backgroundColor: pokemonColor,
	}
	if (stylesBackground.backgroundColor === "white") {
		stylesBackground.backgroundColor = "#A7B723"
	} 
	if (stylesBackground.backgroundColor === "yellow") {
		stylesBackground.backgroundColor = "rgba(249, 207, 48, 1)"
	}
	if (stylesBackground.backgroundColor === "pink") {
		stylesBackground.backgroundColor = "rgba(251, 85, 132, 1)"
	} 
	const stylesBorder = { 
		border: ` 1px solid ${stylesBackground.backgroundColor}`
	}
	useEffect(() => {
		fetch(url)
		  .then(responce => responce.json())
		  .then(data => {
				setPokemonImg(data.sprites.front_default)
		})
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)
			.then(responce => responce.json())
			.then(data => {
			 	setPokemonColor(data.color.name)
	 })
  }, [])
  
	return (
		<div style = {stylesBorder} className={searchValue?"card": "hide"}>
			<img className='card-img' src= {pokemonImg}/>
			<div style ={stylesBackground} className='card__text'>{name}</div>
		</div>
	);
}

export type { Props as CardProps }
export { Card }
