import React,{Component} from 'react';

export default class AlumnOutput extends Component{
  constructor() {
    super();
    this.state = {
      datanames: []
    }
  }

  componentDidMount() {
    fetch('/user')
    .then(res => res.json())
    .then(datanames => this.setState({datanames}, () => console.log('Datanames fetched', datanames)));
  }

    render(){
        return(
            <div className="card card-body my-3">
              <h1 align='center'>Backend</h1>
              <ul>
                {this.state.datanames.map(data => 
                  <li key = {data._id}>
                    {data.firstName}
                    {"  "}
                    {data.lastName}
                  </li>  
                )}
              </ul>
            </div>
        )
    }
}