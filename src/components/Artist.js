import React from 'react';

const Artist = ({ artist }) => {
    if (!artist) return null;

    const { images, name, followers, genres,  } = artist;

    return(
        <div>
            <h3>{name}</h3>
            <img src={images[0] && images[0].url} alt='artist-profile' className='artist-image-in'/>
            <p>{followers.total} followers</p>
            <p>{genres.join(',')}</p>
        </div>
    )
}

export default Artist;