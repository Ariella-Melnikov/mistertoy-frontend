import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div className='marker'>{text}</div>

export function GoogleMap({lat, lng, stores }) {
  const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 11

  function onHandleClick({ stores }) {
    console.log('onHandleClick', onHandleClick)
    setCoords({ lat, lng })
    console.log('setCoords', setCoords)
  }

  return (
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        center={coords}
        defaultZoom={zoom}
        onClick={onHandleClick}>
        {/* {stores.map((store) => (
          <AnyReactComponent key={store.id} lat={store.lat} lng={store.lng} text='💛' />
        ))} */}
      </GoogleMapReact>
    </div>
  )
}
