import React from 'react'
 



class Students extends React.Component{
    state={
        students:[]
    }

    componentDidMount = async ()=>{
        const response = await fetch ("http://localhost:3000/students")
    }
    render(){

    }
}