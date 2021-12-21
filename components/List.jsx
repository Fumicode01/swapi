import { faFilm } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react'
import { FilmCard } from './FilmCard';

const List = () => {
    
    const [films, setFilms] = useState([]);
    const [favs, setFavs] = useState([]);


    useEffect(() => {
        async function fetchFilms(){
            const response= await fetch(`https://www.swapi.tech/api/films`)
            const json = await response.json()
            setFilms(json.result)
        }
        fetchFilms()
    }, [])
    console.log(films)

    useEffect(() => {
        console.log(favs);
      }, [favs]);

      useEffect(() => {
          const favoritefilms = JSON.parse(localStorage.getItem('favoriteFilms'));
          setFavs(favoritefilms)
      },[]);


    function addFavs(film){
        const newFavsList = [...favs, film]
        setFavs(newFavsList)
        saveToLocalStorage(newFavsList)
    }

    function removeFavs(film){
        const newFavsList = favs.filter((fav) => {return fav.uid !== film.uid})
        setFavs(newFavsList)
        saveToLocalStorage(newFavsList)
    }

    function saveToLocalStorage(films){
        localStorage.setItem('favoriteFilms', JSON.stringify(films))
    }

    function onFavsList(film){
        if (favs.filter(item => item.uid === film.uid).length > 0){
            return true
        }
        return false
    }

    return (
        <>
                {/* {films.map(film => (
                    <FilmCard  
                        key={film.uid}
                        id={film.uid}
                        title={film.properties.title}
                        characters={film.properties.characters}
                        director={film.properties.director}
                        opening_crawl={film.properties.opening_crawl}
                        release_date={film.properties.release_date}
                        addFavs={addFavs}
                        removeFavs={removeFavs}
                        // favs={favs}
                        />
                ))} */}
                <FilmCard 
                    films={films}
                    addFavs={addFavs}
                    removeFavs={removeFavs}
                    onFavsList={onFavsList}
                />
                <div>Favs List</div>
                <FilmCard 
                    films={favs}
                    addFavs={addFavs}
                    removeFavs={removeFavs}
                />
            {/* <div>
            <h1>Initial list</h1>
                <ul>
                    {films.map((item, i) => (
                    <li key={i}>
                        {item.name}{" "}
                        <button
                        onClick={() => {
                            addFavs(item);
                        }}
                        >
                        {item.favorite === true ? "Remove" : "Add"}
                        </button>
                    </li>
                    ))}
                </ul>

                <h1>Favorite list</h1>
                <ul>
                    {favs.map(item =>
                    item.favorite === true ? <li key={item.id}>{item.name}</li> : null
                    )}
                </ul>
            </div> */}
        </>
    )
}

export default List;