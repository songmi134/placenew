import React from 'react';
import { Row, Col } from 'antd';
import Searchbar from './Searchbar';
import MapContainer from '../.././components/MapContainer';
import MountainList from './MountainList';

const Search = () => {
  return (
    <>
       <Row justify="center">
        <Col xs={24} xl={10}>
          <Searchbar />
          <MapContainer />
        </Col>
        <Col xs={24} xl={10}>
          <MountainList />
        </Col>
      </Row>
    </>
  );
};

export default Search;