import BlogDetails from '@/app/Components/BlogDetails/BlogDetails';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="Blog"
                title="Blog Details"
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <BlogDetails></BlogDetails>
        </div>
    );
};

export default page;