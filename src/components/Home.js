import React, { useEffect, useState } from 'react'
import Header from "./Header";

import axios from 'axios'
import './css/form.css'


function Home() {

  const [userData, setState] = useState('');
  console.log(userData, "1111111111111111111111");
  const url = "http://localhost:5000/api/v2/users"

  const getAllData = () => {
    axios.get(`${url}`)
      .then((response) => {
        console.log(response, "response")
        const allData = response.data
        console.log(allData, "all data ==========+++++++++")
        setState(allData)
      })
      .catch(error => console.error(`Error: ${error}`))
  }

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div>
      <Header />
      <h3>Home</h3>
        <table className='tbl'>
          <thead>
            <tr>
              <th className='tbl'>FirstName</th>
              <th className='tbl'>LastName</th>
              <th className='tbl'>PhoneNumber</th>
              <th className='tbl'>Email</th>
            </tr>

          </thead>
          <tbody>
            {
              Object.values(userData).map((item, index) => {
                return (
                  <tr key={index} className='tbl'>
                    <td className='tbl'>{item.fname}</td>
                    <td className='tbl'>{item.lname}</td>
                    <td className='tbl'>{item.phone}</td>
                    <td className='tbl'>{item.email}</td>
                  </tr>
                )
              })

            }
          </tbody>
        </table>
    </div>
  )
}

export default Home