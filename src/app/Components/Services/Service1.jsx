"use client"
import { useEffect } from "react";
import ServiceCard from "./ServiceCard";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Image from "next/image";

const Service1 = () => {

    const HeadingContent = {
        title1:'Improve your Business',
        title2:'to the Next Levels',
        Content:'Ullamcorper risus ultrices risus lorem. Mollis libero in pellentesque Vulputate ut aliquam, consectetur turpis',
      }

      useEffect(() => {
        loadBackgroudImages();
      }, []);


    return (
        <div className="service-section service" data-background="/assets/images/resource/service-bg.jpg">
    <div className="container">
      <div className="row dream1-bg">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <div className="dexon-section-title white padding-lg1">
                <h1>{HeadingContent.title1}</h1>
                <h1 className="sections">{HeadingContent.title2}</h1>
                <p>{HeadingContent.Content}</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="single-service-box upper2">
                            <ServiceCard
                                title="Social Media Mastery"
                                content="Competently leverage other's diverse action items via vertical to aollaboratively harness ubiquitous materials"
                                btnName="Read More"
                                btnUrl="/service/service-details"
                            ></ServiceCard>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-service-box upper">
                            <ServiceCard
                                title="Customer Increasing"
                                content="Competently leverage other's diverse action items via vertical to aollaboratively harness ubiquitous materials"
                                btnName="Read More"
                                btnUrl="/service/service-details"
                            ></ServiceCard>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="single-service-box upper3">
                            <ServiceCard
                                title="Sales Statistics"
                                content="Competently leverage other's diverse action items via vertical to aollaboratively harness ubiquitous materials"
                                btnName="Read More"
                                btnUrl="/service/service-details"
                            ></ServiceCard>
              </div>
            </div>

          </div>
        </div>
        <div className="service-shape">
          <div className="serivce-shape">
          <Image src="/assets/images/resource/shap-2.png" alt="img" width={40} height={40}   />
          </div>
          <div className="serivce-shape2">
            <Image src="/assets/images/resource/shape3.png" alt="img" width={70} height={69}   />
          </div>
        </div>
      </div>
    </div>
  </div>

    );
};

export default Service1;
