import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Input from './component/input/input';
import './Homepage.css'
import { withRouter } from "react-router-dom";

class MyProfile extends Component{
    constructor(props) {
        super();
        this.state = {


            items: [],
            Issued: [],
            name :''
        };

    }


    Logout=(e)=>{
        localStorage.clear();
        window.location.reload();
    }

    componentDidMount() {

        axios.post("http://localhost:3302/getmydata",)
            .then(res => {
                console.log(res.data);
                console.log("Nirva")
                this.setState({items: res.data});
                console.log(this.state.items);
            })
    }


    render(){

        return(
            <div className="an">

                <div className="name"> Name:&nbsp;&nbsp;{ this.props.username}</div>
                <br/>
                <br/>
                <div className="searchhead search" >
                    <div>Title</div>
                    <div>Author</div>
                    <div>Comments</div>

                </div>
                {this.state.Issued.map((item, index) => {
                    console.log(item);
                        return (
                            <div className="search" >
                                <div>{item.ISBN}</div>
                                <div>{item.Title}</div>
                                <div>{item.Barcode}</div>
                                <div>{item.Issuedby}</div>

                            </div>
                        )
                    }

                )

                }
                <br/>
                <br/>
                <NavLink to='/change-password'>Change Password</NavLink>
                <br/>
                <br/>
                <button className="button5" onClick={this.Logout}>Logout</button>


            </div>



        )
    }
}
export default withRouter(MyProfile);