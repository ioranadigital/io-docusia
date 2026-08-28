import BlogSidebar from '@/app/Components/BlogSidebar/BlogSidebar';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                bgImg="/assets/images/resource/inner-bg.jpg"
                subTitle="Blog Sidebar"
                title="Blog List"
                content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis"
            ></BreadCumb>
            <BlogSidebar></BlogSidebar>
        </div>
    );
};

export default page;