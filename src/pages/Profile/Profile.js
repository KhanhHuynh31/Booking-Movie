import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { GROUPID } from '../../util/settings/config';
import { updateUserAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { useDispatch } from 'react-redux';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./Profile.css"
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment';

const { TabPane } = Tabs;

const Profile = () => {
    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(layThongTinNguoiDungAction());
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            hoTen: thongTinNguoiDung.hoTen,
            soDT: thongTinNguoiDung.soDT,
            maNhom: GROUPID,
            maLoaiNguoiDung: 'KhachHang'
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is not valid"),
            matKhau: Yup.string().required("Password is required").min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"),
            hoTen: Yup.string().required("Name is required"),
            soDT: Yup.number().required("Phone is required"),
          }),
        onSubmit: (values) => {
            dispatch(updateUserAction(values));
        }
    })
    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);

            return <div className="p-2 lg:w-1/2 md:w-1/1 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
                        <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                        <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
                        <p>
                            <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                        </p>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <div className="flex flex-col sm:flex-row pt-28 px-10">
            <div className="sm:w-1/4 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                    </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{thongTinNguoiDung.hoTen}</h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                </div>
            </div>

            <div className="sm:w-3/4 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <AppleOutlined />
                                THÔNG TIN CÁ NHÂN
                            </span>
                        }
                        key="1"
                    >
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
                                            <div className="text-rose-600">{formik.errors.soDt}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="container px-5 py-10 mx-auto">
                                    <div>
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                                        <input disabled name="taiKhoan" value={formik.values.taiKhoan} onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
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

                                </div>
                            </div>
                            <div className="text-right">
                                <button type="submit" className="mt-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Cập nhật</button>
                            </div>
                        </form>



                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                LỊCH SỬ ĐẶT VÉ
                            </span>
                        }
                        key="2"
                    >
                        <div className="flex flex-wrap -m-2">
                            {renderTicketItem()}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div >

    )
}
export default Profile;