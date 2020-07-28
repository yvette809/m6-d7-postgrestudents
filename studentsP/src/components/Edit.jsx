import React from 'react'
import {Modal,Form, Button} from 'react-bootstrap'


class Edit extends React.Component{
    state={
        editingStudent:{
            _id:'',
            name:'',
            surname:'',
            email:'',
            dateOfBirth:''
            },
        showModal: false

        
    }

    editStudent = async () =>{
        const update = this.state.editingStudent
   

    const studsResp = await fetch("http://localhost:3040/students/" + this.state.editingStudent._id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    })
    const student = await studsResp.json()
    console.log(student)
    this.setState({
        editingStudent:{
            _id:this.state.editingStudent._id,
            name:this.state.editingStudent.name,
            surname:this.state.editinStudent.surname,
            email:this.state.editingStudent.email,
            dateOfBirth:this.state.editingStudent.dateOfBirth
            },
    })
   
    }

    handleChange = (e)=> {
        let editingStudent = this.state.editingStudent
        console.log(e.currentTarget)
        let currentId = e.currentTarget.id
        editingStudent[currentId]= e.currentTarget.value
        this.setState({editingStudent})
      }

    render(){
        return(
           <>
            <Modal
     show ={this.state.showModal}
     
      // onHide = {() => this.setState({selected:!this.state.showModal})}
      >
  <Modal.Header closeButton  onClick={() => this.setState({showModal:false})} className = 'mr-5 justify-content-end'>
    <Modal.Title>Students</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <div>
      <h5>Edit Student</h5>
    </div>
    <div>
    <Form onSubmit = {this.editStudent}>
    <Form.Control 
    type="text"
    name="name" 
    id = "name"
    placeholder="Enter name"
    value = {this.state.editingStudent.name}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="text" 
    id = "surname"
    placeholder="Enter surname"
    value = {this.state.editingStudent.surname}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="email" 
    id = "email"
    placeholder="Enter email"
    value = {this.state.editingStudent.email}
    onChange= {this.handleChange}
    />
    <Form.Control 
    type="Date" 
    id = "dateOfBirth"
    placeholder="Choose Date Of Birth"
    value = {this.state.editingStudent.dateOfBirth}
    onChange= {this.handleChange}
    /> 
  <Button variant="primary" type="submit" onClick = {this.editStudent}>
    Submit
  </Button>
</Form>
    </div>
  </Modal.Body>
</Modal>
<Button onClick={() => this.setState({showModal:true})}> Edit Student</Button>
</>

        )

    }
}


export default Edit