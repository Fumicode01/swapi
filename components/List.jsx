import React, {useEffect, useState} from 'react'
import { FilmCard } from './FilmCard';

const List = () => {
    
    const [films, setFilms] = useState([]);
    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchFilms(){
            const response= await fetch(`https://www.swapi.tech/api/films`)
            const json = await response.json()
            setFilms(json.result)
        }
        fetchFilms()
        setLoading(false)
    }, [])
    console.log(films)

      useEffect(() => {
          const favoritefilms = JSON.parse(localStorage.getItem('favoriteFilms'));
          if(favoritefilms == null){
              setFavs([])
        } else {
              setFavs(favoritefilms)
          }
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
            <FilmCard 
                films={films}
                addFavs={addFavs}
                removeFavs={removeFavs}
                onFavsList={onFavsList}
                loading={loading}
            />
            <div>Favs List</div>
            <FilmCard 
                films={favs}
                addFavs={addFavs}
                removeFavs={removeFavs}
                onFavsList={onFavsList}
                loading={loading}
                />
        </>
    )
}

export default List;