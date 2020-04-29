import React, { Component } from 'react';

class Tab extends Component {
    addStyling = () => {
        if(this.props.tab.id == this.props.activeTab){
            return{backgroundColor: '#BF9086'}
            
        }
        
    }
    render() {
        return (
            <div className='tab' 
            style={this.addStyling()}
            onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                <h4>{this.props.tab.title}</h4>
            </div>
        );
    }
}

export default Tab;