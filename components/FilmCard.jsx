import Link from 'next/link'
import React from 'react'

export const FilmCard = (props) => {

    console.log(props.films)
    return (
        <div className="films-container">
            {props.films.map(film => (
                <div key={film.uid}>
                    <Link href={'/films/' + film.uid} className='film-card-wrapper'>
                        <a>
                            <h2 className='film-title'>{film.properties.title}</h2>
                            <h3>Director:{film.properties.director}</h3>
                            <p className="film-opening_crawl">{film.properties.opening_crawl}</p>
                            <p>Release Date: {film.properties.release_date}</p>
                        </a>
                    
                    </Link>
                    <button onClick={()=>props.onFavsList(film)
                     ? props.removeFavs(film)
                    : props.addFavs(film)
                    }>Favs</button>
                </div>
            ))}
        </div>
    )
}
