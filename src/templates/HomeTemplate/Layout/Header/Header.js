import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { history } from '../../../../util/history';
import { Select } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;


export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { t, i18n } = useTranslation();


    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={() => {
                            history.push('/profile')
                        }} >Thông tin tài khoản</a>
                    ),
                    icon: <SmileOutlined />,

                },
                {
                    key: '2',
                    label: (
                        <a onClick={() => {
                            localStorage.removeItem(USER_LOGIN);
                            localStorage.removeItem(TOKEN);
                            history.push('/home');
                            window.location.reload();
                        }}>{t('logout')}</a>
                    ),
                    icon: <SmileOutlined />,
                },
            ]}
        />
    );
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <Link to="/login">
                    <button className="self-center px-4 py-3 rounded">{t('signin')}</button>
                </Link>
                <Link to="/dangky">
                    <button class="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded mr-5">
                        {t('signup')}
                    </button>
                </Link>
            </Fragment>

        }


        return <Fragment>
            <Dropdown overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {userLogin.taiKhoan}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Fragment>
    }
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10" >
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white">{t('home')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" >{t('contact')}</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" >{t('news')}</NavLink>
                    </li>

                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    <div className="mr-20"></div>
                    <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">English</Option>
                        <Option value="vn">Tiếng Việt</Option>
                    </Select>

                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

            </div>
        </header>

    )
}