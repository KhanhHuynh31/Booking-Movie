import { baseService } from "./baseService";
import { GROUPID } from '../util/settings/config'
export class QuanLyNguoiDungService extends baseService {

    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }
    capNhat = (thongTinUpdate) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinUpdate);
    }
    capNhatAdmin = (thongTinUpdate) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinUpdate);
    }
    layDanhSachNguoiDung = (tuKhoa = '') => {
        if (tuKhoa.trim() != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)

    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }

    themNguoiDung = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinDangKy);
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/layDanhSachLoaiNguoiDung`);
    }
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();