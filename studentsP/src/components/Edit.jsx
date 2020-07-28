import React from 'react'



class Edit extends React.Component{
    state={
        editingStudent:{
            _id:'',
            name:'',
            surname:'',
            email:'',
            dateOfBirth:''
            },

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

    render(){
        return(
            
        )

    }
}