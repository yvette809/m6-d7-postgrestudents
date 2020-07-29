import React from 'react'
import{table,thead, Button} from 'react-bootstrap'
import Edit from './Edit'
import {Link} from 'react-router-dom'
class SingleStud extends React.Component{
 
  render(){
    return(
     
      <ul className= "col-sm-4">
        {this.props.data.map(stud => 
        <>
        <Link ><div><h2>{stud.name}</h2></div></Link>
         <img src={stud.image} alt="book image" className= "mb-4"/>
         <Button variant = "danger" onClick ={()=> this.props.deleteStudent(stud._id)}>Delete</Button>
        
          </>
          )}
      </ul>
      
    
//       <table class="table">
// <thead>
//   <tr>
//     <th scope="col">_id</th>
//     <th scope="col">Name</th>
//     <th scope="col">Surname</th>
//     <th scope="col">Email</th>
//     <th scope="col">Date of Birth</th>
   
   
//   </tr>
// </thead>
// {this.props.data.map(stud =>
// <tbody>
// <tr>
//   <td>{stud._id}</td>
//   <Link to={`/details/${stud._id}`}><td>{stud.name}</td></Link>
//   <td>{stud.surname}</td>
//   <td>{stud.email}</td>
//   <td>{stud.dateOfBirth}</td>
//   <td><Button variant = "danger" onClick ={()=> this.props.deleteStudent(stud._id)}>Delete</Button></td>
//   {/* <td><Edit student = {stud._id}/></td> */}
// </tr>
// </tbody>
  
//   )}

// </table>

  )
  }
}



export default SingleStud