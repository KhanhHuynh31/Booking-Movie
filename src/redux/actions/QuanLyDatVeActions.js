import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { connection } from '../../index';


export const layChiTietPhongVeAction = (maLichChieu) => {


    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch,getState) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({type:DAT_VE_HOAN_TAT})
            await dispatch(hideLoadingAction);
            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
            connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu);
           dispatch({type:CHUYEN_TAB});

        } catch (error) {
            alert(error.response.data.message +', '+ error.response.data.content);
        }
    }

}
export const datGheAction = (ghe,maLichChieu) => {
    return async (dispatch,getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        });
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);
    }
}