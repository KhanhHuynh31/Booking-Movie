import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, capNhatNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/config';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

const AddNew = () => {
    const { tuKhoa } = useParams();
    const dispatch = useDispatch();
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    useEffect(() => {

        dispatch(layDanhSachNguoiDungAction(tuKhoa));
    
      }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: danhSachNguoiDung[0]?.taiKhoan,
            matKhau: danhSachNguoiDung[0]?.matKhau,
            email: danhSachNguoiDung[0]?.email,
            hoTen: danhSachNguoiDung[0]?.hoTen,
            soDT: danhSachNguoiDung[0]?.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: danhSachNguoiDung[0]?.maLoaiNguoiDung
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required("User name is required"),
            email: Yup.string().required("Email is required").email("Email is not valid"),
            matKhau: Yup.string().required("Password is required").min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"),
            hoTen: Yup.string().required("Name is required"),
            soDT: Yup.string().required("Phone is required"),
        }),
        onSubmit: (values) => {
            dispatch(capNhatNguoiDungAction(values));
        }
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <div className="text-gray-600 body-font flex flex-row">
                    <div className="container px-5 pt-10 mx-auto">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            <input name="email" value={formik.values.email} onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.email && formik.touched.email && (
                                <div className="text-rose-600">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Họ tên</div>
                            <input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.hoTen && formik.touched.hoTen && (
                                <div className="text-rose-600">{formik.errors.hoTen}</div>
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
                            <input name="soDT" value={formik.values.soDT} onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.soDT && formik.touched.soDT && (
                                <div className="text-rose-600">{formik.errors.soDT}</div>
                            )}
                        </div>
                    </div>
                    <div className="container px-5 py-10 mx-auto">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                            <input disabled name="taiKhoan" value={formik.values.taiKhoan} onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                                <div className="text-rose-600">{formik.errors.taiKhoan}</div>
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Mật khẩu</div>
                            <Input.Password
                                name="matKhau"
                                value={formik.values.matKhau}
                                style={{ border: "none", borderBottom: "solid 1px rgb(209 213 219 / var(--tw-border-opacity))", fontSize: "1.125rem", paddingLeft: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem", hoverEvents: "none" }}
                                onChange={formik.handleChange}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            {formik.errors.matKhau && formik.touched.matKhau && (
                                <div className="text-rose-600">{formik.errors.matKhau}</div>
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Loại người dùng</div>
                            <select name="maLoaiNguoiDung" onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="KhachHang" selected >Khách hàng</option>
                                <option value="QuanTri">Quản trị</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <button type="submit" className="mt-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Cập nhật</button>
                </div>
            </form>

        </>
    );
};

export default AddNew;