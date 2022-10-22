import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export class EditDeptModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();        
        fetch(process.env.REACT_APP_API + 'departments/EditDepartment',{
            method:'PUT',
            headers:{
                'Accept':'*/*',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                    DepartmentId:event.target.DepartmentId.value,
                    DepartmentName:event.target.DepartmentName.value,
                    Description:event.target.Description.value
                })            
        })
        .then(res=>res.json())
        .then(result=>{            
            alert('Successfully added!');
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return(
        <div className='container'>

            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="containerd-modal-title-vcenter"
            centered>
<Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
        Edit Department
    </Modal.Title>
</Modal.Header>
<Modal.Body>
    <Row>
        <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="DepartmentId">
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control type="text" name="DepartmentId" required placeholder="DepartmentId"
                        disabled defaultValue={this.props.depid}
                    />                    
                </Form.Group>
                <Form.Group controlId="Department">
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control type="text" name="DepartmentName" required placeholder="DepartmentName"
                        defaultValue={this.props.depname}
                    />                    
                </Form.Group>
                <Form.Group controlId="Department">
                    <Form.Label>DepartmentDescription</Form.Label>
                    <Form.Control type="text" name="Description" required placeholder="DepartmentDescription"
                        defaultValue={this.props.depdescription}
                    />                    
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Edit Department
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    </Row>
</Modal.Body>

<Modal.Footer>
    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
</Modal.Footer>
            </Modal>
        </div>
    )}
}