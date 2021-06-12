import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Loading from '../pages/Loading/Loading';

export default ({component: Component, ...props}) => {
    const [ ok, setOk ] = useState(false);

    useEffect(() => {

    }, []);

    return <Route 
        component={ ok 
            ? <Component/> 
            : <Loading variant='opaque'/>
        }
    />
};

