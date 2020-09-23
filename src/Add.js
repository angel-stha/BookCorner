 import React, { Component } from 'react'
 import axios from 'axios';
 import './App.css';
 import Input from './component/input/input';




 class Form extends Component{
     constructor(props){
         super();
         this.state ={
             Title: "",
             Author: "",
             Review:"",
             date:new Date()
         };
     }
     onSubmitHandler=(event)=>{
         var data={

             Title:this.state.Title,
             Author:this.state.Author,
             Review: this.state.Review,

         }
         console.log(data)
         axios.post('http://localhost:3302/addbook',data)
             .then(res => {
                 console.log(res.data);
                 if (res.data="Book Already in the Stack please review there"){
                     alert("Book is already in stack please review  there")
                 }
                 else {
                     this.props.history.push('/add-book')
                     window.location.reload();
                     alert(' New Book' + ' ' + this.state.Title + ' ' + 'added');
                 }
             })
             // .catch((error) => {
             //     console.log("Error");
             //     alert('error in adding');
             // });
     }
     onChange = date => this.setState({ date })
     render() {
         return (
             <div className="App body an">
                 <div className="an">
                     <div className="left an">
                         <h1 className="Header an">ADD BOOK</h1>

                         <div>
                             <Input
                                 inputSize="inputSmall"
                                 type="text"
                                 placeholder='Title'
                                 value={this.state.Title}
                                 changed={e=>this.setState({Title:e.target.value})}
                             />
                         </div>
                         <div>
                             <Input
                                 inputSize="inputSmall"
                                 type="text"
                                 placeholder='Author'
                                 value={this.state.Author}
                                 changed={e => this.setState({ Author: e.target.value })}
                             />

                         </div>
                         <div>
                             <Input
                                 inputSize="inputSmall"
                                 type="text"
                                 placeholder='Review'
                                 value={this.state.Review}
                                 changed={e => this.setState({ Review: e.target.value })}
                             />

                         </div>



                         <br/>
                         <br/>
                         <button class="button2 button5"onClick={this.onSubmitHandler}>ADD</button>
                     </div>

                 </div>
             </div>


         );
     }
 }

 export default Form;