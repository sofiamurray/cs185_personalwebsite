import React, { Component } from 'react';
import { SRLWrapper } from "simple-react-lightbox";




class Images extends Component {
    render() {
        return (
            <div id = "images" className ="images-body">
            
            <div>
                <h2>My Travels</h2>
                <p>
                    These are some photos from my time abroad. 
                </p>
            </div>
            <SRLWrapper>
            <div className = "container">
            

                <img src={require("../images/valencia_street.jpg")} alt="Streets of Valencia"/>
                <img src={require("../images/dublin_bar.jpg")} alt="Temple Bar in Dublin"/>
                <img src={require("../images/valencia_paella.jpg")} alt="Paella in Valencia"/> 
                <img src={require("../images/zurich_cat.jpg")} alt="Farm Cat in Zurich"/> 
                <img src={require("../images/barca_street.jpg")} alt="Street of Barcelona"/> 
                <img src={require("../images/dublin_cliffs.jpg")} alt="Cliffs in Howth"/>
                <img src={require("../images/munich_building.jpg")} alt="New Town Hall in Munich"/>
                <img src={require("../images/madrid_street.jpg")} alt="Streets of Madrid"/> 
                <img src={require("../images/madrid_leaf.jpg")} alt="Botanical Gardens in Madrid"/> 
                <img src={require("../images/buda_emma.jpg")} alt="Budapest with Friends"/>
                <img src={require("../images/zurich_house.jpg")} alt="Exploring Zurich"/>
                <img src={require("../images/buda_view.jpg")} alt="Pretty View in Budapest"/>
                <img  src={require("../images/barca_fountain.jpg")} alt="Fountain in Barcelona"/>

            
            </div>
            </SRLWrapper>

        </div>
        );
    }
}

export default Images;