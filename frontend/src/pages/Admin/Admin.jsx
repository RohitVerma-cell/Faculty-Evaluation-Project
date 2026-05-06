import React, { useEffect, useState } from 'react'
import axios from "axios"

const Admin = () => {
  const [adminData, setAdminData] = useState([])

  const getData = async ()=>{
    const loginData = {
      email:"ratan@gmail.com",
      password:"ratan1234"
    }
    try {
      const {data} = await axios.post(import.meta.env.VITE_API_URL+"/admin/login",loginData);
      if(!data.success){
        return alert(data.message)
      }

      console.log(data)
      setAdminData(data.data)

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData();
  }, [])
  
  return (
    <>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main,#0f172a)', margin: 0 }}>
          Welcome back, {adminData.fullname}
        </h1>
        <p style={{ color: 'var(--text-sub,#64748b)', margin: '4px 0 0', fontSize: 14 }}>
          Academic Year 2024-25 · Submission Overview
        </p>
      </div>
    </>
  )
}

export default Admin