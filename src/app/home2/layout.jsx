import React from 'react';
import Footer2 from '../Components/Footer/Footer2';
import HeaderStyle2 from '../Components/Header/HeaderStyle2';

export const dynamic = 'force-dynamic';

const layout = ({ children }) => {
    return (
        <div className='main-page-area2'>
            <HeaderStyle2></HeaderStyle2>
            {children}
            <Footer2></Footer2>
        </div>
    );
};

export default layout;