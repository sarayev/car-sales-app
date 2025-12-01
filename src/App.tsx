import { useEffect, useState } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'
import type { Schema } from '../amplify/data/resource'
import CarAdsList from './components/CarAdsList'
import AdminPanel from './components/AdminPanel'

const client = generateClient<Schema>()

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const user = await getCurrentUser()
      const groups = user.signInDetails?.loginId ? ['admins'] : []
      setIsAdmin(groups.includes('admins'))
    } catch {
      setIsAdmin(false)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Car Sales App</h1>
      
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <span>Welcome {user?.signInDetails?.loginId}</span>
              <button onClick={signOut} style={{ marginLeft: '10px' }}>
                Sign out
              </button>
            </div>
            
            {isAdmin && <AdminPanel client={client} />}
            <CarAdsList client={client} />
          </div>
        )}
      </Authenticator>
      
      {/* Public view for unauthenticated users */}
      <div>
        <h2>Available Cars</h2>
        <CarAdsList client={client} />
      </div>
    </div>
  )
}

export default App
