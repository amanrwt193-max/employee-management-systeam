
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const companyData = {
  "TCS": {
    fullName: "Tata Consultancy Services",
    industry: "IT Services & Consulting",
    location: "Mumbai, India",
    founded: "1968",
    website: "https://www.tcs.com",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
    description:
      "Tata Consultancy Services is a global IT services and consulting company. It works with businesses to build software, manage technology systems and deliver digital transformation solutions.",
    services: ["Software Development", "Cloud Computing", "Data Analytics", "Cybersecurity"],
    skills: ["JavaScript", "React", "Java", "Python", "SQL", "Problem Solving"],
    requirements: [
      "Bachelor's degree or relevant qualification for the role.",
      "Understanding of programming fundamentals.",
      "Knowledge of databases and software development.",
      "Good communication and teamwork skills.",
      "Willingness to learn new technologies."
    ]
  },

  "Infosys": {
    fullName: "Infosys Limited",
    industry: "IT Consulting & Software",
    location: "Bengaluru, India",
    founded: "1981",
    website: "https://www.infosys.com",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200",
    description:
      "Infosys is a global technology and consulting company that helps organizations with digital services, software engineering, cloud solutions and business transformation.",
    services: ["Digital Transformation", "Cloud Services", "AI Solutions", "Software Engineering"],
    skills: ["JavaScript", "React", "Python", "Java", "SQL", "Data Structures"],
    requirements: [
      "Relevant educational qualification depending on the role.",
      "Strong programming and logical thinking skills.",
      "Understanding of software development concepts.",
      "Ability to work in a collaborative team.",
      "Good problem-solving skills."
    ]
  },

  "Wipro": {
    fullName: "Wipro Limited",
    industry: "Technology & Consulting",
    location: "Bengaluru, India",
    founded: "1945",
    website: "https://www.wipro.com",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    description:
      "Wipro provides technology consulting and IT services to organizations around the world, helping them improve business operations and build digital products.",
    services: ["IT Consulting", "Cloud Computing", "Cybersecurity", "Application Development"],
    skills: ["HTML", "CSS", "JavaScript", "React", "SQL", "Python"],
    requirements: [
      "Relevant qualification for the selected position.",
      "Basic understanding of programming languages.",
      "Knowledge of web or software technologies.",
      "Good communication skills.",
      "Ability to learn and adapt."
    ]
  },

  "HCLTech": {
    fullName: "HCL Technologies",
    industry: "IT Services & Engineering",
    location: "Noida, India",
    founded: "1976",
    website: "https://www.hcltech.com",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200",
    description:
      "HCLTech is a global technology company providing software, engineering, infrastructure and digital transformation services.",
    services: ["Software Development", "Engineering", "Cloud Services", "Digital Solutions"],
    skills: ["React", "JavaScript", "Java", "Python", "SQL", "Git"],
    requirements: [
      "Relevant degree or qualification depending on the role.",
      "Understanding of software development.",
      "Knowledge of programming and databases.",
      "Strong analytical skills.",
      "Teamwork and communication abilities."
    ]
  },

  "Accenture": {
    fullName: "Accenture",
    industry: "Global IT Consulting",
    location: "Mumbai, India",
    founded: "1989",
    website: "https://www.accenture.com",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200",
    description:
      "Accenture is a global professional services company working in technology, consulting, strategy and digital transformation.",
    services: ["Technology Consulting", "AI & Data", "Cloud", "Digital Engineering"],
    skills: ["JavaScript", "React", "Python", "SQL", "Cloud", "Communication"],
    requirements: [
      "Qualification requirements vary by job role.",
      "Knowledge of relevant technical concepts.",
      "Problem-solving and analytical thinking.",
      "Ability to collaborate with teams.",
      "Interest in learning modern technologies."
    ]
  },

  "Tech Mahindra": {
    fullName: "Tech Mahindra Limited",
    industry: "IT & Telecom Services",
    location: "Pune, India",
    founded: "1986",
    website: "https://www.techmahindra.com",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    description:
      "Tech Mahindra provides IT services, consulting and digital solutions across industries, including telecommunications and enterprise technology.",
    services: ["Telecom Solutions", "Software Development", "Cloud", "Digital Transformation"],
    skills: ["HTML", "CSS", "JavaScript", "React", "SQL", "Python"],
    requirements: [
      "Relevant educational background for the position.",
      "Knowledge of programming fundamentals.",
      "Understanding of web or software development.",
      "Communication and teamwork skills.",
      "Willingness to learn."
    ]
  },

  "Cognizant": {
    fullName: "Cognizant Technology Solutions",
    industry: "IT & Digital Services",
    location: "Chennai, India",
    founded: "1994",
    website: "https://www.cognizant.com",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
    description:
      "Cognizant is a technology and consulting company helping businesses modernize technology, improve operations and develop digital solutions.",
    services: ["Digital Engineering", "IT Consulting", "Cloud", "Data & AI"],
    skills: ["JavaScript", "React", "Python", "Java", "SQL", "Testing"],
    requirements: [
      "Relevant qualification depending on the opening.",
      "Programming fundamentals and logical reasoning.",
      "Knowledge of databases and software concepts.",
      "Good communication skills.",
      "Ability to work in a team."
    ]
  },

  "IBM": {
    fullName: "International Business Machines",
    industry: "Cloud, AI & Enterprise Technology",
    location: "Bengaluru, India",
    founded: "1911",
    website: "https://www.ibm.com",
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200",
    description:
      "IBM is a global technology company working in enterprise software, artificial intelligence, cloud computing and consulting services.",
    services: ["Artificial Intelligence", "Cloud Computing", "Enterprise Software", "Data Analytics"],
    skills: ["Python", "Java", "SQL", "React", "Cloud", "Data Structures"],
    requirements: [
      "Relevant educational qualification for the role.",
      "Understanding of programming concepts.",
      "Knowledge of databases and software systems.",
      "Analytical and problem-solving ability.",
      "Good communication and collaboration skills."
    ]
  }
};

