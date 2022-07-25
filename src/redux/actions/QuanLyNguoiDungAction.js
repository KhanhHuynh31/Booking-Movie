import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService.js"
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG, DANG_KY_ACTION, UPDATE_USER_ACTION, SET_DANH_SACH_NGUOI_DUNG } from "../types/QuanLyNguoiDungType";
import { history } from '../../util/history'
import { notifiFunction } from '../../util/Notification/notificationCyberbugs'


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                notifiFunction('success', 'Login successfully !')
                history.push('/home');
            }
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                })
                history.push('/login');
                notifiFunction('success', 'Sign Up successfully !')
            }
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }
}

export const themNguoiDungAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(thongTinDangKy);
            dispatch(layDanhSachNguoiDungAction());
            history.push('/admin/users');
            notifiFunction('success', 'Sign Up successfully !')
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }
}
export const updateUserAction = (thongTinUpdate) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhat(thongTinUpdate);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: UPDATE_USER_ACTION,
                    thongTinUpdate: result.data.content
                })
                history.push('/home');
                notifiFunction('success', 'Update successfully !')
            }
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }
}

export const capNhatNguoiDungAction = (thongTinUpdate) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatAdmin(thongTinUpdate);
            if (result.data.statusCode === 200) {
                dispatch(layDanhSachNguoiDungAction());
                notifiFunction('success', 'Update successfully !')
                history.push('/admin/users');
            }
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }
}
export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }

        } catch (error) {
            console.log("error",error.response.data);
        }

    }

}

export const layDanhSachNguoiDungAction = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
            dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            })
        } catch (error) {
            console.log("error",error.response.data);
        }
    };
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            notifiFunction('success', 'Delete successfully !')
            dispatch(layDanhSachNguoiDungAction())
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content)
        }
    }
}
