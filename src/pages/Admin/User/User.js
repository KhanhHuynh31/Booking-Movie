import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../util/history';
const { Search } = Input;

export default function User() {
  const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, [])
  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      width: '10%',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      width: '15%',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      width: '15%'
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      width: '15%'
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      width: '15%',
      sorter: (a, b) => {
        let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
        let maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Hành động',
      dataIndex: 'taikhoan',
      render: (text, user) => {
        return <Fragment>
          <NavLink key={1} className=" mr-2  text-2xl" to={`edit/${user.taiKhoan}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
          <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
            if (window.confirm('Bạn có chắc muốn xoá phim ' + user.taiKhoan)) {
              dispatch(xoaNguoiDungAction(user.taiKhoan));
            }
          }}><DeleteOutlined style={{ color: 'red' }} /> </span>
        </Fragment>
      },
      width: '15%'
    },
  ];
  const data = danhSachNguoiDung;
  const onSearch = value => {
    dispatch(layDanhSachNguoiDungAction(value));
  };
  return (
    <div>


      <h3 className="text-4xl">Quản lý Tài Khoản</h3>
      <Button className="mb-5" onClick={() => {
        history.push('/admin/users/addnew');
      }}>Thêm người dùng</Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"

        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} rowKey={"taiKhoan"} />
    </div>
  )
}
