import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import CardBody from 'reactstrap/lib/CardBody';
import CardText from 'reactstrap/lib/CardText';

class Directory extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedCampsite : null
        }
    }

    onCampSiteSelect(campsite){
        this.setState({selectedCampsite:campsite});
    }

    renderSelectedCampsite(campsite){
        if(campsite){
            return (
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        return <div />;
    }

    render(){
        const directories = this.props.campsites.map(site =>{
            return (
                <div className="col-md-5 m-1" key={site.id}>
                    <Card onClick={()=>this.onCampSiteSelect(site)}>
                        <CardImg width="100%" src={site.image} alt="nucamp site image" />
                        <CardImgOverlay>
                            <CardTitle>{site.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        })
        return (
            <div className="container">
                <div className="row">
                    {directories}
                </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedCampsite(this.state.selectedCampsite)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Directory;