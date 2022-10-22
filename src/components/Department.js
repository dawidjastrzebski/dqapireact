import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddDeptModal } from './AddDepModal';
import { EditDeptModal } from './EditDepModal';


export class Department extends Component {

    constructor (props){
            super(props);
            this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API + 'departments/getalldepartments')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        //console.log("UPDATED -- COMPONENT");
        this.refreshList();
    }

    render(){
        const {deps, depid, depname, depdescription}=this.state;

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return (            
            <div>
                <Table className='mt-4' striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Department Name</th>
                            <th>Description</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>{dep.Description}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,depid:dep.DepartmentId, depname:dep.DepartmentName, depdescription:dep.Description})}>
                                        Edit
                                    </Button>
                                    <EditDeptModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    depid={depid}
                                    depname={depname}
                                    depdescription={depdescription}></EditDeptModal>
                                </ButtonToolbar>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='prmiary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Department
                    </Button>
                    <AddDeptModal show={this.state.addModalShow}
                    onHide={addModalClose}>

                    </AddDeptModal>
                </ButtonToolbar>
            </div>
        )
    }

}