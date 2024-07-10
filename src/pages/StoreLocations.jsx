import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { storeLocations } from '../services/storeLocations.js'

import { GoogleMap } from '../cmps/GoogleMap.jsx'

export function StoreLocations() {
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

  function handleLanguageChange(language) {
    i18n.changeLanguage(language)
  }

  return (
    <div className='store-locations'>
      <div className='store-locations-map'>
        <GoogleMap
          lat={selectedStore ? selectedStore.lat : 32.0853}
          lng={selectedStore ? selectedStore.lng : 34.7818}
          stores={storeLocations}
        />
      </div>
      <ul className='store-locations-list'>
        {storeLocations.map((storeLocation) => (
          <li key={storeLocation.id}>
            <button onClick={() => handleShowModal(storeLocation)}>{storeLocation.city}</button>
          </li>
        ))}
      </ul>
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
