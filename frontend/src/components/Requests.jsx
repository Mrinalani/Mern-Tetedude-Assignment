import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RequestCard from './RequestCard'

const Requests = () => {
    const REQUESTS = [
        {
            Name:"Rani",
            Email:"rani@gmail.com",
        },
        {
            Name:"Ragini",
            Email:"ragini@gmail.com",
        },
        {
            Name:"Mrinalani",
            Email:"mrinalani@gmail.com",
        },
        {
            Name:"Manku",
            Email:"manku@gmail.com",
        }
    ]
    const [requests, setRequests] = useState([])

    useEffect(()=>{

        const fetchRequests = async() => {
            try {
                const token = localStorage.getItem('token')
                const requests = await axios.get('http://localhost:3000/getrequests', { headers: { "Authorization": token }});
                console.log("requests",requests)
                setRequests(requests.data.userRequests)

            } catch (error) {
                console.error("Error fetching users:", error);
                // alert(error.response.data.error || "something went wrong")
            }
        }
        fetchRequests()
    },[])
  return (
    <div className='max-h-screen'>
        <h1 className='text-3xl ml-6 py-6 text-center font-bold'>Requests</h1>
       <div className='h-screen'>
        <div className='overflow-y-scroll max-h-screen px-4'>
        {requests.map((request)=>(
            <div className=''>
            < RequestCard request={request}/>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default Requests
