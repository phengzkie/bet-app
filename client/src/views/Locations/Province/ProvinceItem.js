import React, { useContext } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import ProvinceContext from '../../../context/province/provinceContext';

const ProvinceItem = ({ province }) => {
  const provinceContext = useContext(ProvinceContext);
  const {
    deleteProvince,
    setProvinceCurrent,
    clearProvinceCurrent
  } = provinceContext;

  const { _id, name } = province;

  const onDelete = () => {
    deleteProvince(_id);
    clearProvinceCurrent();
  };

  return (
    <ListGroup>
      <ListGroupItem>
        <ListGroupItemHeading>{name}</ListGroupItemHeading>
        <ListGroupItemText>
          <Button
            color="secondary"
            onClick={() => setProvinceCurrent(province)}
          >
            Edit
          </Button>{' '}
          <Button color="danger" onClick={onDelete}>
            Delete
          </Button>
        </ListGroupItemText>
      </ListGroupItem>
    </ListGroup>
  );
};

ProvinceItem.propTypes = {
  province: PropTypes.object.isRequired
};

export default ProvinceItem;
