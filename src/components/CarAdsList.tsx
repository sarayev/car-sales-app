import { useEffect, useState } from 'react'
import type { Schema } from '../../amplify/data/resource'

interface CarAdsListProps {
  client: any
}

export default function CarAdsList({ client }: CarAdsListProps) {
  const [carAds, setCarAds] = useState<Schema['CarAd']['type'][]>([])

  useEffect(() => {
    fetchCarAds()
  }, [])

  const fetchCarAds = async () => {
    try {
      const { data } = await client.models.CarAd.list()
      setCarAds(data.filter((ad: Schema['CarAd']['type']) => ad.isActive))
    } catch (error) {
      console.error('Error fetching car ads:', error)
    }
  }

  return (
    <div>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {carAds.map((ad) => (
          <div key={ad.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{ad.title}</h3>
            <p><strong>Price:</strong> ${ad.price}</p>
            <p><strong>Year:</strong> {ad.year}</p>
            <p><strong>Make:</strong> {ad.make}</p>
            <p><strong>Model:</strong> {ad.model}</p>
            {ad.mileage && <p><strong>Mileage:</strong> {ad.mileage} miles</p>}
            {ad.fuelType && <p><strong>Fuel Type:</strong> {ad.fuelType}</p>}
            {ad.transmission && <p><strong>Transmission:</strong> {ad.transmission}</p>}
            {ad.color && <p><strong>Color:</strong> {ad.color}</p>}
            {ad.description && <p>{ad.description}</p>}
            {ad.contactEmail && <p><strong>Contact:</strong> {ad.contactEmail}</p>}
            {ad.contactPhone && <p><strong>Phone:</strong> {ad.contactPhone}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
