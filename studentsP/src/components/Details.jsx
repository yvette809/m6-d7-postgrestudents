import React from 'react'
import{Card,Row,Col ,Button, Container,Table,Modal,Form} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

 class Details extends React.Component {

    state = {
        student: "",
        projects:"",
        editingStudent:{
            _id:'',
            name:'',
            surname:'',
            email:'',
            dateOfBirth:''
            },
        showModal: false

    }
    

    fetchProject = async () =>{
        const id = this.props.match.params._id
        
        let response = await fetch(`http://localhost:3040/students/${id}/projects`)
        //let resp = await fetch("http://localhost:3001/students/" + id + "/projects")
        if(response.ok){
          let projects = await response.json()
          console.log("the projects are", projects)
          this.setState({
            projects: projects
          })
        }else{
          alert("something went wrong")
        }
      }

      componentDidMount = async ()=>{
        this.fetchProject()
      }
    
      fetchSingleStudent = async () =>{
        const id = this.props.match.params._id
        
        let response = await fetch("http://localhost:3040/students/" + id)
        if(response.ok){
          let student = await response.json()
          console.log("the student is", student)
          this.setState({
            student
          })
        }else{
          alert("something went wrong")
        }
      }

      componentWillMount = async ()=>{
        this.fetchSingleStudent()
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

    render() {
        return (
            <>
          <Container className = "justify-content-between">
            <Row className = "d-flex text-center  ">
       
        <Col lg ={2} >
        <Card style={{ width: '18rem' }} id = {this.state.student._id}>
  <Card.Img variant="top" src={this.state.student.image}  style = {{borderRadius:"100%"}}/>
  <Card.Body>
    <Card.Title>{this.state.student.name} <span>{this.state.student.surname}</span> </Card.Title>
    <Card.Text>
      {/* {this.state.student} */}
    </Card.Text>
    
  </Card.Body>
</Card>

<Modal
     show ={this.state.showModal}
     
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

 </Col>
      
        
            {/* <Col lg={10}>
      {this.state.projects.map(pro =>
          
     <Table striped bordered hover className = "w-80 ml-5 justify-content-between">
      <thead>
        <tr>
          <th>projectId</th>
          <th>Name</th>
          <th>Description</th>
          <th>REPOURL</th>
          <th>LiveURL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{pro._id}</td>
          <td>{pro.name}</td>
          <td>{pro.descripton}</td>
          <td>{pro.repoURL}</td>
          <td>{pro.liveURL}</td>
        </tr>
      </tbody>
    </Table>  
    
            )}
              </Col> 
          */}
            
         </Row>
         </Container>
         </>
      
        
    )
}            
    
 }

export default withRouter(Details)