// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// // import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';
// import { useForm } from "react-hook-form";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing(3),
//   },
// }));

// export default function CheckboxesGroup() {
//   const { register, handleSubmit, setValue, errors } = useForm();
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     ปริญญาตรี: false,
//     ปริญญาโท: false,
//     ปริญญาเอก: false,
//   });

//   const onSubmit = data => {
//     console.log(data)
//   };

//   const handleChange = (e) => {
//     setState({ ...state, [e.target.name]: e.target.checked });
//     console.log('ปริญญาตรี',e.target.checked)
//     if(e.target.checked === true) {
//       setValue("test1", e.target.value);
//       // e.target.disabled = false
//     } else {
//       setValue("test1", null);
//     }
//   };
//   const handleChange1 = (e) => {
//     setState({ ...state, [e.target.name]: e.target.checked });
//     console.log('ปริญญาโท',e.target.checked)
//     if(e.target.checked === true) {
//     setValue("test2", e.target.value);
//     } else {
//       setValue("test2", null);
//     }
//   };
//   const handleChange2 = (e) => {
//     setState({ ...state, [e.target.name]: e.target.checked });
//     console.log('ปริญญาเอก',e.target.checked)
//     if(e.target.checked === true) {
//     setValue("test3", e.target.value);
//     } else {
//       setValue("test3", null);
//     }
//   };

//   const { ปริญญาตรี, ปริญญาโท, ปริญญาเอก } = state;
//   // const error = [ปริญญาตรี, ปริญญาโท, ปริญญาเอก].filter((v) => v).length !== 2;

//   return (
//     <div className={classes.root}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl component="fieldset" className={classes.formControl}>
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox checked={ปริญญาตรี} onChange={handleChange} name="ปริญญาตรี" />}
//             label="ปริญญาตรี"
//           />
//           <input type="text"
//             name="test1" 
//             id="test1"
//             ref={register}
//             disabled={!ปริญญาตรี}
//             placeholder="ปริญญาตรี"/>
          
//           <FormControlLabel
//             control={<Checkbox checked={ปริญญาโท} onChange={handleChange1} name="ปริญญาโท" />}
//             label="ปริญญาโท"
//           />
//           <input type="text"
//             name="test2" 
//             id="test2"
//             ref={register}
//             disabled={!ปริญญาโท}
//             placeholder="ปริญญาโท"/>

//           <FormControlLabel
//             control={<Checkbox checked={ปริญญาเอก} onChange={handleChange2} name="ปริญญาเอก" />}
//             label="ปริญญาเอก"
//           />
//           <input type="text"
//             name="test3" 
//             id="test3"
//             ref={register}
//             disabled={!ปริญญาเอก}
//             placeholder="ปริญญาเอก"/>
//         </FormGroup>
//       </FormControl>
//       </form>
//     </div>
//   );
// }
