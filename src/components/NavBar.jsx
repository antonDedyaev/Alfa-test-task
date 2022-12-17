import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Container, ToggleButton } from 'react-bootstrap';
import { Heart } from 'react-bootstrap-icons';

import { imagesFiltered } from '../slices/dogsSlice';

const NavBar = () => {
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const onClickFiltered = () => {
    setChecked(!checked);
    dispatch(imagesFiltered(!checked));
  };

  return (
    <Navbar className="shadow-sm" expand="lg" bg="light" variant="light">
      <Container className="d-flex justify-content-start">
        <Navbar.Brand>
          <h1>Shiba-gram</h1>
        </Navbar.Brand>
        <ToggleButton
          className="mx-5"
          type="checkbox"
          variant="secondary"
          checked={checked}
          onClick={onClickFiltered}
        >
          <span className="mx-2">{checked ? 'Show all' : 'Show favourites'}</span>
          <Heart />
        </ToggleButton>
      </Container>
    </Navbar>
  );
};

export default NavBar;
