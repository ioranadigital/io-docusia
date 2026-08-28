"use client"
import { useEffect } from "react";
import SectionTitle from "../Common/SectionTitle";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Slider from "react-slick";
import data from '../../Data/testimonial1.json';
import CounterCard from "./CounterCard";
import Link from "next/link";
import Image from "next/image";

const Testimonial1 = () => {

    useEffect(() => {
        loadBackgroudImages();
      }, []);

      const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 2,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };     

    return (
        <div className="testimoonial-section" data-background="/assets/images/resource/testi-bg.jpg">
    <div className="container">
      <div className="row dream-bg center">
        <div className="col-lg-12">
          <div className="dexon-section-title padding-lg text-center dreamit">
                        <SectionTitle
                            Title="What Say Our Customers <br> About Dexon"
                            Content="Distinctively supply exceptional services after uniquely integrate alternative markets rather emerging initiatives."
                        ></SectionTitle>
          </div>
        </div>
        <div className="dream-shape">
          <Image src="/assets/images/resource/border2.png" alt="img" width={774} height={172}   />
        </div>
        <div className="testi-all-shape">
          <div className="testi-shape1">
          <Image src="/assets/images/resource/sml-shape2.png" alt="img" width={30} height={30}   />
          </div>
          <div className="testi-shape">
          <Image src="/assets/images/resource/shape4.png" alt="img" width={52} height={51}   />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="testi-list owl-carousel cs_slider_gap_30">
                    <Slider {...settings}>
                    {data.map((item, index)=>(
          <div key={index} className="col-lg-12">
            <div className="testimonial-single-box">
              <div className="testi-people">
              <Image src={item.image} alt="img" width={75} height={75}   />
              </div>
              <div className="people-name">
                <h2> {item.title} </h2>
                <span>{item.subTitle}</span>
              </div>
              <div className="testi-description">
                <p>“{item.desc}”</p>
              </div>
              <div className="company-logo">
                <a href="#"><Image src={item.icon} alt="img" width={75} height={25}   /></a>
              </div>
              <div className="company-rating">
                <ul>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-fill"></i></li>
                  <li><i className="bi bi-star-half"></i></li>
                </ul>
              </div>
            </div>
          </div>
                    ))}
                    </Slider>
        </div>
      </div>
      <div className="row align-items-center about-bg2">
        <div className="col-lg-6">
          <div className="dexon-section-title">
                    <SectionTitle
                            Title="We use various marketing <br> channels to reach Sales"
                            Content="Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque potenti. Vulputate ut aliquam, consectetur turpis odio."
                     ></SectionTitle>
          </div>
          <div className="about-counter-style">
            <div className="row">
                            <CounterCard
                                number="50"
                                content="Content Strategy"                           
                            ></CounterCard>
                            <CounterCard
                                number="70"
                                content="Audience Growup"                           
                            ></CounterCard>
            </div>
          </div>
          <div className="dexon-button">
            <Link className="dexon-button" href="/about">Learn More <i className="bi bi-arrow-right-short"></i></Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-thumb2">
              <Image src="/assets/images/resource/about2.png" alt="img" width={521} height={521}   />
            <div className="about-shape">
              <Image src="/assets/images/resource/shape-2.png" alt="img" width={46} height={46}   />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    );
};

export default Testimonial1;
