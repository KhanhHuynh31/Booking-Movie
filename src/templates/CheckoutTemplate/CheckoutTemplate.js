import React, { Fragment, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { USER_LOGIN } from "../../util/settings/config";
import { useNavigate } from "react-router-dom";

export default function CheckoutTemplate() {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem(USER_LOGIN)) {
            return navigate("/login");
        }
    }, []);
    return (
        <Fragment>
            <br/><br/><br/><br/>
            <Outlet />
        </Fragment>
    )
}


