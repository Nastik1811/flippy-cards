import React, {useContext} from 'react'
import {Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {token} = useContext(AuthContext)
    return (
        <Route 
            {...rest}
            render={routeProps =>   
                !!token ? (
                    <RouteComponent {...routeProps}/>
                ):(
                    <Redirect to={"/"}/>
                )
            } 
        />
    )
}

export default PrivateRoute;