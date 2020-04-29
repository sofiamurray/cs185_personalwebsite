import React, { Component } from 'react';
import Tab from './Tab'


class TabList extends Component {
    render() {
        return( 
        <div className="tab-list">
            {this.props.tabs.map((tab) => {
                return(
                <Tab tab={tab} 
                activeTab={this.props.activeTab} 
                changeTab={this.props.changeTab}/>
                )
                })}
        </div>
        );
    }
}

export default TabList;