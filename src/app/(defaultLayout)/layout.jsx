import React from 'react';
import HeaderStyle from '../Components/Header/HeaderStyle';
import Footer from '../Components/Footer/Footer';

export const dynamic = 'force-dynamic';

const DefalultLayout = ({ children }) => {
    return (
        <div className='main-page-area'>
            <HeaderStyle></HeaderStyle>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default DefalultLayout;
