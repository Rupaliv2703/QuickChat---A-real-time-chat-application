import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(false)

  return (
    <div className="bg-amber-950 min-h-screen">
     <div className='bg-amber-900'>
      <Sidebar/>
      <ChatContainer/>
      <RightSidebar/>
    </div>
    </div>
  )
}

export default Home

