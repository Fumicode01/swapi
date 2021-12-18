import Link from 'next/link'
import React from 'react'

export const FilmCard = (props) => {
    const id = props.id

    async function getCharacterName(url){
        const response= await fetch(url)
        const json = await response.json()
        return json.result.properties.name
    }
    console.log(getCharacterName(props.characters[1]))
    return (
        <Link href={'/films/' + id} className='film-card-wrapper'>
            <a>
                <h2 className='film-title'>{props.title}</h2>
                <h3>Director:{props.director}</h3>
                <p className="film-opening_crawl">{props.opening_crawl}</p>
                <p>Release Date: {props.release_date}</p>
            </a>
           
            
        </Link>
    )
}
