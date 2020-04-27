import React, { Component } from 'react';

class Images extends Component {
    render() {
        return (
            <div id = "images" className ="images-body">
            <a href="#" id="back_to_top" >Back to top</a>
            <div>
                <h2>My Travels:</h2>
                <p>
                    These are some photos from my time abroad. 
                </p>
            </div>

            <div className = "container">
                         

                        <img class="gallery portrait" id="pic" src={require("../images/valencia_street.jpg")} alt="valencia1"/>
                        <img class="gallery portrait" id="pic" src={require("../images/dublin_bar.jpg")} alt="dublin1"/>

                    

                        <img class="gallery portrait" id="pic" src={require("../images/valencia_paella.jpg")} alt="valencia2"/> 
                        <img class="gallery portrait" id="pic" src={require("../images/zurich_cat.jpg")} alt="zurich3"/> 

                        

                        <img class="gallery portrait" id="pic" src={require("../images/barca_street.jpg")} alt="barca1"/> 
                        <img class="gallery portrait" id="pic" src={require("../images/dublin_cliffs.jpg")} alt="dublin2"/>

                        

                        <img class="gallery portrait" id="pic" src={require("../images/munich_building.jpg")} alt="munich2"/>
                        <img class="gallery portrait" id="pic" src={require("../images/madrid_street.jpg")} alt="madrid3"/> 

                        

                        <img class="gallery portrait" id="pic" src={require("../images/madrid_leaf.jpg")} alt="madrid4"/> 
                        <img class="gallery portrait" id="pic" src={require("../images/buda_emma.jpg")} alt="buda2"/>

                        

                        <img class="gallery portrait" id="pic" src={require("../images/zurich_house.jpg")} alt="zurich4"/>
                        <img class="gallery portrait" id="pic" src={require("../images/buda_view.jpg")} alt="buda1"/>

                         

                        <img class="gallery portrait" id="pic" src={require("../images/barca_fountain.jpg")} alt="barca2"/>



                        


            </div>

            <div id="myModal" class="modal">
            <img class="modal-content" id="expanded"/>
              
            </div>
            
  

        </div>
        );
    }
}

export default Images;