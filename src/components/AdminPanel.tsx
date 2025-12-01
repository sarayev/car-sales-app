import { useState, useEffect } from 'react'
import type { Schema } from '../../amplify/data/resource'
import CarAdForm from './CarAdForm'

interface AdminPanelProps {
  client: any
}

export default function AdminPanel({ client }: AdminPanelProps) {
  const [carAds, setCarAds] = useState<Schema['CarAd']['type'][]>([])
  const [editingAd, setEditingAd] = useState<Schema['CarAd']['type'] | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchAllCarAds()
  }, [])

  const fetchAllCarAds = async () => {
    try {
      const { data } = await client.models.CarAd.list()
      setCarAds(data)
    } catch (error) {
      console.error('Error fetching car ads:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this car ad?')) {
      try {
        await client.models.CarAd.delete({ id })
        fetchAllCarAds()
      } catch (error) {
        console.error('Error deleting car ad:', error)
      }
    }
  }

  const handleEdit = (ad: Schema['CarAd']['type']) => {
    setEditingAd(ad)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingAd(null)
    fetchAllCarAds()
  }

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '2px solid #007bff', borderRadius: '8px' }}>
      <h2>Admin Panel</h2>
      
      <button 
        onClick={() => setShowForm(true)}
        style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Add New Car Ad
      </button>

      {showForm && (
        <CarAdForm 
          client={client} 
          editingAd={editingAd} 
          onClose={handleFormClose} 
        />
      )}

      <h3>All Car Ads ({carAds.length})</h3>
      <div style={{ display: 'grid', gap: '15px' }}>
        {carAds.map((ad) => (
          <div key={ad.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '4px',
            backgroundColor: ad.isActive ? '#f8f9fa' : '#fff3cd'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h4>{ad.title} {!ad.isActive && '(Inactive)'}</h4>
                <p><strong>${ad.price}</strong> - {ad.year} {ad.make} {ad.model}</p>
              </div>
              <div>
                <button 
                  onClick={() => handleEdit(ad)}
                  style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(ad.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
