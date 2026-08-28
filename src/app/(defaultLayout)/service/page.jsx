import About4 from '@/app/Components/About/About4';
import Choose from '@/app/Components/Choose/Choose';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Cta from '@/app/Components/Cta/Cta';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="Services"
                title="We Provide Awesome <br>SEO Services."
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <About4></About4>
            <Choose></Choose>
            <Cta></Cta>
        </div>
    );
};

export default page;