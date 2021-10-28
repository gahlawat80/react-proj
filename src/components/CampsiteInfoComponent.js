import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function CampsiteInfo(props){
    if(props.campsite){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {RenderCampsite(props.campsite)}
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
            );
    } else {
        return(
            <div></div>
        );
    }
    
}

function RenderComments({comments, addComment, campsiteId}) {
        
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
                   <CommentForm campsiteId={campsiteId} addComment={addComment} />
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
                        <CardText>{campsite.description}</CardText>
                        
                    </CardBody>
                </Card>
            </div>
        );
    }

    const minLength = len=> val => val && val.length>=len;
    const maxLength = len => val => !val || val.length<=len;

    export class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen: false,
                ratings: 0,
                author: "",
                text: ""
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        } 
        
        toggleModal(){
            this.setState({isModalOpen: !this.state.isModalOpen});
        }
        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }
        render(){
            return( 
                <>
                <Button onClick={this.toggleModal}><i className="fa fa-pencil pr-2" aria-hidden="true"></i>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comments</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="ratings" md={2}>Ratings</Label>                                
                                <Control.select model=".ratings" name="ratings" id="ratings" className="form-control">
                                    <option>Please select...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>                               
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>                                
                                <Control.text model=".author" id="author" name="author"
                                    className="form-control" 
                                    validators = {{
                                     minLength: minLength(2),
                                     maxLength: maxLength(15)  
                                    }}/> 
                                 <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters long',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />                               
                            </div>
                            <div className="form-group">
                                <Label md={2} htmlFor="text">Comment</Label>
                                <Control.textarea model=".text" id="text" name="text" rows="5" className="form-control"/>                                
                            </div>                              
                            <button type="submit" className="btn btnlg btn-primary">Submit</button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </>
            );
        }
    }

    export default CampsiteInfo;
