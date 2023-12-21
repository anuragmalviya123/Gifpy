"use client"
import { createContext } from 'react'
import { useState } from 'react'




 export const CentralizedData = createContext(null);

  const CentralData = (props)=>{
    const [data, setData] = useState([]);




  return (
      <CentralizedData.Provider value={[data, setData]}>{props.children}
</CentralizedData.Provider>

  )
}

export default CentralData