import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/types/QuanLyPhimType'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
  const renderFilms = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div className={`${styleSlick['width-item']}`} key={index}  >
        <Film_Flip phim={item} />
      </div>
    })
  }
  let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ width: '95%', margin: 'auto' }}>
      <div className="mb-3">
        <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border mr-2`} onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU }
          dispatch(action);
        }}>PHIM ĐANG CHIẾU</button>
        <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={() => {
          const action = { type: SET_FILM_SAP_CHIEU }
          dispatch(action);
        }}>PHIM SẮP CHIẾU</button>      </div>
      <Slider {...settings}>
        {renderFilms()}
      </Slider>
    </div>
  );
}
export default MultipleRowSlick;