//LIBRARIES
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


class Map extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: 0, // Latitud inicial
        lng: 0, // Longitud inicial
        zoom: 30, // Nivel de zoom inicial
      };

      this.handleLatChange = this.handleLatChange.bind(this);
      this.handleLngChange = this.handleLngChange.bind(this);
    }

    handleLatChange = (event) => {
        this.setState({ lat: parseFloat(event.target.value) });
    };
      
      handleLngChange = (event) => {
        this.setState({ lng: parseFloat(event.target.value) });
    };
      
  
    render() {
      const position = [this.state.lat, this.state.lng];
  
      return (
        <div>
          <MapContainer className="map-desing"
            center={position}
            zoom={this.state.zoom}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                Tu ubicación actual.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      );
    }
  }
  
  export default Map;
  