import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import uuid from 'uuid';
import axios from 'axios';
// import Checkbox from '@material-ui/core/Checkbox';
// import Select from "react-select";
// import Input from "@material-ui/core/Input";
// import { Input as InputField } from "antd";
import { yupResolver } from '@hookform/resolvers';
import * as Yup from "yup";
// import { FormLabel } from "@material-ui/core";
import Checkpoint from './checkbox';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is required.'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('This field is required.'),
  startYear: Yup.string()
    .oneOf(
      ['2560', '2561', '2562', '2563'],
      'Invalid start year'
    )
    .required('Required'),
  idStudent2: Yup.string()
    .min(8, 'Too Short!')
    .max(8, 'Too Long!')
    .matches(/[0-9]+/ , 'ตัวเลขเท่านั้น')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required.'),
  phone: Yup.string()
    .min(10, 'Too Short!')
    .max(10, 'Too Long!')
    .matches(/[0-9]+/ , 'ตัวเลขเท่านั้น')
    .required('Required'),
  address: Yup.string()
    .required('Required'),
  position: Yup.string()
    .required('Required'),
  workplace: Yup.string()
    .required('Required'),
});

export default function App() {
    const { register, handleSubmit, setValue, errors } = useForm({
      resolver: yupResolver(schema)
    });
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const onSubmit = data => {
      var id = data.idStudent1 + data.idStudent2;
      const fd = new FormData();
      fd.append("Image", file);
      fd.append("id", uuid());
      fd.append("firstName", data.firstName);
      fd.append("lastName", data.lastName);
      fd.append("startYear", data.startYear);
      fd.append("email", data.email);
      fd.append("phone", data.phone);
      fd.append("address", data.address);
      fd.append("position", data.position);
      fd.append("workplace", data.workplace);
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
      setValue("image", null)
      setValue("firstName", null)
      setValue("lastName", null)
      setValue("startYear", null)
      setValue("idStudent1", null)
      setValue("idStudent2", null)
      setValue("email", null)
      setValue("phone", null)
      setValue("address", null)
      setValue("position", null)
      setValue("workplace", null)
    };
    const handleChange = (e) => {
        if (e.target.value === null) {
            setValue("idStudent1", "XX");
        } else {
            setValue("idStudent1", e.target.value-2500);
        }
    }
    const handleSelect = (e) => {
      const file = e.target.files[0];
      setFile(e.target.files[0]);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file"
        name="image"
        ref={register}
        onChange={handleSelect}/>
        <p>{errors.imgProfile?.message}</p>

      <input type="text"
        name="firstName"
        ref={register}
        placeholder="ชื่อ"/>
        <p>{errors.firstName?.message}</p>

      <input type="text"
        name="lastName"
        ref={register}
        placeholder="นามสกุล"/>
        <p>{errors.lastName?.message}</p>

      <select name="startYear" ref={register} onChange={handleChange}>
        <option value="">ปีที่เข้าศึกษา</option>
        <option value="2560">2560</option>
        <option value="2561">2561</option>
        <option value="2562">2562</option>
        <option value="2563">2563</option>
        <option value="2564">2564</option>
      </select>
      <p>{errors.startYear?.message}</p>

      <input type="text" 
        name="idStudent1" 
        id="idStudent1" 
        ref={register} 
        placeholder="XX" 
        readOnly/>
      <p>{errors.idStudent1?.message}</p>

      <input type="text"
        name="idStudent2" 
        id="idStudent2"
        ref={register}
        placeholder="XX-XX-XXXX"/>
      <p>{errors.idStudent2?.message}</p>

      <input type="text"
        name="email" 
        id="email"
        ref={register}
        placeholder="อีเมล"/>
      <p>{errors.email?.message}</p>

      <input type="text"
        name="phone" 
        id="phone"
        ref={register}
        placeholder="เบอร์โทรศัพท์"/>
      <p>{errors.phone?.message}</p>

      <input type="text"
        name="address" 
        id="address"
        ref={register}
        placeholder="ที่อยู่"/>
      <p>{errors.address?.message}</p>
      
      <input type="text"
        name="position" 
        id="position"
        ref={register}
        placeholder="ตำแหน่งงาน"/>
      <p>{errors.position?.message}</p>

      <input type="text"
        name="workplace" 
        id="workplace"
        ref={register}
        placeholder="สถานที่ทำงาน"/>
      <p>{errors.workplace?.message}</p>

      <Checkpoint
      register={register}>
      </Checkpoint>

      <input type="submit" />
    </form>
  );
}