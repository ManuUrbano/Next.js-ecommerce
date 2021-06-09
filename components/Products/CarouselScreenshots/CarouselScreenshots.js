import React, { useState } from 'react'
import Slider from 'react-slick';
import { Image, Modal } from 'semantic-ui-react';
import { map } from 'lodash';

const settings = {
    className: "carousel-screenshots",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

export default function CarouselScreenshots(props) {
    const { product, title } = props;
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);

    const openImage = (url) => {
        setUrlImage(url);
        setShowModal(true);
    }

    return (
        <>
            <Slider {...settings}>
                {map(product.photos, (photo) => (
                    <div style={{ width: 50 }} key={product.id}>
                        <Image key={photo.id} src={photo.url} alt={title} onClick={() => openImage(photo.url)} />
                    </div>
                ))}
            </Slider>

            <Modal open={showModal} onClose={() => setShowModal(false)} >
                <Image src={urlImage}  alt={title} key={product.id}/>
            </Modal>

        </>
    )
}
