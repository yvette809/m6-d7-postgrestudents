import React from 'react'
import {Navbar, Nav, FormControl, Button, Form} from 'react-bootstrap'
import{Link, withRouter} from "react-router-dom"

 class Navigation extends React.Component {

    state ={
        search:""
    }

    showSearchResult = async(searchQuery) => {
        let response = await fetch ("http://localhost:3040/students?name=" + searchQuery)
        if(response.ok){
            let searchItem = await response.json()
            console.log(searchItem)
            this.setState({search: searchItem})
        }
    }

    searchStringHandler = (e) =>{
        if(e.keyCode=== 13){
            this.showSearchResult(this.state.search)
        }else{
            this.setState({search:e.currentTarget.value})
        }
    }
    
   

    render() {
        return (

           
    <Navbar bg="light" expand="lg" className = "mb-3">
  <Navbar.Brand href="#home">Stud-Portfolio</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link  className = "nav-link" to="/">Home</Link>
      <Link className = "nav-link" to="/Details{this.state.search._id}">Details</Link>
    </Nav>
    <Form inline>
      <FormControl 
      type="text"
      placeholder="Search"
      className="mr-sm-2" 
      onKeyDown = {this.searchStringHandler}
      onChange= {this.searchStringHandler}
      value= {this.state.search}
        
        />
      <Button variant="outline-success" onClick = {this.showSearchResult}>Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        )
    }
}

export default withRouter(Navigation)