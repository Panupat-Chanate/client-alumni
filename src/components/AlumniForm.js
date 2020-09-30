import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../App.css';
import NativeSelect from '@material-ui/core/NativeSelect';

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required('ป้อนชื่อ')
    .min(2, 'สั้นเกินไป')
    .max(30, 'ยาวเกินไป'),
  lastName: Yup.string()
    .required('ป้อนนามสกุล')
    .min(2, 'สั้นเกินไป')
    .max(30, 'ยาวเกินไป'),
  // startYear: Yup.string()
  //   .required('required')
  //   .oneOf(
  //     ['2556', '2557', '2558', '2559', '2560', '2561', '2562', '2563'],
  //     'เลือกปีที่เข้าศึกษา'
  //   ),
  idStudent1: Yup.string()
    .required('เลือกปีที่เข้าศึกษา'),
  idStudent2: Yup.string()
    .required('ป้อนรหัสนักศึกษา')
    .matches(/[0-9]+/ , 'ตัวเลขเท่านั้น')
    .min(8, 'กรอกรหัสนักศึกษาให้ครบ')
    .max(8, 'รหัสนักศึกษาควรมี10หลัก'),
  email: Yup.string()
    .required('ป้อนอีเมล')
    .email('ป้อนอีเมลที่ถูกต้อง'),
  phone: Yup.string()
    .required('ป้อนเบอร์โทรศัพท์')
    .matches(/[0-9]+/ , 'ตัวเลขเท่านั้น')
    .min(10, 'ห้ามต่ำกว่า 10 ตัว')
    .max(10, 'ห้ามเกิน 10 ตัว'),   
  address: Yup.string()
    .required('ป้อนที่อยู่'),
  position: Yup.string()
    .required('ป้อนตำแหน่งงาน'),
  workplace: Yup.string()
    .required('ป้อนสถานที่ทำงาน'),
  // file: Yup.mixed()
  //   .test("type", "ไฟล์รูปภาพเท่านั้น", (value) => {
  //     return value && value[0].type === "image/jpeg";
  //   })
  //   .test("fileSize", "ไฟล์ขนาดใหญ่เกินไป", (value) => {
  //     return value && value[0].size <= 200;
  //   }),
    
  // file: Yup.mixed()
  //   .required("req")
  //   .test('fileSize', 'รูปภาพขนาดใหญ่เกินไป', (value) => {
  //     console.log(value); return value[0].size <= 2000000
  //   })
  // image: Yup.mixed()
  //   .required("กรุณาอัพโหลดรูปโปรไฟล์")
    // .test("type", "ไฟล์รูปเท่านั้น", (value) => {
    //   return value && value[0].type === "image/jpeg";
    // }),
  // file: Yup.mixed()
  //   .required('A file is required')
  //   .test('fileFormat', 'รูปภาพเท่านั้น', (value) => {
  //     console.log(value); return value && ['application/jpeg'].includes(value.type);
  // }),
  //   file: Yup.object().shape({
  //     name: Yup.string().required()
  // }).required('File required').nullable ()
});

