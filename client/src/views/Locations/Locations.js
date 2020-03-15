import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';

import Province from './Province/Province';
import ProvinceForm from './Province/ProvinceForm';
import Town from './Town/Town';
import TownForm from './Town/TownForm';
import Station from './Station/Station';
import StationForm from './Station/StationForm';

const Locations = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div className="animated fadeIn">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Add Province
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Add Town
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Add Station
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="6">
              <ProvinceForm />
            </Col>

            <Col sm="6">
              <br />
              <Province />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <TownForm />
            </Col>
            <Col sm="6">
              <br />
              <Town />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="6">
              <StationForm />
              <br />
            </Col>

            <Col sm="6">
              <Station />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Locations;
