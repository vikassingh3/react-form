import React, { useState } from 'react'
import Header from "./Header";
import { Button } from 'react-bootstrap';
import axios from 'axios';


function About() {
  const [data, setData] = useState('');
  const [errors, setErrors] = useState('');
  const [submitVar, setSubmitVar] = useState()


  const validateForm = (event, name, value) => {
    event.preventDefault()
    switch (name) {
      case "fname":
        if (value.length < 3 || value.length === "") {
          setErrors({
            ...errors,
            fname: 'FirstName atleast have 5 letters and not empty'
          })
          setSubmitVar(false)
        }
        else {
          setErrors({
            ...errors,
            fname: ''
          })
          setSubmitVar(true)
        }
        break;
      case "lname":
        if (value.length < 3 || value.length === "") {
          setErrors({
            ...errors,
            lname: 'LastName atleast have 5 letters and not empty'
          })
          setSubmitVar(false)
          return
        }
        else {
          setErrors({
            ...errors,
            lname: ''
          })
          setSubmitVar(true)
        }
        break;
      case "phone":
        if (value.length < 11 || value.length === "") {
          setErrors({
            ...errors,
            Pname: 'PhoneNumber atleast have 10 numbers and not empty'
          })
          setSubmitVar(false)
          return
        }
        else {
          setErrors({
            ...errors,
            Pname: ''
          })
          setSubmitVar(true)
        }
        break;
      case "email":
        if (String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)!==null) {
          setErrors({
            ...errors,
            Ename: ''
          })
          setSubmitVar(true)
          return
        }
        else {
          console.log('email valid')
          setErrors({
            ...errors,
            Ename: 'Email is not valid and not empty'
          })
          setSubmitVar(false)
        }
        break;
      default:
        break;
    }
  }



  const handleChannge = (event) => {
    const { name, value } = event.target;
    validateForm(event, name, value)
    setData({
      ...data,
      [name]: value
    })
    
  }
  
  
  const url = "http://localhost:5000/users"
  const postdata = (event) => {
      if (submitVar === true) {
      event.preventDefault()
      axios.post(`${url}`, {
        body: JSON.stringify({
          fname: data.fname,
          lname: data.lname,
          phone: data.phone,
          email: data.email

        })
      })
        .then(response => {
          const allData = response.data
          setData(allData)
        })
        .catch(error => console.error(`Error: ${error}`))
    }else{
      console.log(submitVar)
      console.log("check your fields")
    }
  }


  return (
    <div>
      <Header />
      <p>Contact</p>

      <form >
        <div className="form-group">
          <input type="text" name='fname' className="form-control" placeholder="First Name" onChange={handleChannge} />
          <label style={{ color: "red" }} > {errors.fname}</label>
        </div>

        <div className="form-group">
          <input type="text" name='lname' className="form-control" placeholder="Last Name" onChange={handleChannge} />
          <label style={{ color: "red" }} > {errors.lname}</label>
        </div>

        <div className="form-group">
          <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChannge} />
          <label style={{ color: "red" }} htmlFor="exampleInputEmail1"> {errors.Ename}</label>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <input type="phone" name='phone' className="form-control" id="exampleInputPhone1" placeholder="Phone" onChange={handleChannge} />
          <label style={{ color: "red" }} htmlFor="exampleInputPassword1"> {errors.Pname}</label>
        </div>

        <Button variant="primary" onClick={postdata}>Submit</Button>


      </form>
    </div>
  )
}

export default About