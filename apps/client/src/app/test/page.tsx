import React from 'react'
import { auth } from '@clerk/nextjs/server'

const TestPages = async () => {
    const { getToken } = await auth()
    const token = await getToken()

    const response = await fetch('http://localhost:8001/test', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log(data);
    return (
        <div>TestPages</div>
    )
}

export default TestPages