import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addedToFavourites, imageRemoved } from "../slices/dogsSlice";

import { HandThumbsUp, HandThumbsUpFill, Trash } from "react-bootstrap-icons";
import {
    Container,
    Button,
    Card,
    Col,
    Row 
} from "react-bootstrap";

import { fetchImages } from "../slices/dogsSlice";

export const ImagesList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchImages())
    }, [dispatch])

    const images = useSelector(state => state.dogs.items);

    const favourites = useSelector(state => state.dogs.favourites);

    const getFavouriteImage = (imageId) =>
        favourites.find((item) => item.id === imageId)

    const renderImages = () => {
        return (
            <Row>
                {images.map((image) => (
                    <Col key={image.id} sm={12} md={6} lg={4}>
                        <Card className="d-flex align-items-center mb-3">
                            <Container>
                                <Card.Img className="rounded img-thumbnail mt-2" style={{width: '18rem', height: '20rem'}} variant="top" src={image.url}/>
                            </Container>
                            <Card.Body>
                                <Card.Title>Title</Card.Title>
                                <Card.Text>Some text</Card.Text>
                                <Row>
                                    <Col>
                                        <Button 
                                            className="d-flex align-items-center"
                                            variant="secondary"
                                            onClick={() => dispatch(addedToFavourites(image))}
                                        >
                                            <span className="mx-2">Love it!</span>
                                            {getFavouriteImage(image.id) ? <HandThumbsUpFill/> : <HandThumbsUp/>}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="d-flex align-items-center"
                                            variant="danger"
                                            onClick={() => dispatch(imageRemoved(image.id))}
                                        >
                                            <span className="mx-2">Remove</span>
                                            <Trash />
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )
    }

    return (
        <Container className="text-center my-5 fluid">
            {renderImages()}
        </Container>
    )
}
