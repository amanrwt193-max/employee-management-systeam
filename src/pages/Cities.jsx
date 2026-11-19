
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

function Cities() {
  const navigate = useNavigate();

  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    }
  });

  if (isLoading) return <h2>Loading cities...</h2>;
  if (isError) return <h2>Unable to load cities.</h2>;

  const cities = Object.values(
    employees.reduce((result, employee) => {
      const name = employee.address?.city || "Other";

      if (!result[name]) {
        result[name] = {
          name,
          employees: []
        };
      }

      result[name].employees.push(employee);
      return result;
    }, {})
  );

  const cityImages = [
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800"
  ];

  return (
    <div className="cities-page">
      <div className="page-heading">
        <span>LOCATION DIRECTORY</span>
        <h1>Explore Cities</h1>
        <p>Discover the cities where our employees are located.</p>
      </div>

      <div className="cities-grid">
        {cities.map((city, index) => (
          <div
            className="city-card"
            key={city.name}
            onClick={() =>
              navigate(`/city/${encodeURIComponent(city.name)}`)
            }
          >
            <img
              src={cityImages[index % cityImages.length]}
              alt={`${city.name} city`}
            />

            <div className="city-card-content">
              <h3>{city.name}</h3>

              <p>
                {city.employees.length} Employees
              </p>

              <span>Explore City →</span>
            </div>
          </div>
        ))}
      </div>s
    </div>
  );
}

export default Cities;
