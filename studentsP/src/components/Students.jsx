import React from 'react'
import SingleStud from './SingleStud'
 



class Students extends React.Component{
    state={
        students:[]
    }

    componentDidMount = async ()=>{
        const response = await fetch ("http://localhost:3050/students")
        if(response.ok){
            const students = await response.json()
            this.setState({students:students})
        }
    }

    deleteStudent = async (_id) =>{
        const response = await fetch("http://localhost:3050/students/" + _id, {
            method: "DELETE"
        })
        if (response.ok){
            const students = await response.json()
            this.setState({students:students.map (x=> x._id !== _id)})
        }
    }
    render(){
        return(
            <SingleStud
            data = {this.state.students}
            />
        )

    }
}

export default Students