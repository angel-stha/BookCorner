import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {NavLink, Route, Switch} from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      Search: "",
      searchItems: [],
      searchItem: {},
      commentItems: [],

    };
  }

  onSubmitHandler = event => {
    // <NavLink to='/Search'> </NavLink>
    var data = {
      search: this.state.Search
    };
    console.log(this.state.Search);
    axios
      .get("http://localhost:3302/searchbooks", {
        params: {
          search: this.state.Search
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ searchItems: res.data });
        window.result = res.data;
        console.log(window.result);
      })
      .catch(error => {
        console.log("Error");
      });
      this.props.history.push('/search');

      console.log(this.props.history.location);

  };
  viewComment=(title, author)=>{
    axios
      .get("http://localhost:3302/viewComment", {
        params: {
          Title:title,
          Author:author
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ commentItems: res.data });
      })
      .catch(error => {
        console.log("Error");
      });

  };
  logout=(e)=>{
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <br />
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Readers Corner</Navbar.Brand>
          <Nav className="mr-auto">

            <NavLink to="/book">
              <Nav.Link href="#book">Books</Nav.Link>

            </NavLink> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;

            <NavLink to="/user-profile">
              <Nav.Link href="#usersprofile">Users</Nav.Link>
            </NavLink> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <NavLink to="/my-profile">
               <Nav.Link href="#myprofile">Profile</Nav.Link>
            </NavLink>
          </Nav>
          <div className="right">
          <Form inline>
            <FormControl
              placeholder="Search"
              value={this.state.Search}
              onChange={e => this.setState({ Search: e.target.value })}
              className="mr_sm-2"
            />

            <Button variant="outline-light" onClick={this.onSubmitHandler}>
              Search
            </Button>

          </Form>
          </div>
        </Navbar>


        <div><button onClick={this.logout}>Logout</button></div>
        { this.props.history.location.pathname === "/search" && <div className = 'SearchOutput' >
              <div className="searchhead search" >
                      <div>Title</div>
                      <div>Author</div>
              </div>
          {this.state.searchItems.map((item, index) => {
            console.log(item);
            return (
              <div className="search" >
                <div>{item.Title}</div>
                <div>{item.Author}</div>

               <div><button
               onClick={() => this.viewComment(item.Title, item.ISBN)}>
                 View Comment</button></div>
                 </div>
            );
          })}
        </div>}
        { this.props.history.location.pathname === "/search" && <div className = 'SearchOutput' >

      {this.state.commentItems.map((item, index) => {
        console.log(item);
        return (
          <div className="comment" >

            <div>By:{item.by}</div>

            <div>{item.Comments}</div>
  </div>
        )
      })}
      </div>
    }
      </div>

    );
  }
}
export default withRouter(Home);
