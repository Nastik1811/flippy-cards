import React, {useContext} from 'react'
import {Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../hooks/auth.hook';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {token} = useAuth()
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