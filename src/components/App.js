import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/';


class App extends Component {
    state = { artistQuery: '', artist: null, tracks: [] };

    updateArtistQuery = event => {
        this.setState({ artistQuery: event.target.value});
    }

    searchArtist = () => {
        fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
        .then(response => response.json())
        .then(json => {

            if (json.artists.total > 0) {
                const artist = json.artists.items[0];

                this.setState({ artist });

                fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                .then(response => response.json())
                .then(json => {
                    this.setState({ tracks: json.tracks })
                })
                .catch(error => alert(error.message));
            }
        })
        .catch(error => alert(error.message));
    }

    handKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchArtist();
        }
    }

    render() {
        // console.log('this.state', this.state);
        return(
            <div>
                <h2>Music Master</h2>
                <div className='search-holder'>
                    <input 
                        onChange={this.updateArtistQuery} 
                        onKeyPress={this.handKeyPress}
                        className='search-input' 
                        placeholder='Search for an Artist'
                    />
                    <button 
                        onClick={this.searchArtist} 
                        className='search-btn'>Search
                    </button>
                </div>
                <Artist artist={this.state.artist}/>
                <Tracks tracks={this.state.tracks}/>
            </div>
        );
    }
}

export default App;
