"use client"
import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import parse from 'html-react-parser';
import Image from "next/image";

const About2 = ({bgImg,subTitle,title,content,listItem,peopleImg,peopleContent,mainimage}) => {

    useEffect(() => {
        loadBackgroudImages();
      }, []);
      
    return (
        <div className="about-section" data-background={bgImg}>
    <div className="container">
      <div className="row about-bg">
        <div className="col-lg-6">
          <div className="dexon-section-title white">
            <h4>{subTitle}</h4>
            <h1> {parse(title)} </h1>
            <p>{content}</p>
          </div>
          <div className="about-item-list">
            <ul>
                        {listItem?.map((item, index) => (
              <li key={index}><i className="bi bi-check2-all"></i> {item} </li>
                        ))}
            </ul>
          </div>
          <div className="about-people">
          <Image src={peopleImg} alt="img" width={168} height={56}   />
          </div>
          <div className="people-text">
            <p>{peopleContent}</p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-thumb">
          <Image src={mainimage} alt="img" width={590} height={490}   />
            <div className="about-shape">
            <Image src="/assets/images/resource/shap-1.png" alt="img" width={36} height={36}   />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default About2;
