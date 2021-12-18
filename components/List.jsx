import React, {useEffect, useState} from 'react'
import { FilmCard } from './FilmCard';

const List = () => {
    
    const [films, setFilms] = useState([]);

    useEffect(() => {
        async function fetchFilms(){
            const response= await fetch(`https://www.swapi.tech/api/films`)
            const json = await response.json()
            setFilms(json.result)
        }
        fetchFilms()
    }, [])
    console.log(films)

    function addFavourite(film){
        localStorage.setItem('favourite', film)
    };

    return (
        <div className="films-container">
            {films.map(film => (
                <FilmCard  
                    key={film.uid}
                    id={film.uid}
                    title={film.properties.title}
                    characters={film.properties.characters}
                    director={film.properties.director}
                    opening_crawl={film.properties.opening_crawl}
                    release_date={film.properties.release_date}
                    />
            ))}
        </div>
    )
}

export default List;