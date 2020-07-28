import React from 'react'
import SingleStud from './SingleStud'
import{Row,Button} from 'react-bootstrap'
 



class Students extends React.Component{
    state={
        students:[],
        editingStudent:{
        _id:'',
        name:'',
        surname:'',
        email:'',
        dateOfBirth:''
        },
        page:0,
        pageSize:8
        
    }

   
    fetchData = async()=>{
        const response = await fetch (`http://localhost:3040/students`)
        if(response.ok){
            const students = await response.json()
            this.setState({students:students})
        }else{
            alert('something went wrong')
        }
    }

    componentDidMount = async ()=>{
       await this.fetchData()
    }


    setPage = async(page)=>{
        this.setState({
            page:page

        })
        this.fetchData()

    }

    deleteStudent = async (_id) =>{
        const response = await fetch("http://localhost:3040/students/" + _id, {
            method: "DELETE"
        })
        if (response.ok){
            //this.props.removeStudent(_id)
            //const students = await response.json()
            this.setState({students:this.state.students.filter(x => x._id !== _id)})
        }else{
            alert('cannot delete student')
        }
    }

    // editStudent = async () =>{
    //     const update = this.state.editingStudent
   

    // const booksResp = await fetch("http://localhost:3040/students/" + this.state.editingStudent._id, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(update)
    // })
    // const student = await booksResp.json()
    // console.log(student)
    // this.setState({
    //     editingStudent:{
    //         _id:this.state.editingStudent._id,
    //         name:this.state.editingStudent.name,
    //         surname:this.state.editinStudent.surname,
    //         email:this.state.editingStudent.email,
    //         dateOfBirth:this.state.editingStudent.dateOfBirth
    //         },
    // })
   
    // }



    render(){
        return(
            <>
            <Row className = "my-4 justify-content-center">
            {this.state.page>0 &&<Button variant= "success" onClick = {()=> this.setPage(this.state.page-1)}>1</Button>}
            <Button variant= "success" onClick = {()=> this.setPage(this.state.page+1)}>2</Button>
            </Row>
            <SingleStud
            data = {this.state.students}
            deleteStudent = {(_id) => this.deleteStudent(_id)}
            // editStudent={this.editStudent}
            />
            </>
        )

    }
}

export default Students