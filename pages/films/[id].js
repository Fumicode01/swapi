import { setConfig } from 'next/config';
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom';
import FilmDetails from '../../components/FilmDetails';
import Loading from '../../components/Loading';

const FilmDetailsPage = () => {

    const [id, setId] = useState()
    const [film, setFilm] = useState([])
    const [loading, setLoading] = useState(true)
    const [characters, setCharacters] = useState([])

    useEffect(async () => {
        // setLoading(true)
        let id = window.location.pathname.split('/films')[1];
        if(id !== ""){
            id = id.split('/')[1];
            setId(id)
        }
        async function fetchFilm(){
            const response= await fetch(`https://www.swapi.tech/api/films/` + id)
            const json = await response.json()
            setFilm(json.result.properties)
        }
        await fetchFilm()
        setLoading(false)
    }, [])

    console.log(film)
    


    // useEffect(async () => {
    //     // setLoading(true)
    //     async function getCharacterName(url){
    //         const response= await fetch(url)
    //         const json = await response.json()
    //         console.log(json)
    //         // setCharacters(json)
    //         // return json.result.properties.name
    //         // console.log(response.result)
    //     // await getCharacterName(film.characters)
    //     setLoading(false)
    // }
    // await film.characters.map(character =>{
    //     getCharacterName(character)
    // })
    // console.log(characters)

    // }, [film])

    //  function getCharacterName(url){
    //     const response= fetch(url)
    //     // const json = await response.result.properties.json()
    //     const name = response.result
    //     console.log(name)

    //     // return json.result.properties.name
    //     // console.log(response.result)
    // }
    
    return (
        <div>
            {/* {!loading ? film.characters.map((character, i) => 
                <div key={i}>{character.name}</div>
            ) : <Loading className="page-loading" />} */}
            {!loading ? <div>{film.title}</div>  : <Loading className="page-loading" />}
          

            
        </div>
    )
}

export default FilmDetailsPage
