import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';

export default function Login(props) {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      hoTen: '',
      soDt: '',
      nhapLaiMatKhau:''
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("User Name is required"),
      email: Yup.string().required("Email is required").email("Email is not valid"),
      matKhau: Yup.string().required("Password is required").min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"),
      nhapLaiMatKhau: Yup.string().oneOf([Yup.ref('matKhau'), null], "Passwords don't match!").required('Repeat password is required'),
      hoTen: Yup.string().required("Name is required"),
      soDt: Yup.number().required("Phone is required")
    }),
    onSubmit: values => {
      const action = dangKyAction(values);
      dispatch(action);
    },
  });

  return (
    <div className="lg:flex">
      <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-4 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-5">
          <div className="cursor-pointer flex items-center">
            <div>
              <svg className="w-10 text-indigo-500" xmlns="https://picsum.photos/1000/1000" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                " }} />
                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                  <g>
                    <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">CYBERLEARN</div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">ĐĂNG KÝ</h2>
          <div className="mt-5">
            <div>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào tài khoản" />
                {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                  <div className="text-rose-600">{formik.errors.taiKhoan}</div>
                )}
              </div>
              <div className="mt-5">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật khẩu
                </div>
                <input type="password" name="matKhau" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào mật khẩu" />
                {formik.errors.matKhau && formik.touched.matKhau && (
                  <div className="text-rose-600">{formik.errors.matKhau}</div>
                )}
              </div>
              <div className="mt-5">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Nhập lại Mật khẩu
                </div>
                <input type="password" name="nhapLaiMatKhau" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập lại mật khẩu" />
                {formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau && (
                  <div className="text-rose-600">{formik.errors.nhapLaiMatKhau}</div>
                )}
              </div>
              <div className="mt-5">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
                <input name="email" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào email" />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-rose-600">{formik.errors.email}</div>
                )}
              </div>
              <div className="mt-5">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Họ tên
                </div>
                <input name="hoTen" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào họ tên" />
                {formik.errors.hoTen && formik.touched.hoTen && (
                  <div className="text-rose-600">{formik.errors.hoTen}</div>
                )}
              </div>
              <div className="mt-5">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Số điện thoại
                </div>
                <input name="soDt" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập vào số điện thoại" />
                {formik.errors.soDt && formik.touched.soDt && (
                  <div className="text-rose-600">{formik.errors.soDt}</div>
                )}
              </div>
              <div className="mt-9 flex justify-between">
                <button type='submit' className="bg-indigo-500 mr-5 text-gray-100 p-4 w-1/2 rounded-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                    shadow-lg">
                  Đăng ký
                </button>
                <Link to={'/login'} className="bg-indigo-500 p-4 w-1/2 rounded-full tracking-wide
                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                    shadow-lg text-center">
                  <button type='button' className=" text-gray-100 " >
                    Đăng nhập
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="hidden lg:flex items-center justify-center flex-1 h-screen" style={{ backgroundImage: `url(https://picsum.photos/2000`, backgroundSize: '100%' }}>
      </div>
    </div>
  )
}
