
import React, { useState, useEffect } from 'react';
import { Switch, Row, Space } from 'antd';

const { kakao } = window;

const MapContainer = () => {
  const [terrain, setTerrain] = useState(true);

  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(35.85133, 127.734086),
      level: 7,
    };

    const map = new kakao.maps.Map(container, options);

    if (!terrain) {
      map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    } else {
      map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    }
  }, [terrain]);

  const onChange = boolean => {
    setTerrain(!boolean);
  };

  return (
    <>
     
      <div
        id="map"
        style={{
          width: '100%',
          height: '70vh',
          marginBottom: '20px',
        }}
      ></div>
        <Switch
        checkedChildren="지형정보 끄기"
        unCheckedChildren="지형정보 보기"
        onChange={onChange}
      ></Switch>
    </>
  );
};

export default MapContainer;