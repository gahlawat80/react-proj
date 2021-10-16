import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderCampsiteCard({site}){
    return(
        <Card >
            <Link to={`/directory/${site.id}`}>
                <CardImg width="100%" src={site.image} alt="nucamp site image" />
                <CardImgOverlay>
                    <CardTitle>{site.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory({campsites}){
        const directories = campsites.map(site =>{
            return (
                <div className="col-md-5 m-1" key={site.id}>
                    <RenderCampsiteCard site={site}/>
                </div>
            );
        })
        return (
            <div className="container">
                <div className="row">
                    {directories}
                </div>                
            </div>
        );
}

export default Directory;