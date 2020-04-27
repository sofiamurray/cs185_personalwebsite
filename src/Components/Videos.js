import React, { Component } from 'react';

class Videos extends Component {
    render() {
        return (
            <div id="videos" className="videos-body">
            <a href="#" id="back_to_top">Back to top</a>
            <div>
                <h2>My Music:</h2>
                <p>
                    These are some songs I like (not necessarily my favorites because I'm too indecisive for that). 
                </p>
            </div>
            <div className = "container">

                        <iframe src="https://www.youtube.com/embed/sRRtbEeokE8"></iframe>

                        <iframe src="https://www.youtube.com/embed/m60XKqEEnfg"></iframe>

                        <iframe src="https://www.youtube.com/embed/I7HahVwYpwo"></iframe>

                        <iframe src="https://www.youtube.com/embed/MRimTuBSpTw"></iframe>

                        <iframe src="https://www.youtube.com/embed/aCyGvGEtOwc"></iframe>

                        <iframe src="https://www.youtube.com/embed/2X_2IdybTV0"></iframe>
            </div>
        </div>
        );
    }
}

export default Videos;