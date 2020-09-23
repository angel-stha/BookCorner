import React, { Component } from 'react'
import axios from 'axios';
import Input from './component/input/input'
import "./Homepage.css";
import { Redirect } from 'react-router';


class Login extends Component {
    constructor(props) {
        super( );
        this.state = {
            name: "",
            pass: "",
        };
    }

    StudentHandler = (e) => {
        var data = {
            name: this.state.name,
            pass: this.state.pass,
        };

        axios.post('http://localhost:3302/login', data)
            .then(res => {
                console.log(res.data);
                if (res.data = this.state.name) {
                    alert('WELCOME To READERS CORNER');
                    this.setState({redirect: true});



                }
                else{
                    this.setState({redirect: false});
                    alert('Username or password donot match');
                }
            })



    }


    render() {

        if (this.state.redirect) {
            return (
                <Redirect push to="/home"/>
            )
        }
        return (

            <div className='s'>
                <div className="main"><h1>READERS CORNER</h1></div>
                <div className="stdlogin">
                    <div className="std"> LOGIN</div>
                    <div className="names">
                        Full Name
                        <Input
                            inputSize="inputSall"
                            type="text"
                            value={this.state.name}
                            changed={e => this.setState({name: e.target.value})}
                        />
                    </div>
                    <br></br>
                    <div className="names">
                        Password
                        <Input
                            inputSize="inputSall"
                            type="text"
                            value={this.state.pass}
                            changed={e => this.setState({pass: e.target.value})}
                        />
                    </div>
                    <button class="button button5" onClick={this.StudentHandler}>LOGIN</button>
                </div>
                <div className="description">
                    <div className="std">ABOUT </div>
                    <p className="about"> Welcome to Readers Corner.
                        <br/>
                        Login and review books you have read.
                        Add new books and get others' opinion. Get insights with reviews  on differet books. Get started now!!!!!!!!!!</p>

                </div>


                }
            </div>
        )
    }
}
export default Login;