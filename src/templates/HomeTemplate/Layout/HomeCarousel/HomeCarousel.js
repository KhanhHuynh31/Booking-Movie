import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector,useDispatch } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import './HomeCarousel.css';

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
};
export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer)
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getCarouselAction());
    }, [])
    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img src={item.hinhAnh} alt={item.hinhAnh} className="opacity-0"></img>
                </div>
            </div>
        })
    }
    return (
        <Carousel effect="fade" style={{width:'100%',padding:0,margin:0}} >
            {renderImg()}
        </Carousel>
    )
}