
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import api from "../service/api";

const cityData = {
  Bengaluru: {
    state: "Karnataka",
    tagline: "India's Silicon Valley",
    description:
      "Bengaluru is one of India's leading technology hubs, known for software development, startups and IT services.",
    areas: ["Whitefield", "Electronic City", "Outer Ring Road"],
    companies: ["Infosys", "Wipro", "TCS", "Accenture"],
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200"
  },
  Hyderabad: {
    state: "Telangana",
    tagline: "A Growing Technology Hub",
    description:
      "Hyderabad is a major IT destination with technology parks, global companies and a growing startup ecosystem.",
    areas: ["HITEC City", "Gachibowli", "Madhapur"],
    companies: ["Microsoft", "Google", "Amazon", "TCS"],
    image:
      "https://images.unsplash.com/photo-1565552629470-9f1f3b3b2c5d?w=1200"
  },
  Pune: {
    state: "Maharashtra",
    tagline: "Technology and Innovation",
    description:
      "Pune has a strong IT and education ecosystem with software companies and technology parks.",
    areas: ["Hinjawadi", "Kharadi", "Magarpatta"],
    companies: ["Infosys", "Wipro", "TCS", "Cognizant"],
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200"
  },
  Noida: {
    state: "Uttar Pradesh",
    tagline: "A Major IT Destination",
    description:
      "Noida is an important technology and business hub in the Delhi NCR region.",
    areas: ["Sector 62", "Sector 125", "Sector 135"],
    companies: ["HCLTech", "TCS", "Infosys", "Tech Mahindra"],
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200"
  },
  Chennai: {
    state: "Tamil Nadu",
    tagline: "IT and Industrial Excellence",
    description:
      "Chennai has a large IT services industry supported by technology parks and a skilled workforce.",
    areas: ["OMR", "Taramani", "Sholinganallur"],
    companies: ["TCS", "Infosys", "Cognizant", "Accenture"],
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200"
  },
  Mumbai: {
    state: "Maharashtra",
    tagline: "Business and Technology Centre",
    description:
      "Mumbai combines a major financial sector with technology, consulting and software services.",
    areas: ["Powai", "Andheri", "Navi Mumbai"],
    companies: ["TCS", "LTI Mindtree", "Accenture", "Capgemini"],
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200"
  }
};

function CityDetails() {
  const { name } = useParams();
  const cityName = decodeURIComponent(name);

  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    }
  });

  const city = cityData[cityName];

  const cityEmployees = employees.filter(
    (employee) =>
      employee.address?.city?.toLowerCase() === cityName.toLowerCase()
  );

  if (isLoading) return <h2>Loading city details...</h2>;
  if (isError) return <h2>Unable to load city details.</h2>;

  if (!city) {
    return (
      <div className="city-details-page">
        <h2>City not found</h2>
        <Link to="/cities">Back to Cities</Link>
      </div>
    );
  }

  return (
    <div className="city-details-page">

      <Link to="/cities" className="back-link">
        ← Back to Cities
      </Link>

      <div className="city-detail-hero">
        <img src={city.image} alt={cityName} />

        <div className="city-detail-overlay">
          <span>CITY PROFILE</span>
          <h1>{cityName}</h1>
          <h3>{city.state}</h3>
          <p>{city.tagline}</p>
        </div>
      </div>

      <section className="city-overview">
        <h2>About {cityName}</h2>
        <p>{city.description}</p>
      </section>

      <div className="city-stats-grid">
        <div className="city-stat-card">
          <span>Registered Employees</span>
          <h2>{cityEmployees.length}</h2>
        </div>

        <div className="city-stat-card">
          <span>IT Companies Listed</span>
          <h2>{city.companies.length}</h2>
        </div>

        <div className="city-stat-card">
          <span>Major IT Areas</span>
          <h2>{city.areas.length}</h2>
        </div>
      </div>

      <section className="city-section">
        <h2>Major IT Hubs</h2>

        <div className="city-tags">
          {city.areas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="city-section">
        <h2>Major IT Companies</h2>

        <div className="city-tags company-tags">
          {city.companies.map((company) => (
            <span key={company}>{company}</span>
          ))}
        </div>
      </section>

      <section className="city-section">
        <h2>Employees Located in {cityName}</h2>

        {cityEmployees.length === 0 ? (
          <p className="empty-message">
            No employee records found for this city in the current dataset.
          </p>
        ) : (
          <div className="city-employee-list">
            {cityEmployees.map((employee) => (
              <div className="city-employee-card" key={employee.id}>
                <div className="city-employee-avatar">
                  {employee.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="city-employee-info">
                  <h3>{employee.name}</h3>
                  <p>{employee.email}</p>
                  <span>{employee.company?.name}</span>
                </div>

                <Link to={`/employee/${employee.id}`}>
                  View Profile →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default CityDetails;
