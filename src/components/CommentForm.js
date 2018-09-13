import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(values) {
      this.toggle();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

    render() {
        return (
          <div>
            <Button color="white" onClick={this.toggle}>Submit Comment</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                   <Label htmlFor="rating" md={2}>Rating</Label>
                   <Col md={10}>
                     <Control.select model=".rating" name="rating" className="form-control">
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                       <option>5</option>
                     </Control.select>
                   </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="author" md={2}>Author</Label>
                    <Col md={10}>
                      <Control.text model=".author" id="author" name="author"
                        placeholder="author" className="form-control" 
                        validators={{
                          required, minLength: minLength(3), maxLength: maxLength(15)
                      }} />
                      <Errors
                              className="text-danger" model=".author" show="touched"
                               messages={{
                                  required: 'Required',
                                  minLength: 'Must be greater than 2 characters',
                                  maxLength: 'Must be 15 characters or less'
                                }} 
                        />
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="comments" md={2}>Your Comment</Label>
                    <Col md={10}>
                       <Control.textarea model=".comment" id="comment" name="comment"
                           rows="6" className="form-control" />
                    </Col>
                  </Row>
                  <Row className="form-group">
                     <Col md={{size:10, offset: 2}}>
                       <Button type="submit" color="primary">Submit</Button>
                     </Col>
                  </Row>
                </LocalForm>
              </ModalBody>
              
            </Modal>
          </div>
        );
      }
}

export default CommentForm;