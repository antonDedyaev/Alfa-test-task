import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HandThumbsUp, HandThumbsUpFill, Trash } from 'react-bootstrap-icons';
import {
  Container,
  Button,
  Card,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  addedToFavourites, removedFromFavourites, imageRemoved, fetchImages,
} from '../slices/dogsSlice';

import facts from '../utils/shibaFacts';

const ImagesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const images = useSelector((state) => state.dogs.items);
  const filteredStatus = useSelector((state) => state.dogs.filtered);
  const favourites = images.filter((image) => image.isFavourite === true);

  const toggleFavouriteHandler = (image) => {
    dispatch(image.isFavourite
      ? removedFromFavourites(image.id)
      : addedToFavourites(image.id));
  };

  const shownImages = filteredStatus ? favourites : images;

  const renderImages = () => (
    <Row>
      {shownImages.map((image, ind) => (
        <Col key={image.id} sm={12} md={6} lg={4}>
          <Card className="d-flex align-items-center mb-3">
            <Container>
              <Card.Img className="rounded img-thumbnail mt-2" style={{ width: '18rem', height: '20rem' }} variant="top" src={image.url} />
            </Container>
            <Card.Body className="">
              <Card.Title>
                Fact No.
                {ind + 1}
              </Card.Title>
              <Card.Text style={{ height: '3rem' }}>{facts[ind + 1]}</Card.Text>
              <Container className="d-flex justify-content-center">
                <Row>
                  <Col>
                    <Button
                      className="d-flex align-items-center"
                      variant="secondary"
                      onClick={() => toggleFavouriteHandler(image)}
                    >
                      <span className="mx-1">Love it</span>
                      {image.isFavourite ? <HandThumbsUpFill /> : <HandThumbsUp />}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="d-flex align-items-center"
                      variant="danger"
                      onClick={() => dispatch(imageRemoved(image.id))}
                    >
                      <span className="mx-1">Remove</span>
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const currentStatus = useSelector((state) => state.dogs.status);

  return (
    <Container className="text-center my-5 fluid">
      {currentStatus === 'loading' ? <Spinner animation="border" variant="primary" /> : renderImages()}
    </Container>
  );
};

export default ImagesList;
