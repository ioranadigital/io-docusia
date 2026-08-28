import BreadCumb from '@/app/Components/Common/BreadCumb';
import ServiceDetails from '@/app/Components/ServiceDetails/ServiceDetails';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="Service Details"
                title="We Provide Awesome <br>Service Details"
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <ServiceDetails></ServiceDetails>
        </div>
    );
};

export default page;