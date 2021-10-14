import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

function RenderCampsiteCard({site}){
    return(
        <Card >
            <CardImg width="100%" src={site.image} alt="nucamp site image" />
            <CardImgOverlay>
                <CardTitle>{site.name}</CardTitle>
            </CardImgOverlay>
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