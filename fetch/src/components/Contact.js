import React from 'react'
import Header from "./Header";
import { Button } from 'react-bootstrap';
import { useState } from "react";
import './css/form.css'

function About() {

  const [data, setData] = useState("")

  const [errors, setErrors] = useState({})

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
        if (value.length < 10 || value.length === "") {
          setErrors({
            ...errors,
            Pname: 'PhoneNumber atleast have 10 numbers and not empty'
          })
          setSubmitVar(false)
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
        }
        else {
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

  const handleChange = (event) => {
    const { name, value } = event.target
    validateForm(event, name, value)
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    if (submitVar === true) {
    event.preventDefault();
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          phone: data.phone
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          console.log("error");
        } else {
          console.log("success");
          window.location.href = "/";
          return res.json();
        }
      })
        .then((data) => {
          console.log(data);
          setData(data)
        })
        .catch((err) => {
          console.log(err, "error");
        })
      }else{
        console.log("check your fields")
      }
  }
  return (
    <div>
      <Header />
      <form>
        <input type="text" name="fname" placeholder='firstname' onChange={handleChange} />
        <label style={{ color: "red" }} >{errors.fname}</label>
        <input type="text" name="lname" placeholder='lastname' onChange={handleChange} />
        <label style={{ color: "red" }} >{errors.lname}</label>
        <input type="number" name="phone" placeholder='phonenumber' onChange={handleChange} />
        <label style={{ color: "red" }}>{errors.Pname}</label>
        <input type="email" name="email" placeholder='email' onChange={handleChange} />
        <label style={{ color: "red" }} >{errors.Ename}</label>
        <Button variant="primary" onClick={handleSubmit} > Submit </Button>
      </form>
    </div>
  )
}



export default About