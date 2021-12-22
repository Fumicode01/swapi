import React, {useEffect, useState} from 'react'
import { FilmCard } from './FilmCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from './Loading';

const List = () => {
    
    const [films, setFilms] = useState([]);
    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("")
    const [filteredResults, setFilteredResults] = useState([])

    useEffect( async () => {
        async function fetchFilms(){
            const response= await fetch(`https://www.swapi.tech/api/films`)
            const json = await response.json()
            setFilms(json.result)
            setFilteredResults(json.result)
        }
        await fetchFilms()
        setLoading(false)
    }, [])

    useEffect(()=> {
        searchItems(searchInput)
    },[searchInput])

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

    //Can be searchable from Title and Director
    function searchItems(searchValue){
        setSearchInput(searchValue)
        if (searchInput !== ''){
            const filteredData = films.filter((film) => {
                return Object.values([film.properties.title, film.properties.director]).join('').toLowerCase().includes(searchValue)
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(films)
        }
    }

    return (
        <div>
            <div className="search-row">
                <div className="search-container flex-1">
                    <form className="search" method='GET'>
                        <input 
                            className="search-input" 
                            type="text" 
                            placeholder='Search Star Wars' 
                            onChange={(e) => searchItems(e.target.value)}
                        />
                    </form>
                    <button className="search-button" id="search-icon" tabIndex={-1}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                    </button>
                </div>
            </div>
            <div className="page-container">
                {!loading
                ?(
                    <>
                    {favs.length > 0 
                        ? (
                            <div className="inside-loading-container">
                                <div className="title-container">
                                    <div className="yellow title flex-1 favorite-list-title">
                                        <p>Favorite Film List</p>
                                    </div>
                                </div>
                                
                                <FilmCard 
                                    films={favs}
                                    addFavs={addFavs}
                                    removeFavs={removeFavs}
                                    onFavsList={onFavsList}
                                    loading={loading}
                                    />
                            </div>
                        ):""}
                        <div className="inside-loading-container">
                            <div className="title-container">
                                <div className="yellow title flex-1 favorite-list-title">
                                    <p>Film List</p>
                                </div>
                                </div>
                            
                            <FilmCard 
                                films={filteredResults}
                                addFavs={addFavs}
                                removeFavs={removeFavs}
                                onFavsList={onFavsList}
                                loading={loading}
                            />
                        </div>
                    </>
                ): <Loading className="page-loading"/>}

            </div>
        </div>
    )
}

export default List;