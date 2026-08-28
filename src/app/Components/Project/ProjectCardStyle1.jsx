import Image from "next/image";
import Link from "next/link";

const ProjectCardStyle1 = ({img,subTitle,title}) => {
    return (
        <div className="col-lg-8">
        <div className="single-project-box">
            <div className="project-thumb">
                 <Image src={img} alt="img" width={856} height={457}   />
                <div className="project-content">
                    <h5>{subTitle}</h5>
                    <h2>{title}</h2>
                    <Link href="/service"><i className="bi bi-arrow-right-short"></i></Link>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ProjectCardStyle1;
