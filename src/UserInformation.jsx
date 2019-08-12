
import React, {Component} from 'react';


class UserInformation extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInf:[],
    }
  }

  componentDidMount(){
    let url = this.props.current.url
  
    fetch(url)
      .then(res => res.json())
      .then(json => {
         this.setState({
          userInf: json,
         }) 
      });  
  }
  
  
  render() {
    console.log(this.props)
   const { userInf } = this.state
   const { toggle } = this.props.items

      if (toggle){
        return null;
      }else {
        return (
          <div className="UserInformation">
            <div className="info">
              {
                userInf.location === null ?
                null :
                <span >
                  {`Location: ${userInf.location}`}
                </span>    
              }
              {
                userInf.login === null ?
                null :
                <span >
                  {`Login: ${userInf.login}`}
                </span>    
              }
              {
                userInf.name === null ?
                null :
                <span >
                  {`Name: ${userInf.name}`}
                </span>    
              }
              <a href={userInf.html_url}>
              {`GitHub Account: ${userInf.html_url}`}
              </a>
            </div>
          </div>
        )
      }
    }
  }   

export default UserInformation;