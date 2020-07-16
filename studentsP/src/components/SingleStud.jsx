import React from 'react'
import{table,thead, Button} from 'react-bootstrap'

function  SingleStud (props){
    return(
        <table class="table">
  <thead>
    <tr>
      <th scope="col">_id</th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col">Email</th>
      <th scope="col">Date of Birth</th>
     
    </tr>
  </thead>
  {props.data.map(stud =>
  <tbody>
  <tr>
    <th>{stud._id}</th>
    <td>{stud.name}</td>
    <td>{stud.surname}</td>
    <td>{stud.email}</td>
    <td>{stud.dateofbirth}</td>
    <td><Button variant = "danger" onClick ={()=> props.deleteStudent(stud._id)}>Delete</Button></td>
    <td><Button onClick = {()=>this.editStudent}>Edit</Button></td>
  </tr>
</tbody>
    
    )}
  
</table>
    )
}



export default SingleStud