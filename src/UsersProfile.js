import React,{Component} from 'react';
import axios from 'axios';
import './Homepage.css';
import Input from './component/input/input'

class UserProfile extends Component{
    constructor(props) {
        super();
        this.state = {


            users: [],

        };

    }
    Ping=(title, author,comment,date)=>{

        var data={
            Review:comment,
            Title:title,
            Author:author,
            Date:date,
        }
        if (comment=" "){
            alert("Empty review!! not valid")
            window.location.reload();
        }
        else {
            axios.post('http://localhost:3302/addReview', data)
                .then(res => {
                    console.log(comment);
                    console.log(res.data);
                    if (res.data == 'Comment Added') {
                        alert('Review added on' + ' ' + 'book' + ' ' + title);
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log("Error");
                });
        }
    }


    componentDidMount(){
        axios.get("http://localhost:3302/getusers")
            .then(res=>{


                this.setState({users:res.data});
                window.result = res.data;
                console.log(window.result);
            })
        this.props.history.push('/user-profile');

        console.log(this.props.history.location);

    }
    onChange = date => this.setState({ date })
    render(){

        return(
            <div>

                { this.props.history.location.pathname === "/user-profile" && <div className = 'SearchOutput' >
                    <div className="searchhead search" >
                        <div>Name</div>
                        <div> Ping</div>
                        <div></div>
                    </div>
                    {this.state.users.map((item, index) => {
                        console.log(item);
                        return (
                            <div className="search" >
                                <div>{item.name}</div>
                                <div>
                                <button onClick={() => this.Ping(item.name,)}>
                                        Ping</button></div>


                            </div>


                        );

                    })}
                </div>
                }


            </div>

        );
    }
}
export default UserProfile;