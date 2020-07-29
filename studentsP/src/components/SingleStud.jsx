import React from 'react'
import{table,thead, Button} from 'react-bootstrap'
import Edit from './Edit'
class SingleStud extends React.Component{
 
  render(){
    return(
      <>
     <div><h2>List of Students</h2></div>
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
{this.props.data.map(stud =>
<tbody>
<tr>
  <td>{stud._id}</td>
  <td>{stud.name}</td>
  <td>{stud.surname}</td>
  <td>{stud.email}</td>
  <td>{stud.dateOfBirth}</td>
  <td><Button variant = "danger" onClick ={()=> this.props.deleteStudent(stud._id)}>Delete</Button></td>
  {/* <td><Edit student = {stud._id}/></td> */}
</tr>
</tbody>
  
  )}

</table>
</>
  )
  }
}



export default SingleStud