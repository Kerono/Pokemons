import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, CardProps } from "./Card"

interface Event {
	target: {
		value: string
	}
}
function App() {
	const [pokemonSearchingName, setSearchingName] = useState("")
	const [pokemonList, setPokemonList] = useState<CardProps[] | null>(null);
	const [sortedPokemonList, setSortedPokemonList] = useState<CardProps[] | null>(null);
	const [alphabet, setAlphabet] = useState(false)
	useEffect(() => {
		 fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
			.then(responce => responce.json())
			.then(data => setPokemonList(data.results))
	}, [])
	useEffect(() => {
		setSortedPokemonList(alphabetSorting(pokemonList))
	}, [pokemonList])
	function findPokemon(event:Event) {
		setSearchingName(event.target.value)
	}
	function alphabetSorting (pokemonList: CardProps[] | null) {
		if (pokemonList === null) {
			return null
		}
		 let alphabetically = [...pokemonList].sort((a, b) => {
			let aName = a.name.toUpperCase()
			let bName = b.name.toUpperCase()
			if (aName < bName) {
				return -1;
			 }
			 if (aName > bName) {
				return 1;
			 } 
			 return 0
		})
		
		return [...alphabetically];
	}
	
	function onChange () {
		setAlphabet(prevValue => !prevValue)
	}
	
	const list = alphabet ? sortedPokemonList : pokemonList;
	
	return (
		<div className="container">
			<div className='header'>
				<img 
					className='header__logo'
					src="/assets/pokeball.svg" 
					alt="logo"
				/>
				<div className='header__text'>Pokédex</div>
				<div>
					<div 
						className='reordering'
						onClick={onChange} >
						<div className='reordering__text'>
							<div>A</div>
							<div>Z</div>
						</div>
						<img 
							className='arrowDown' 
							src="/assets/arrowDown.svg" 
							alt="arrowDown"></img>
					</div>
				</div>
			</div>
			<div className='search'>
					<img 
						className='search-svg' 
						src="/assets/search.svg" 
						alt="search"></img>
					<input 
						className="search__text" 
						type="text"
						placeholder = "Enter pokemon name"
						onChange = {findPokemon}
						value= {pokemonSearchingName.toLowerCase()}
						>
					</input>
			</div>
			
			<div className='pokemonCard'>
				{list === null
					? (
						<div>loading...</div>
					)
					: (
						<>
							{ list.map(({ name, url }, index) => (
								<Card
									key={name}
									id={index}
									name={name}
									searchingName = {pokemonSearchingName}
									url={url}
								/>
							))}
						</>
					)
				}
			</div>
			
		</div>
    
  )
}

export default App;
