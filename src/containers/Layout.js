import React from 'react';
import AppBar from '../components/AppBar';

const Layout = ({children}) => {
    return <>
        <AppBar />
        {children}
    </>;
};

export default Layout;