import React, {Component} from 'react';
import AlumniForm from './components/AlumniForm';
import Navbar from './components/navbar'
import Footer from './components/footer'
export default class App extends Component{
  render () {
    return (
    <div>
      <Navbar></Navbar>
      <AlumniForm />
      <Footer></Footer>
    </div>
    );
  }
}