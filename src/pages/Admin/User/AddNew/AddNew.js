import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/config';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as Yup from 'yup';
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDungService';

const AddNew = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loaiNguoiDung: [],
    })
    useEffect(async () => {
        try {
            let result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            setState({
                ...state,
                loaiNguoiDung: result.data.content
            })
        } catch (error) {

        }
    }, [])
    const renderLoaiNguoiDung = () => {
        return state.loaiNguoiDung?.map((item, index) => {
            if (index == 0) {
                return <option value={item.maLoaiNguoiDung} selected >{item.tenLoai}</option>

            }
            else {
                return <option value={item.maLoaiNguoiDung} >{item.tenLoai}</option>

            }

        })
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            soDT: '',
            maNhom: GROUPID,
            maLoaiNguoiDung: 'KhachHang'
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required("User name is required"),
            email: Yup.string().required("Email is required").email("Email is not valid"),
            matKhau: Yup.string().required("Password is required").min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"),
            hoTen: Yup.string().required("Name is required"),
            soDT: Yup.string().required("Phone is required"),
        }),
        onSubmit: (values) => {
            dispatch(themNguoiDungAction(values));
        }
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <div className="text-gray-600 body-font flex flex-row">
                    <div className="container px-5 pt-10 mx-auto">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            <input name="email" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.email && formik.touched.email && (
                                <div className="text-rose-600">{formik.errors.email}</div>
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Họ tên</div>
                            <input name="hoTen" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.hoTen && formik.touched.hoTen && (
                                <div className="text-rose-600">{formik.errors.hoTen}</div>
                            )}
                        </div>
                        <div className="mt-5">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Số điện thoại</div>
                            <input name="soDT" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                            {formik.errors.soDT && formik.touched.soDT && (
                                <div className="text-rose-600">{formik.errors.soDT}</div>
                            )}
                        </div>
                    </div>
                    <div className="container px-5 py-10 mx-auto">
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                            <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
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
                                {renderLoaiNguoiDung()}
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