export default function AlumniForm() {
    const { register, handleSubmit, setValue, errors } = useForm({
      resolver: yupResolver(schema)
    });
    const [file, setFile] = useState('');
    // const [filename, setFilename] = useState('Choose File');

    const onSubmit = data => {
      console.log(data)
      console.log(state.startYear)
      if (file === null) {
        console.log("null")
        this.formRef.setErrors({
          username: 'Error message'
        })
      }
      var value = {
        checkId: data.idStudent1 + data.idStudent2
      }
      axios.post('/check', value)
        .then((response) => {
          var checkedState = response.data.checkedState
          if (checkedState === true) {
            console.log(checkedState);
          }
          if (checkedState === false) {
            console.log(checkedState);
            if (data.degree2 === undefined)  {
              data.degree2 = "";
            }
            if (data.degree3 === undefined) {
              data.degree3 = "";
            }
            if (data.degree2 & data.degree3 === undefined) {
              data.degree2 = "";
              data.degree3 = "";
            }
            const fd = new FormData();
            fd.append("Image", file);
            fd.append("id", value.checkId);
            fd.append("firstName", data.firstName);
            fd.append("lastName", data.lastName);
            fd.append("startYear", state.startYear);
            fd.append("email", data.email);
            fd.append("phone", data.phone);
            fd.append("address", data.address);
            fd.append("position", data.position);
            fd.append("workplace", data.workplace);
            fd.append("degree1", data.degree1);
            fd.append("degree2", data.degree2);
            fd.append("degree3", data.degree3);
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
            setValue("startYear", "0")
            setValue("idStudent1", null)
            setValue("idStudent2", null)
            setValue("email", null)
            setValue("phone", null)
            setValue("address", null)
            setValue("position", null)
            setValue("workplace", null)
            setValue("degree1", null)
            setValue("degree2", null)
            setValue("degree3", null)
            setState({
              ปริญญาตรี: true,
              ปริญญาโท: false,
              ปริญญาเอก: false,
              startYear: ''
            });
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    const handleChange = (e) => {
      setState({...state, [e.target.name]: e.target.value,
      });
      if (e.target.value === "0") {
        setValue("idStudent1", "");
        setValue("degree1", "");
      } else {
        setValue("idStudent1", e.target.value-2500);
        if (e.target.value <= "2558") {
          setValue("degree1", "คอมพิวเตอร์อุตสาหกรรม");
        } else {
          setValue("degree1", "วิศวกรรมคอมพิวเตอร์");
        }
      }
    }

    const handleSelect = (e) => {
      setFile(e.target.files[0]);
    }

    //M-ui
    const theme = createMuiTheme({ 
      typography: { 
        "fontFamily": `"Prompt", sans-serif`,
        "fontSize": 16,
      },
      palette: {
        primary: {
          main: '#343a40',
        },
        secondary: {
          main: "#2690a4",
          //dc004e
        },
        action: {
          // selected: '#ff0000',
          hover: '#ff0000',
        }
      },
    })
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      formControl: {
        margin: theme.spacing(1),
      },
      formSelect:{
        margin: theme.spacing(0),
        minWidth: 301,
        width: 350,
      },
      // select: {
      //   "&$selected:hover": {
      //     backgroundColor: "#ffddec",
      //     color: "#ffddec"
      //   },
        // "&:focus": {
        //   backgroundColor: '#ffddec',
        //   color: 'brown'
        // },
        // '&:before': {
        //   borderColor: 'orange'
        // },
        // '&:after': {
        //   borderColor: 'green',
        // }
      // }
      // select:{
      //   backgroundColor: "#ff0000",
      // },
    }));
    const classes = useStyles();
    const [state, setState] = React.useState({
      ปริญญาตรี: true,
      ปริญญาโท: false,
      ปริญญาเอก: false,
      startYear: '',
    });

    const checkChange2 = (e) => {
      setState({ ...state, [e.target.name]: e.target.checked });
      console.log('ปริญญาโท',e.target.checked)
      if(e.target.checked === true) {
      setValue("degree2", e.target.value);
      } else {
        setValue("degree2", null);
        setValue("degree3", null);
        setState({
          ปริญญาตรี: true,
          ปริญญาโท: false,
          ปริญญาเอก: false
        });
      }
    };
    const checkChange3 = (e) => {
      setState({ ...state, [e.target.name]: e.target.checked });
      console.log('ปริญญาเอก',e.target.checked)
      if(e.target.checked === true) {
      setValue("degree3", e.target.value);
      } else {
        setValue("degree3", null);
      }
    };
    const { ปริญญาตรี, ปริญญาโท, ปริญญาเอก } = state;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ccc">

        <div className="container">
          <h2>แบบฟอร์มกรอกข้อมูลศิษย์เก่า</h2>
        </div>

        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="firstName"
                ref={register}
                placeholder="ชื่อ"
              />
              <span className="line"></span>
            </div>
            <span className="err">{errors.firstName?.message}</span>
          </div>

          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="lastName"
                ref={register}
                placeholder="นามสกุล"
              />
                <span className="line"></span>
            </div>
            <span className="err">{errors.lastName?.message}</span>
          </div>
        </div>

        <div className = "row100">
          <div className = "col">
            <MuiThemeProvider theme={theme}>
              <FormControl className={classes.formSelect}>
                <NativeSelect 
                  value={state.startYear}
                  className={classes.select}
                  onChange={handleChange}
                  name="startYear"
                  inputProps={{ 'aria-label': 'startYear' }}
                >
                  <option value={0} className="menu-mainitem">&nbsp;ปีที่เข้าศึกษา</option>
                  <option value='2556' className="menu-item">&nbsp;2556</option>
                  <option value={2557} className="menu-item">&nbsp;2557</option>
                  <option value={2558} className="menu-item">&nbsp;2558</option>
                  <option value={2559} className="menu-item">&nbsp;2559</option>
                  <option value={2560} className="menu-item">&nbsp;2560</option>
                  <option value={2561} className="menu-item">&nbsp;2561</option>
                  <option value={2562} className="menu-item">&nbsp;2562</option>
                  <option value={2563} className="menu-item">&nbsp;2563</option>
                  <option value={2564} className="menu-item">&nbsp;2564</option>
                </NativeSelect>
              </FormControl>
            </MuiThemeProvider>
            <br/><span className="err">{errors.idStudent1?.message}</span>
          </div>
          <div className="row200">
            <div className="col2">
              <div className="inputBox1">
              <input type="text" 
                name="idStudent1" 
                id="idStudent1" 
                ref={register} 
                placeholder="XX" 
                readOnly/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.idStudent2?.message}</span>
            </div>
            <div className="col2">
              <div className="inputBox2">
                <input type="text"
                  name="idStudent2" 
                  id="idStudent2"
                  ref={register}
                  placeholder="XXXX-XXXX"/>
                <span className="line"></span>
              </div>
              {/* <span className="err">{errors.idStudent2?.message}</span> */}
            </div>
          </div>
        </div>

        {/* <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input type="text" 
                name="idStudent1" 
                id="idStudent1" 
                ref={register} 
                placeholder="XX" 
                readOnly/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.idStudent1?.message}</span>
          </div>
          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="idStudent2" 
                id="idStudent2"
                ref={register}
                placeholder="XXXX-XXXX"/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.idStudent2?.message}</span>
          </div>
        </div> */}

        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="email" 
                id="email"
                ref={register}
                placeholder="อีเมล"/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.email?.message}</span>
          </div>
          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="phone" 
                id="phone"
                ref={register}
                placeholder="เบอร์โทรศัพท์"/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.phone?.message}</span>
          </div>
        </div>

        <div className="row100">
          <div className="col">
            <div className="inputBox textarea">
              <input type="text"
                name="address" 
                id="address"
                ref={register}
                placeholder="*ตัวอย่าง 156 ม.5 ต.พลายชุมพล อ.เมืองพิษณุโลก จ.พิษณุโลก 65000"
              />
              <span className="text">ที่อยู่ปัจจุบัน</span>
              <span className="line"></span>
            </div>
            <span className="err">{errors.address?.message}</span>
          </div>
        </div>

        <MuiThemeProvider theme={theme}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={ปริญญาตรี} name="ปริญญาตรี" />}
                label="ปริญญาตรี"
              />
              <div className="row100">
                <div className="inputBox">
                  <input type="text"
                    name="degree1" 
                    id="degree1"
                    ref={register}
                    readOnly
                    disabled={!ปริญญาตรี}
                    placeholder="สาขา"/>
                  <span className="line"></span>
                </div>
              </div>
              
              <FormControlLabel
                control={<Checkbox checked={ปริญญาโท} onChange={checkChange2} name="ปริญญาโท" />}
                label="ปริญญาโท"
              />
              <div className="row100">
                <div className="inputBox">
                  <input type="text"
                    name="degree2" 
                    id="degree2"
                    ref={register}
                    disabled={!ปริญญาโท}
                    placeholder="สาขา"/>
                  <span className="line"></span>
                </div>
              </div>

              <FormControlLabel
                control={<Checkbox checked={ปริญญาเอก} onChange={checkChange3} name="ปริญญาเอก" />}
                label="ปริญญาเอก" disabled={!ปริญญาโท}
              />
              <div className="row100">
                <div className="inputBox">
                  <input type="text"
                    name="degree3" 
                    id="degree3"
                    ref={register}
                    disabled={!ปริญญาเอก}
                    placeholder="สาขา"/>
                  <span className="line"></span>
                </div>
              </div>
            </FormGroup>
          </FormControl>
        </MuiThemeProvider>
        <p></p>
        <div className="row100">
          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="position" 
                id="position"
                ref={register}
                placeholder="ตำแหน่งงาน"/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.position?.message}</span>
          </div>
          <div className="col">
            <div className="inputBox">
              <input type="text"
                name="workplace" 
                id="workplace"
                ref={register}
                placeholder="สถานที่ทำงาน"/>
              <span className="line"></span>
            </div>
            <span className="err">{errors.workplace?.message}</span>
          </div>
        </div>

        <div  className="row100">
          <div className="col">
            <div className="label">
              <input type="file" className="custom-file-input" name="file" id="file" ref={register} onChange={handleSelect} required/>
              <label htmlFor="file" id="selector">อัพโหลดรูปโปรไฟล์</label>
            </div>
            <span className="err">{errors.file?.message}</span>
          </div>
        </div>

        <div  className="row100">
          <div className="col">
            <input type="submit" value="ยืนยัน"/>
          </div>
        </div>
        
      </div>
    </form>
  );
}