import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG, UPDATE_USER_ACTION, SET_DANH_SACH_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"


let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    danhSachNguoiDung:[]
}



export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}
        }

        case SET_THONG_TIN_NGUOI_DUNG :{ 
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state};
        }
        case UPDATE_USER_ACTION :{ 
            state.thongTinNguoiDung = action.thongTinUpdate;
            return {...state};
        }
        
        case SET_DANH_SACH_NGUOI_DUNG : {
            state.danhSachNguoiDung = action.danhSachNguoiDung;
            return {...state}
        }


        default:
            return { ...state }
    }
}