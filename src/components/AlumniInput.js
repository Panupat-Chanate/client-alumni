import React,{Component} from 'react';
import uuid from 'uuid';
import axios from 'axios';
// import AlumniForm from './AlumniForm';

export default class AlumniInput extends Component{
  constructor() {
    super();
    this.state={
      id:uuid(),
      firstName:"",
      lastName:"",
      selectedFile:"",
      startYear:"",
      idStudent1:"",
      idStudent2:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSubmit=(e)=>{
    // e.preventDefault();
    var file = this.state.selectedFile;
    // var data = JSON.stringify({
    //   id: this.state.id,
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName
    // })
    console.log(file)
    const fd = new FormData();
    fd.append("Image", file);
    fd.append("id", this.state.id);
    fd.append("firstName", this.state.firstName);
    fd.append("lastName", this.state.lastName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("/upload",fd,config)
      .then((response) => {
        alert("uploaded");
      }).catch((error) => {
    });

    console.log(this.state)

    // axios({
    //   url: "/img/upload",
    //   method: "POST",
    //   header: {authorization: "your token"},
    //   data: fd
    // });
    
    // axios.post("/api/signup", data)
    //   .then((response) => {
    //       alert("json");
    //   }).catch((error) => {
    // });

    // fetch('/img/upload' , {
    //   method: "POST",
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // })
    // .then((result) => result.json())
    // .then((info) => { console.log(info); })
   
    this.setState({
      firstName:"",
      lastName:"",
      id:uuid(),
      [e.target.id]:"",
      selectedFile:""
    });
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  selectChange=(e)=>{
    if (e.target.value === "285") {
      this.setState({
        idStudent1: "กรุณาเลือกปีที่เข้าศึกษา"
      });
    } else {
      this.setState({
        startYear: e.target.value,
        idStudent1: e.target.value - 2500
      });
    }
  }

  handleSelect = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    });
  }

  render(){
    return(
      <div className="card card-body my-3">
        {/* <AlumniForm
        arrays={this.state.arrays}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        selectChange={this.selectChange}
        handleSelect={this.handleSelect}>
        </AlumniForm> */}
      </div>

      // <div className="card card-body my-3">
      //     <form onSubmit={this.handleSubmit}>
      //       <div className="form-group">
      //         <h1 align='center'>Frontend</h1>
      //         <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="ชื่อ"></input><br/>
      //         <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="นามสกุล"></input><br/>
      //         <select value={this.state.value} onClick={this.selectChange}>
      //           <option value="285">---ปีที่เข้าศึกษา---</option>
      //           <option value="2560">2560</option>
      //           <option value="2561">2561</option>
      //           <option value="2562">2562</option>
      //           <option value="2563">2563</option>
      //         </select>
      //         <p></p>
      //         <input type="text" className="" value={this.state.idStudent1} readOnly></input>
      //         <input type="text" className="" id="idStudent2" value={this.state.idStudent2} onChange={this.handleChange} placeholder="XXXXXXXX"></input>
      //         <p></p>
      //         {/* <input type="email" className="form-control" id="email" onChange={handleChange} placeholder="อีเมล"></input><br/>
      //         <input type="text" className="form-control" id="career" onChange={handleChange} placeholder="อาชีพ"></input><br/>
      //         <input type="text" className="form-control" id="company" onChange={handleChange} placeholder="สถานที่ทำงาน"></input> */}
      //         <input type="file" name="myImage" onChange={this.handleSelect}></input>
      //       </div>
      //       <input type="submit"></input>
      //     </form>
      // </div>
    )
  }
}