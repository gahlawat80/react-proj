import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import CampsiteInfo from './CampsiteInfoComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite : null
    }
  }

  onCampSiteSelect(id){
        this.setState({selectedCampsite:id});
    }
    render() {
        return (
            <div>
                <Header />
                <Directory campsites={this.state.campsites}  onClick={(id)=>this.onCampSiteSelect(id)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite=>campsite.id===this.state.selectedCampsite)[0]}/>
                <Footer />
            </div>
        );
    }
}

export default Main;