function CompanyDetails() {
  const { name } = useParams();
  const companyName = decodeURIComponent(name);

  const company = companyData[companyName];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Frontend Developer",
    skills: "",
    experience: "Fresher",
    resume: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
  }

  if (!company) {
    return (
      <div className="company-not-found">
        <h2>Company not found</h2>
        <p>This company profile is not available.</p>
        <Link to="/companies">← Back to Companies</Link>
      </div>
    );
  }

  return (
    <div className="company-profile-page">

      <Link to="/companies" className="back-link">
        ← Back to Companies
      </Link>

      {/* HERO */}
      <section className="company-profile-hero">
        <img src={company.image} alt={company.fullName} />

        <div className="company-hero-overlay">
          <span className="profile-label">COMPANY PROFILE</span>

          <h1>{company.fullName}</h1>

          <p>{company.industry}</p>

          <div className="company-hero-meta">
            <span>📍 {company.location}</span>
            <span>Founded: {company.founded}</span>
          </div>

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="company-website-btn"
          >
            Official Website ↗
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="company-profile-section">
        <div className="profile-section-heading">
          <span>OVERVIEW</span>
          <h2>About the Company</h2>
        </div>

        <div className="company-about-card">
          <p>{company.description}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="company-profile-section">
        <div className="profile-section-heading">
          <span>WHAT THEY DO</span>
          <h2>Services & Expertise</h2>
        </div>

        <div className="company-services-grid">
          {company.services.map((service) => (
            <div className="company-service-card" key={service}>
              <span>✦</span>
              <h3>{service}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="company-profile-section">
        <div className="profile-section-heading">
          <span>CAREER SKILLS</span>
          <h2>Skills That May Be Useful</h2>
          <p>Relevant skills vary depending on the job position.</p>
        </div>

        <div className="company-skills-card">
          {company.skills.map((skill) => (
            <span className="company-skill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="company-profile-section">
        <div className="profile-section-heading">
          <span>ELIGIBILITY</span>
          <h2>Typical Role Requirements</h2>
        </div>

        <div className="company-requirements-card">
          {company.requirements.map((requirement, index) => (
            <div className="requirement-item" key={index}>
              <span>✓</span>
              <p>{requirement}</p>
            </div>
          ))}

          <p className="requirements-note">
            These are general examples, not confirmed vacancies or
            official hiring criteria. Always check the company's
            official careers page for current openings.
          </p>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="company-profile-section application-section">
        <div className="profile-section-heading">
          <span>CAREER INTEREST</span>
          <h2>Application Interest Form</h2>
          <p>
            Share your details to create a sample application record
            for this project.
          </p>
        </div>

        {submitted ? (
          <div className="application-success">
            <div className="success-icon">✓</div>
            <h2>Application Form Submitted!</h2>
            <p>
              Thank you, {formData.fullName}. Your sample application
              for {company.name || company.fullName} has been captured
              in this demo interface.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form className="company-application-form" onSubmit={handleSubmit}>

            <div className="form-heading">
              <h3>Candidate Information</h3>
              <p>Fields marked * are required.</p>
            </div>

            <div className="application-form-grid">

              <div className="application-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="application-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="application-field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  title="Enter a valid 10 digit phone number"
                  required
                />
              </div>

              <div className="application-field">
                <label>Interested Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option>Frontend Developer</option>
                  <option>React Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Software Engineer</option>
                  <option>Data Analyst</option>
                </select>
              </div>

              <div className="application-field">
                <label>Your Skills *</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, SQL..."
                  required
                />
              </div>

              <div className="application-field">
                <label>Experience Level *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option>Fresher</option>
                  <option>Less than 1 year</option>
                  <option>1-2 years</option>
                  <option>2-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>

              <div className="application-field full-width">
                <label>Resume Link</label>
                <input
                  type="url"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="Paste your Google Drive or portfolio link"
                />
              </div>

            </div>

            <button type="submit" className="application-submit-btn">
              Submit Application Interest →
            </button>

            <p className="form-disclaimer">
              Demo only: this form does not send an application to the
              company. Backend integration will be needed to store
              applications securely.
            </p>

          </form>
        )}
      </section>

    </div>
  );
}

export default CompanyDetails;
