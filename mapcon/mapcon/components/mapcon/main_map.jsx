import React, { useEffect } from 'react';
import { DivOverlay, geoJSON, latLng, LayerGroup } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvent, useMapEvents, CircleMarker, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { icon } from "leaflet"
import { useForm, Controller, reset } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'
import axios from 'axios';

const ICON = icon({
    iconUrl: "/marker.png",
    shadowUrl: '/marker-shadow.png',
    //   iconSize: [25, 41],
    iconAnchor: [12, 41]
})


export default function MainMap({ conflitos }) {

    const position = [-25.4845133, -49.2575359]
    const [showForm, setShowForm] = useState({ visible: false })
    const [coordenadas, setCoordenadas] = useState(null)

    // useEffect(async () => {

    //     const r = await axios.get('/api/mapcon/geolocalizacao', { params: { protesto_num_seq_protesto: protestId } })
    //     r.data ? setCoordenadas({latitude:r.data.latitude , longitude: r.data.longitude}) : null
    // }, [])

    function onMapRightClicked(pos, marker_pos) {

        const dados = {
            nivel_exatidao: '',
            latitude: String(pos.lat),
            longitude: String(pos.lng),
            protesto_num_seq_protesto: String(protestId),
            raio: ''
        }

        setShowForm({ data: dados, marker_pos: marker_pos, pos: pos, visible: true })
    }

    return (
        <>
            <MapContainer zoomControl={false} style={{ height: "100vh", width: "100vw" }} center={latLng(position)} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" />

                {conflitos.length > 0 && conflitos.map(element => {
                    console.log(element)
                    return (<CircleMarker key={element.protesto_num_seq_protesto} center={[element.latitude, element.longitude]} radius={5} pathOptions={{ color: 'red',fillColor: 'red' }}>
                        <Popup>
                            <p><b>{element.data}</b></p>
                            {element.tema_protesto}
                        </Popup>
                    </CircleMarker>)
                })}

                <ZoomControl position={'topright'}></ZoomControl>
            </MapContainer>
           
        </>
    )
}
