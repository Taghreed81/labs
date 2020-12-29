import React, { Component } from 'react';
import axios from "axios";
import { post } from 'jquery';
// import Search from "./search";
// import { Router} from "react-router-dom";


const Post = (props) => (

  <tr>
    <td>{props.item.testType}</td>
    <td>{props.item.price}</td>
    <td>
      <img
        src={props.item.image}
        width="200"
        height="200"
        class="w3-round"
        alt="Norway"
      />
    </td>
  
  
 </tr>

);


class AllLabs extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      items: [],
      filteredItems: [],
      SearchString: '',
    };
   
  }
  componentDidMount() {  
     axios.get('http://127.0.0.1:3000/addItems/') 
       .then(response => { this.setState({ items: response.data })})     
        .catch((error) => {    
              console.log(error);  
                  }) 
                 }
  
 lab() {  
  let listedItems = (this.state.filteredItems.length > 0)? this.state.filteredItems : this.state.items;  
    return listedItems.map(currentItem => {     
             return <Post item={currentItem} 
             key={currentItem._id} />    })  }

  onSearch = e => {
     let { items } = this.state
     let string = e.target.value
     if(string.length > 0){
       let filteredItems = items.filter(item => item.testType.includes(string))
        this.setState({SearchString:string,filteredItems:filteredItems})
            }
           else this.setState({SearchString:string,filteredItems:[]})
          }

  render() {
   
    return (
      <div>
        <br />
        <div className="container text-center border border-light p-9">
        <h2>Search loaction</h2>
          <input
            name="search"
            className="form-control"
            onChange={(e) => this.onSearch(e)}
            value={this.state.SearchString}
            placeholder="Search for test type"
          />
          
          <table className="table">
          {/* <tbody>{this.inputsList()}</tbody> */}
            <tbody>{this.lab()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default AllLabs;
