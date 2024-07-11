import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import GoogleMapReact from 'google-map-react'
import { API_KEY } from '../services/KEYS'

function Marker() {
  return (
    <div className='branch-img'>
      {/* <img src={logoUrl} /> */}
      <p>❤️</p>
    </div>
  )
}

export function StoreLocations() {
  const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
  const [zoom, setZoom] = useState(16)
  const [selectedStore, setSelectedStore] = useState(null)
  const [showModal, setShowModal] = useState(false)

  function handleShowModal(store) {
    setSelectedStore(store)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setSelectedStore(null)
  }

  function onHandleClick({ lat, lng }) {
    console.log('onHandleClick', onHandleClick)
    setCoords({ lat, lng })
    console.log('setCoords', setCoords)
  }

  const storeLocations = [
    {
      id: 1,
      city: 'Tel Aviv-Yafo',
      address: '50 Dizengoff St, Tel Aviv-Yafo',
      position: {
        lat: 32.0751059559067,
        lng: 34.77498253832089,
      },
      openingHours: {
        sunday: '10am - 7pm',
        monday: '10am - 7pm',
        tuesday: '10am - 7pm',
        wednesday: '10am - 7pm',
        thursday: '10am - 7pm',
        friday: '10am - 2pm',
        saturday: 'Closed',
      },
    },
    {
      id: 2,
      city: 'Tel Aviv-Yafo',
      address: '132 Derech Menachem Begin, Tel Aviv-Yafo',
      position: {
        lat: 32.074532635839056,
        lng: 34.791846237160996,
      },
      openingHours: {
        sunday: '10am - 7pm',
        monday: '10am - 7pm',
        tuesday: '10am - 7pm',
        wednesday: '10am - 7pm',
        thursday: '10am - 7pm',
        friday: '10am - 2pm',
        saturday: 'Closed',
      },
    },
    {
      id: 3,
      city: 'Tel Aviv-Yafo',
      address: '43 Brodetsky St, Tel Aviv-Yafo',
      position: {
        lat: 32.11223413689649,
        lng: 34.795946781341534,
      },
      openingHours: {
        sunday: '10am - 7pm',
        monday: '10am - 7pm',
        tuesday: '10am - 7pm',
        wednesday: '10am - 7pm',
        thursday: '10am - 7pm',
        friday: '10am - 2pm',
        saturday: 'Closed',
      },
    },
    {
      id: 4,
      city: 'Netanya',
      address: '2 Beni Berman St , Netanya',
      position: {
        lat: 32.27924143238239,
        lng: 34.846784752514274,
      },
      openingHours: {
        sunday: '10am - 7pm',
        monday: '10am - 7pm',
        tuesday: '10am - 7pm',
        wednesday: '10am - 7pm',
        thursday: '10am - 7pm',
        friday: '10am - 2pm',
        saturday: 'Closed',
      },
    },
    {
      id: 5,
      city: 'Herzliya',
      address: '8 Shivat Hakohavim Blvd, Herzliya',
      position: {
        lat: 32.164996698846174,
        lng: 34.82396115250849,
      },
      openingHours: {
        sunday: '10am - 7pm',
        monday: '10am - 7pm',
        tuesday: '10am - 7pm',
        wednesday: '10am - 7pm',
        thursday: '10am - 7pm',
        friday: '10am - 2pm',
        saturday: 'Closed',
      },
    },
    {
      id: 6,
      city: 'Ramat Gan',
      address: '301 Abba Hillel Silver Rd, Ramat Gan',
      position: {
        lat: 32.100205196403536,
        lng: 34.826524868744535,
      },
      openingHours: {
        sunday: '10am - 7pm',
        monday: '10am - 7pm',
        tuesday: '10am - 7pm',
        wednesday: '10am - 7pm',
        thursday: '10am - 7pm',
        friday: '10am - 2pm',
        saturday: 'Closed',
      },
    },
  ]
console.log('coords', coords)
console.log('storeLocations', storeLocations)


  return (
    <div>
      {/* // Important! Always set the container height explicitly */}
      <div className='map' style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact bootstrapURLKeys={{ key: API_KEY }} center={coords} zoom={zoom} onClick={onHandleClick}>
          {storeLocations.map((storeLocation) => {
            return <Marker lat={storeLocation.position.lat} lng={storeLocation.position.lng} key={storeLocation.id} />
          })}
        </GoogleMapReact>
      </div>
      <ul className='store-locations-list'></ul>
      {storeLocations.map((storeLocation) => {
        return (
          <li key={storeLocation.id}>
            <button
              onClick={() => {
                setCoords(storeLocation.position)
                setZoom(12)
                handleShowModal(storeLocation)
              }}>
              {storeLocation.city}
            </button>
          </li>
        )
      })}
      {showModal && (
        <>
          <div className='modal-backdrop-custom' onClick={handleCloseModal}></div>
          <div className='modal-custom'>
            {selectedStore && (
              <>
                <div className='modal-header'>
                  <h2>{selectedStore.city} Store</h2>
                </div>
                <div className='modal-body'>
                  <p>
                    <strong>Address:</strong> {selectedStore.address}
                  </p>
                  <p>
                    <strong>Opening Hours:</strong>
                    <br />
                    <strong>Sunday:</strong> {selectedStore.openingHours.sunday}
                    <br />
                    <strong>Monday:</strong> {selectedStore.openingHours.monday}
                    <br />
                    <strong>Tuesday:</strong> {selectedStore.openingHours.tuesday}
                    <br />
                    <strong>Wednesday:</strong> {selectedStore.openingHours.wednesday}
                    <br />
                    <strong>Thursday:</strong> {selectedStore.openingHours.thursday}
                    <br />
                    <strong>Friday:</strong> {selectedStore.openingHours.friday}
                    <br />
                    <strong>Saturday:</strong> {selectedStore.openingHours.saturday}
                  </p>
                  <button onClick={handleCloseModal}>Close</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
