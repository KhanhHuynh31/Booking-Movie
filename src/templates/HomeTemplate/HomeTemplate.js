import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
export default function HomeTemplate() {
    return (
        <Fragment>
            <Header />
            <Outlet />
            <hr className="mt-5"/>
            <Footer />
        </Fragment>
    )
}
