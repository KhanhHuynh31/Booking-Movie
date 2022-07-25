import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimType";
import { history } from '../../util/history'
import { notifiFunction } from '../../util/Notification/notificationCyberbugs'



export const layDanhSachPhimAction = (tenPhim='') => {
    

    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

             dispatch({
                 type:SET_DANH_SACH_PHIM,
                 arrFilm:result.data.content
             })
        }catch (error) {
            console.log("error",error.response.data);
        }
    };
}
export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            notifiFunction('success', 'Insert successfully !')
            history.push('/admin/films');
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content)
        }
    }
}
export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {

            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            notifiFunction('success', 'Update successfully !')
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content)
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (error) {
            console.log("error",error.response.data);
        }
    };
}
export const xoaPhimAction = (maPhim) => {


    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            notifiFunction('success', 'Delete successfully !')
            dispatch(layDanhSachPhimAction())
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content)
        }
    }
}