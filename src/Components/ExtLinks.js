import React, { Component } from 'react';


class ExtLinks extends Component {
    render() {
        return (
            <div id="extlinks" className="extlinks-body">
            
            <div>
                <h2>My Cooking:</h2>
                <p>
                    These are recipes I've tried and love. Click on the image to go to the recipe and try it yourself! 
                </p>
            </div>
            <div className="recipe">
                <div className="img">
                    <a href="https://cafedelites.com/garlic-butter-shrimp-scampi/"><img src={require("../images/shrimp_scampi.jpg")} width="200" height="256.65" title="Shrimp Scampi" alt="Shrimp Scampi!"/></a>
                </div>
                <div>
                    <h3> Shrimp Scampi </h3>
                    <p>
                    This is my favorite recipe right now! Its so easy and quick to make and I love that although its pasta and shrimp the meal isn't too heavy. 
                    </p>
                </div>
            </div>
            <div className="recipe">
                <div className="img">
                    <a href="https://www.thekitchn.com/recipe-thanksgiving-slaw-237475"><img src={require("../images/coleslaw.jpg")} width="200" height="256.65" title="Thanksgiving Slaw" alt="Thanksgiving Slaw!"/></a>
                </div>
                <div>
                    <h3> Thanksgiving Slaw </h3>
                    <p>
                    This ones a little unconventional but as someone who doesn't like traditional coleslaw I love this recipe. 
                    </p>
                </div>
            </div>
            <div className="recipe">
                <div className="img">
                    <a href="https://www.lecremedelacrumb.com/shrimp-boil-foil-packs/"><img src={require("../images/shrimp_foil.jpg")} width="200" height="256.65" title="Shrimp Foil Pack" alt="Shrimp Foil Pack!"/></a>
                </div>
                <div>
                    <h3> Shrimp Boil Foil Packs </h3>
                    <p>
                    This requires minimal cooking skills and tastes soooooo good. Highly recommend if you're looking for a new comfort food.
                    </p>
                </div>
            </div>
        </div>
        );
    }
}

export default ExtLinks;