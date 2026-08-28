import BreadCumb from '@/app/Components/Common/BreadCumb';
import Contact from '@/app/Components/Contact/Contact';
import Cta2 from '@/app/Components/Cta/Cta2';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="Contact"
                title="Feel Free to Contact with <br>Our Support Team"
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <Contact></Contact>
            <Cta2></Cta2>
        </div>
    );
};

export default page;