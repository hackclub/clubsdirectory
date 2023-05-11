import React from 'react'
import { CircleMarker } from 'react-leaflet'

export const UserLocationDot = ({userLatitude, userLongitude}) => (
	  <CircleMarker
    center={[userLatitude, userLongitude]}
    radius={8}
    pathOptions={{
      fillColor: '#3478F6',
      color: 'white',
      weight: 2,
      fillOpacity: 1,
    }}
  />
)
