import React from 'react'
import{table,thead, Button} from 'react-bootstrap'
import Edit from './Edit'
class SingleProj extends React.Component{
 
  render(){
    return(
        <>
        <h2>List of Projects</h2>
      <table class="table mt-5">
<thead>
  <tr>
    <th scope="col">description</th>
    <th scope="col">liveUrl</th>
    <th scope="col">name</th>
    <th scope="col">repoUrl</th>
    <th scope="col">studentId</th>
   
   
  </tr>
</thead>
{this.props.info.map(proj =>
<tbody>
<tr>
  <td>{proj.description}</td>
  <td>{proj.liveURL}</td>
  <td>{proj.name}</td>
  <td>{proj.repoURL}</td>
  <td>{proj.studentID}</td>
  <td><Button variant = "danger" onClick ={()=> this.props.deleteProject(proj._id)}>Delete</Button></td>
  {/* <td><Edit student = {proj._id}/></td> */}
</tr>
</tbody>
  
  )}

</table>
</>
  )
  }
}



export default SingleProj