import React from 'react'
import SingleStud from './SingleStud'
import{Row,Button} from 'react-bootstrap'
import SingleProj from './SingleProj'
 



class Home extends React.Component{
    state={
        students:[],
        projects:[],
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

    // get all projects
    fetchProjects = async()=>{
        const response = await fetch (`http://localhost:3040/projects`)
        if(response.ok){
            const projects = await response.json()
            this.setState({projects:projects.data})
        }else{
            alert('something went wrong')
        }
    }

    componentWillMount = async ()=>{
       await this.fetchProjects()
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

    deleteProject = async (_id) =>{
        const response = await fetch("http://localhost:3040/projects/" + _id, {
            method: "DELETE"
        })
        if (response.ok){
            //this.props.removeStudent(_id)
            //const students = await response.json()
            this.setState({projects:this.state.projects.filter(x => x._id !== _id)})
        }else{
            alert('cannot delete project')
        }
    }

    

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
            <SingleProj 
            info= {this.state.projects}
            deleteProject ={(_id)=> this.deleteProject(_id)}

              />
            </>
        )

    }
}

export default Home