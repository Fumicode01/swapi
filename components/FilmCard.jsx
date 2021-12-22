import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import Loading from './Loading';

export const FilmCard = (props) => {

    return (
        <div className="films-container">
            {props.films.map(film => (
                <div key={film.uid} className='film-card-wrapper'>
                    <Link href={'/films/' + film.uid}>
                        <a>
                            <h2 className='film-title'>{film.properties.title}</h2>
                            <h3>Director:{film.properties.director}</h3>
                            <p className="film-opening_crawl">{film.properties.opening_crawl}</p>
                            <p>Release Date: {film.properties.release_date}</p>
                        </a>
                    
                    </Link>
                    <FontAwesomeIcon icon={farHeart} 
                        className="favorite-icon"  
                        color={props.onFavsList(film) ? 'red' : 'black'}
                        onClick={()=>props.onFavsList(film)
                            ? props.removeFavs(film)
                            : props.addFavs(film)}
                    />
                </div>
            ))}
        </div>
    )
}
