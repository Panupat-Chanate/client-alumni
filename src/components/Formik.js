import React,{Component} from 'react'
import uuid from 'uuid';
// import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setRef } from '@material-ui/core';

const Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is required.'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is required.'),
  // startYear: Yup.string()
  //   .oneOf(
  //     ['2560', '2561', '2562', '2563'],
  //     'Invalid start year'
  //   )
  //   .required('Required'),
  });

export default class AlumniForm extends Component{
  render(){
    const handleChange = (e) => {
      setRef.startYear = e.target.value
      // if (e.target.value === '0') {
      //   console.log('0')
      // } else {
      //   console.log('1')
      // }
      
  }
    return (
      <div>
        <Formik
          initialValues={{
            id:uuid(),
            firstName: '',
            lastName: '',
            startYear: '',
            idStudent1: '',
            idStudent2: ''
          }}
          validationSchema={Schema}
          onSubmit={values => {
            console.log(values);
            // var file = this.state.selectedFile;
            // console.log(file)
            const fd = new FormData();
            // fd.append("Image", file);
            fd.append("id", values.id);
            fd.append("firstName", values.firstName);
            fd.append("lastName", values.lastName);
            const config = {
              headers: {
                'content-type': 'multipart/form-data'
              }
            };
            // axios.post("/upload",fd,config)
            //   .then((response) => {
            //     alert("uploaded");
            //   }).catch((error) => {
            // });
          }}
        >
        {({ errors, touched, values }) => (
          <Form>
            <div className="form-group">
              <Field
                name="firstName"
                type="text"
                className={`form-control ${touched.firstName ? errors.firstName ? 'is-invalid' : 'is-valid' : ''}`}
                id="firstName"
                placeholder="ชื่อ"
              />
              <ErrorMessage component="div" name="firstName" className="invalid-feedback" />
          </div>
            
          <div className="form-group">
            <Field
                name="lastName"
                type="text"
                className={`form-control ${touched.lastName ? errors.lastName ? 'is-invalid' : 'is-valid' : ''}`}
                id="lastName"
                placeholder="นามสกุล"
            />
            <ErrorMessage component="div" name="lastName" className="invalid-feedback" />
          </div>
              
          <div className="form-group">
            <select label="startYear" name="startYear" onChange={handleChange}
             className={`form-control ${touched.startYear ? errors.startYear ? 'is-invalid' : 'is-valid' : ''}`}>
              <option value="0">ปีที่เข้าศึกษา</option>
              <option value="2560">2560</option>
              <option value="2561">2561</option>
              <option value="2562">2562</option>
              <option value="2563">2563</option>
            </select>
            <ErrorMessage component="div" name="startYear" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <Field
                name="idStudent1"
                type="text"
                className={`form-control ${touched.idStudent1 ? errors.idStudent1 ? 'is-invalid' : 'is-valid' : ''}`}
                id="idStudent1"
                placeholder="XX"
                value={values.startYear}
            />
            <ErrorMessage component="div" name="idStudent1" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <Field
                name="idStudent2"
                type="text"
                className={`form-control ${touched.idStudent2 ? errors.idStudent2 ? 'is-invalid' : 'is-valid' : ''}`}
                id="idStudent2"
                placeholder="XX-XX-XXXX"
            />
            <ErrorMessage component="div" name="lastName" className="invalid-feedback" />
          </div>
          
          <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
        </Form>
        )}
          </Formik>               
      </div>
    )
  }
}