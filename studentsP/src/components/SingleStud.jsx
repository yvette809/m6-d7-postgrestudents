import React from 'react'
import{table,thead, Button} from 'react-bootstrap'
import Edit from './Edit'
class SingleStud extends React.Component{
 
  render(){
    return(
      <table class="table">
<thead>
  <tr>
    <th scope="col">_id</th>
    <th scope="col">Name</th>
    <th scope="col">Surname</th>
    <th scope="col">Email</th>
    <th scope="col">Date of Birth</th>
    <th scope="col">projects</th>
   
  </tr>
</thead>
{this.props.data.map(stud =>
<tbody>
<tr>
  <th>{stud._id}</th>
  <td>{stud.name}</td>
  <td>{stud.surname}</td>
  <td>{stud.email}</td>
  <td>{stud.dateOfBirth}</td>
  <td>{stud.projects.slice(0,5)}</td>
  <td><Button variant = "danger" onClick ={()=> this.props.deleteStudent(stud._id)}>Delete</Button></td>
  <td><Edit/></td>
</tr>
</tbody>
  
  )}

</table>
  )
  }
}



export default SingleStud