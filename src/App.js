import React, {Component} from 'react';
import  "./App.css"
import UserInformation from './UserInformation'
import { BrowserRouter, Route, Link ,Redirect} from "react-router-dom"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      oldUsers:[],
      isLoaded: false,
      value: "",
    }
  }

  componentDidMount(){
    let url = "https://api.github.com/users"
  
    fetch(url)
      .then(res => res.json())
      .then(json => {
         this.setState({
           isLoaded: true,
           users: json,
           oldUsers: json
         }) 
      });  
  }
 
  render() {
      let { oldUsers, isLoaded } = this.state
 
  
      if(!isLoaded){
        return <div>Loading...</div>;
      } else {

      const handlerInputValue = (event) =>{
        let search = this.state.users.filter( element => {
         return element.login.indexOf(event.target.value) !== -1
        })
        this.setState({ 
          oldUsers: search,
          value:event.target.value
        })
      }  
       

      const cards = oldUsers.map(element => {
  
        return ( 
        <div className="cards">
          <div className="names">
            {element.login}
          </div>
          <img className="ava" src={element.avatar_url}/>
          <Link to={`/${element.id}`}>
            <button
             className="more-information" 
            >
              more information 
            </button>
          </Link>

          <Route
            path={`/${element.id}`}
            render={(props) =>
              <UserInformation
                {...props}
                items={this.state}
                current={element}
              />
            }
          />
        </div>
        )
      })

      return (
        <BrowserRouter>
          <div className="wrapper">
            <div className = "blockCard">
                <label>
                    <input 
                      className="search"
                      type="text" 
                      value={this.state.value} 
                      onChange={handlerInputValue}
                    />
                    Search
                </label>
              {cards}
            </div>
          </div> 
          <Redirect exact from="/" to="git-users" />
        </BrowserRouter>
     
      );
    }
  }
}

export default App;
