import Link from 'next/link';
import data from '../../Data/blog.json';
import Image from "next/image";

const BlogGrid = () => {
    return (
        <div className="blogs-section">
    <div className="container">
      <div className="row">
            {data.map((item, i) => (
        <div key={i} className="col-lg-4 col-md-6">
          <div className="single-blog-box">
            <div className="blog-thumb">
            <Image src={item.img} alt="img" width={379} height={280}   />
            </div>
            <div className="blog-content">
              <h2 className="blog-title"><Link href="/blog/blog-details">{item.title}</Link></h2>
              <p className="blog-desc">{item.desc}</p>
              <div className="blog-btn">
                <Link href="/blog/blog-details">Read More</Link>
              </div>
            </div>
          </div>
        </div>
                ))}

      </div>
    </div>
  </div>
    );
};

export default BlogGrid;
