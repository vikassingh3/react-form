import React, { useEffect, useState } from 'react'
import Header from "./Header";
import './css/form.css'

function Home() {
  const [data, setData] = useState("")
  useEffect(() => {
    fetch("http://localhost:5000/api/v2/users")
      .then(Response => {
        console.log(Response);
        return Response.json()
      }).then(data => {
        console.log(data);
        setData(data)
      })
  }, [])
  return (
    <div>
      <Header />
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
            Object.values(data).map((item, index) => {
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