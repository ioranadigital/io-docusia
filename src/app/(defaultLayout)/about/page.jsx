import About3 from '@/app/Components/About/About3';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Cta from '@/app/Components/Cta/Cta';
import Feature3 from '@/app/Components/Feature/Feature3';
import Team from '@/app/Components/Team/Team';
import React from 'react';

const page = () => {
    return (
        <div className="about-page">
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="About Us"
                title="Working together leads to <br>Amazing Outcomes."
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <About3></About3>
            <Feature3></Feature3>
            <Team></Team>
            <Cta></Cta>
        </div>
    );
};

export default page;