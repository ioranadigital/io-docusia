import BreadCumb from '@/app/Components/Common/BreadCumb';
import Cta from '@/app/Components/Cta/Cta';
import Faq from '@/app/Components/Faq/Faq';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="Faq"
                title="Meet Our Most Experts <br>Team Members"
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <Faq></Faq>
            <Cta></Cta>
        </div>
    );
};

export default page;