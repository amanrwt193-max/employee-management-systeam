
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const companies = [
  {
    name: "TCS",
    fullName: "Tata Consultancy Services",
    category: "IT Services & Consulting",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
    description: "Technology services and digital transformation."
  },
  {
    name: "Infosys",
    fullName: "Infosys Limited",
    category: "IT Consulting & Software",
    location: "Bengaluru, India",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900",
    description: "Digital services, cloud and enterprise solutions."
  },
  {
    name: "Wipro",
    fullName: "Wipro Limited",
    category: "Technology & Consulting",
    location: "Bengaluru, India",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900",
    description: "Technology consulting and business solutions."
  },
  {
    name: "HCLTech",
    fullName: "HCL Technologies",
    category: "IT Services",
    location: "Noida, India",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=900",
    description: "Engineering, software and digital technology."
  },
  {
    name: "Accenture",
    fullName: "Accenture",
    category: "Global IT Consulting",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&sat=-30",
    description: "Technology, strategy and digital transformation."
  },
  {
    name: "Tech Mahindra",
    fullName: "Tech Mahindra Limited",
    category: "IT & Telecom Services",
    location: "Pune, India",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&sat=-40",
    description: "IT solutions, consulting and telecom technology."
  },
  {
    name: "Cognizant",
    fullName: "Cognizant Technology Solutions",
    category: "IT & Digital Services",
    location: "Chennai, India",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&sat=-40",
    description: "Digital engineering and business technology."
  },
  {
    name: "IBM",
    fullName: "International Business Machines",
    category: "Cloud, AI & Technology",
    location: "Bengaluru, India",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=900&sat=-30",
    description: "Enterprise technology, cloud and AI solutions."
  }
];

function Companies() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".company-card");

    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="companies-page">

      <div className="page-heading">
        <span>BUSINESS DIRECTORY</span>

        <h1>Explore Top IT Companies</h1>

        <p>
          Discover leading technology companies, explore their work
          culture and understand the skills they look for.
        </p>
      </div>

      <div className="company-directory-info">
        <div>
          <h2>Popular Technology Companies</h2>
          <p>Explore company profiles and career information.</p>
        </div>

        <span className="company-count">
          {companies.length} Companies
        </span>
      </div>

      <div className="companies-grid" ref={gridRef}>

        {companies.map((company) => (
          <article
            className="company-card"
            key={company.name}
            onClick={() =>
              navigate(
                `/company/${encodeURIComponent(company.name)}`
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(
                  `/company/${encodeURIComponent(company.name)}`
                );
              }
            }}
          >
            <div className="company-image">
              <img
                src={company.image}
                alt={`${company.name} office`}
                loading="lazy"
              />

              <span className="company-category">
                {company.category}
              </span>
            </div>

            <div className="company-card-content">

              <h3>{company.name}</h3>

              <p className="company-full-name">
                {company.fullName}
              </p>

              <p className="company-description">
                {company.description}
              </p>

              <div className="company-card-bottom">
                <span>📍 {company.location}</span>
                <strong>View Profile ↗</strong>
              </div>

            </div>
          </article>
        ))}

      </div>

    </div>
  );
}

export default Companies;
