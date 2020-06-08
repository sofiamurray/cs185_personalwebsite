import React, { Component } from 'react';
import config from '../config';
import firebase from '../firebase.js';
import Popup from "reactjs-popup";
var d3 = require("d3");


export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            nodes: [],
            links: [],
            nodesDemo: [
                {
                    name: "Goksu",
                    group: 1
                },
                {
                    name: "Sofia",
                    group: 2
                }
            ],
            linksDemo: [
                {
                    source: 1,
                    target: 0,
                    value: 1
                }
            ]

        };
    
        this.handleChange = this.handleChange.bind(this);
        this.getMovies = this.getMovies.bind(this);
    }
    

    drag = (simulation) => {
        function dragStarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }

    chart(nodes,links){
        const width = 1920;
        const height = 1080;

        const obj_links = links.map( d => Object.create(d));
        const obj_nodes = nodes.map( d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        var defs = svg.append("svg:defs"); 

        nodes.forEach((node,i) => {
            if(node.group === 1){
                defs.append("pattern")
                    .attr("id", "poster_"+node.name)
                    .attr("patterUnits","objectBoundingBox")
                    .attr("width", 1)
                    .attr("height", 1)
                .append("image")
                    .attr("xlink:href", node.poster)
                    .attr("x", -50)   //play w these numbers
                    .attr("y", -30)   //play w these numbers
                    .attr("width", 300)
                    .attr("height", 300);
            }
        })
        
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const color = (node) => {
            if (node.group == 1)
                return "url(#poster_" + node.name + ")";
            return d3.color("#E9AFA3");
        }

        const radius = (node) => {
            if (node.group == 1)
                return 100;
            return 50;
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("opacity", 0)
            .style("color", "#FFE8D6")
            .style("font-family", "Abril Fatface")
            .style("font-size", "14px")
            .style("padding", "5px")
            .style("border-radius", "3px")
            .style("background-color", "#BF9086")

        var mouseover = function(node) {
            tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "#BF9086")
                .style("opacity", 100)
        }

        var mousemove = function(node) {
            if(node.group === 2){
                tooltip
                .html(node.name)
                .style("left", (d3.event.x +"px"))
                .style("top", (d3.event.y + 10 + "px"))
            }else{
                tooltip
                .html(node.title)
                .style("left", (d3.event.x +"px"))
                .style("top", (d3.event.y + 10 + "px"))
            }
            
        }

        var mouseleave = function(node) {
            tooltip
                .style("opacity",0)
            d3.select(this)
                .style("stroke", "white")
        }

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-opacity", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .attr("fill", color)
            .call(this.drag(simulation))
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);


        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
            
        });

        return svg.node();
    }



    async componentDidMount() { 
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
        await this.getMovies();

    }

    componentDidUpdate() {
        const elem = document.getElementById("mysvg");

        const nodesLength = Object.keys(this.state.nodes).length;

        const linksLength = Object.keys(this.state.links).length

        if (nodesLength !== 0 && linksLength !== 0) elem.appendChild(this.chart(this.state.nodes, this.state.links));
        else d3.selectAll("svg > *").remove();

    }
    
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    async getMovies() {
        //console.log("IN GET MOVIES")
    
        const movieRef = firebase.database().ref('movies');
    
        movieRef.on('value', (snapshot) => {
                
            let movieData = snapshot.val();
            let newNodeState = [];
            let newLinkState = [];
            for(let movie in movieData) {
                //console.log("PUSH: "+movieData[movie].title);
                let listData = movieData[movie].inLists;
                let listPresent = false;
                for(var i=0; i<listData.length;i++){
                    //console.log(listData[i]);
                    if(listData[i] === "GraphViz"){
                        listPresent = true;
                    }  
                }
                
                if(listPresent){

                    var movieID = movieData[movie].movieID;
                    var actorsStr = movieData[movie].actors;
                    var actorsList = actorsStr.split(', ');
                    
                    // push movie node (this would be index length-1)
                    // group 1 refers to movies
                    newNodeState.push({
                        name: movieID,
                        poster: movieData[movie].poster,
                        title: movieData[movie].title,
                        group: 1
                    });

                    var movieIndex = newNodeState.length - 1;
                    
                    //group 2 refers to actors
                    //check if actor node already exists if so create link
                    //otherwise create new node 
                    
                    //iterate through actors in this movie
                    for(var i=0; i<actorsList.length; i++){
                        
                        var actorIndex = newNodeState.length;
                        
                        
                        var exists = false;

                        //iterate through already existing nodes
                        for(var j=0; j<newNodeState.length; j++){
                            if(newNodeState[j].group === 2){
                                if(actorsList[i] === newNodeState[j].name){
                                        actorIndex = j;
                                        exists = true;

                                }
                            }
                        }
                        
                        newLinkState.push({
                            source: movieIndex,
                            target: actorIndex,
                            value: 1

                        });

                        if(!exists){

                            newNodeState.push({
                                name: actorsList[i],
                                group: 2
                            });

                        }
                        
                    }
                }
    
            }
    
            this.setState({
                    nodes: newNodeState,
                    links: newLinkState
            });
                
        });

        
            
    }
    





    render() {
        console.log(this.state.nodes);
        console.log(this.state.links);
            return (
                <div id="movies" className="movies-body">
                    <div>
                        <h2>Graph Visualization</h2>
                    </div>
      
                    <div>
                        
                    </div>

                    <div id="mysvg">

                    </div>

                    
                        
                </div>
            );
        }
    }

    
    //sources used:
    //https://bl.ocks.org/jarandaf/941c7e839b49ecd4f6e2
    //https://www.d3-graph-gallery.com/graph/scatter_tooltip.html
    
    
    