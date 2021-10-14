import React from 'react';
import {Card,CardImg,CardBody,CardTitle,CardText} from 'reactstrap';

function CampsiteInfo(props){
    if(props.campsite){
        return(
            <div className="container">
                <div className="row">
                    {RenderCampsite(props.campsite)}
                    {RenderComments(props.campsite.comments)}
                </div>
            </div>
            );
    } else {
        return(
            <div></div>
        );
    }
    
}

function RenderComments(comments){
        
        if(comments){
            //console.log(comments);
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment=>{
                        const {id,text,author,date}=comment;
                        return(
                        <div key={id}>
                            <p>{text}</p>
                            <p>{author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)))}</p>
                        </div>
                        )
                        //console.log(comment.text, comment.author, new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date))))
                    })}
                </div>
            );
        }

    }
    function RenderCampsite(campsite){
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }


export default CampsiteInfo;