import React from 'react';
import HeroBanner1 from '../Components/HeroBanner/HeroBanner1';
import Feature1 from '../Components/Feature/Feature1';
import Service1 from '../Components/Services/Service1';
import Testimonial1 from '../Components/Testimonial/Testimonial1';
import Cta from '../Components/Cta/Cta';

const Home = () => {
    return (
        <div>
            <HeroBanner1
                bgmage="/assets/images/slider/hero-bg.jpg"
                Title1="Digital Products"
                Title2="Use Marketing"
                content="Distinctively supply exceptional services after uniquely integrate alternative markets rather emerging initiatives."
                btnName=" Get Started"
                btnUrl="/about"
                heroShape1="/assets/images/slider/hero-shp1.png"
                heroShape2="/assets/images/slider/hero-shp2.png"
                heroShape3="/assets/images/slider/circle.png"
            ></HeroBanner1>
            <Feature1></Feature1>
            <Service1></Service1>
            <Testimonial1></Testimonial1>
            <Cta></Cta>
        </div>
    );
};

export default Home;