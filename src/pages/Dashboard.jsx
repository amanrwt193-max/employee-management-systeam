
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../service/api";

function Dashboard() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const response = await api.get("/users");
            return response.data;
        }
    });

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <h2>Preparing your dashboard...</h2>
                <p>Loading employee information</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="dashboard-error">
                <h2>Unable to load dashboard</h2>
                <p>Please check your connection and try again.</p>
                <button onClick={() => refetch()}>
                    Retry
                </button>
            </div>
        );
    }

    const employees = data || [];

    const totalEmployees = employees.length;

    const totalCompanies = new Set(
        employees.map((employee) => employee.company?.name)
    ).size;

    const totalCities = new Set(
        employees.map((employee) => employee.address?.city)
    ).size;

    // Company-wise employee count
    const companyStats = Object.entries(
        employees.reduce((result, employee) => {
            const company = employee.company?.name || "Other";
            result[company] = (result[company] || 0) + 1;
            return result;
        }, {})
    ).sort((a, b) => b[1] - a[1]);

    // City-wise employee count
    const cityStats = Object.entries(
        employees.reduce((result, employee) => {
            const city = employee.address?.city || "Other";
            result[city] = (result[city] || 0) + 1;
            return result;
        }, {})
    ).sort((a, b) => b[1] - a[1]);

    const maxCompany = Math.max(
        ...companyStats.map((item) => item[1]),
        1
    );

    const maxCity = Math.max(
        ...cityStats.map((item) => item[1]),
        1
    );

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="dashboard-page">

            {/* WELCOME SECTION */}
            <section className="dashboard-hero">
                <div className="hero-content">
                    <span className="hero-label">
                        OVERVIEW / DASHBOARD
                    </span>

                    <h1>
                        Employee Management
                        <span> Dashboard</span>
                    </h1>

                    <p>
                        Welcome back! Here's what's happening
                        with your workforce today.
                    </p>

                    <div className="hero-date">
                        <span>◷</span> {today}
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-circle circle-one"></div>
                    <div className="hero-circle circle-two"></div>

                    <div className="hero-emoji">
                        👨‍💻
                    </div>

                    <span className="hero-floating-icon">
                        ✦
                    </span>
                </div>
            </section>

            {/* STATISTICS */}
            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <span className="section-label">
                            YOUR WORKSPACE
                        </span>
                        <h2>Dashboard Overview</h2>
                    </div>

                    <span className="live-indicator">
                        <i></i> Live Data
                    </span>
                </div>

                <div className="stats-grid">

                    {/* EMPLOYEES */}
                    <Link to="/employees" className="stat-card stat-purple">
                        <div className="stat-top">
                            <span className="stat-icon">👥</span>
                            <span className="stat-arrow">↗</span>
                        </div>

                        <p>Total Employees</p>
                        <h3>{totalEmployees}</h3>
                        <span className="stat-caption">
                            Registered employees
                        </span>
                    </Link>

                    {/* COMPANIES */}
                    <Link to="/companies" className="stat-card stat-blue">
                        <div className="stat-top">
                            <span className="stat-icon">🏢</span>
                            <span className="stat-arrow">↗</span>
                        </div>

                        <p>Total Companies</p>
                        <h3>{totalCompanies}</h3>
                        <span className="stat-caption">
                            Explore company profiles
                        </span>
                    </Link>

                    {/* CITIES */}
                    <Link to="/cities" className="stat-card stat-cyan">
                        <div className="stat-top">
                            <span className="stat-icon">📍</span>
                            <span className="stat-arrow">↗</span>
                        </div>

                        <p>Total Cities</p>
                        <h3>{totalCities}</h3>
                        <span className="stat-caption">
                            Explore city locations
                        </span>
                    </Link>

                    {/* ADD EMPLOYEE */}
                    <Link to="/add-employee" className="stat-card stat-orange">
                        <div className="stat-top">
                            <span className="stat-icon">➕</span>
                            <span className="stat-arrow">↗</span>
                        </div>

                        <p>Add New Employee</p>
                        <h3>+</h3>
                        <span className="stat-caption">
                            Create a new employee record
                        </span>
                    </Link>

                </div>
            </section>

            {/* ANALYTICS */}
            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <span className="section-label">
                            DATA INSIGHTS
                        </span>
                        <h2>Workforce Analytics</h2>
                    </div>
                </div>

                <div className="analytics-grid">

                    {/* COMPANY CHART */}
                    <div className="analytics-card">
                        <div className="analytics-title">
                            <div>
                                <h3>Company Distribution</h3>
                                <p>Employees by company</p>
                            </div>

                            <span className="analytics-icon">🏢</span>
                        </div>

                        <div className="bar-chart">
                            {companyStats.slice(0, 5).map(
                                ([company, count]) => (
                                    <div
                                        className="bar-item"
                                        key={company}
                                    >
                                        <div className="bar-info">
                                            <span>{company}</span>
                                            <strong>{count}</strong>
                                        </div>

                                        <div className="bar-track">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: `${(count / maxCompany) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* CITY CHART */}
                    <div className="analytics-card">
                        <div className="analytics-title">
                            <div>
                                <h3>City Distribution</h3>
                                <p>Employees by location</p>
                            </div>

                            <span className="analytics-icon">🌍</span>
                        </div>

                        <div className="bar-chart">
                            {cityStats.slice(0, 5).map(
                                ([city, count]) => (
                                    <div
                                        className="bar-item"
                                        key={city}
                                    >
                                        <div className="bar-info">
                                            <span>{city}</span>
                                            <strong>{count}</strong>
                                        </div>

                                        <div className="bar-track">
                                            <div
                                                className="bar-fill bar-fill-cyan"
                                                style={{
                                                    width: `${(count / maxCity) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* RECENT EMPLOYEES */}
            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <span className="section-label">
                            EMPLOYEE DIRECTORY
                        </span>
                        <h2>Recent Employees</h2>
                    </div>

                    <Link to="/employees" className="view-all-link">
                        View All Employees →
                    </Link>
                </div>

                <div className="recent-employees">
                    {employees.slice(0, 5).map((employee) => (
                        <div
                            className="recent-employee"
                            key={employee.id}
                        >
                            <div className="employee-avatar">
                                {employee.name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()}
                            </div>

                            <div className="employee-info">
                                <h4>{employee.name}</h4>
                                <p>{employee.email}</p>
                            </div>

                            <div className="employee-company">
                                <span>Company</span>
                                <strong>{employee.company?.name}</strong>
                            </div>

                            <div className="employee-location">
                                <span>Location</span>
                                <strong>{employee.address?.city}</strong>
                            </div>

                            <Link
                                to={`/employee/${employee.id}`}
                                className="employee-view"
                            >
                                View →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="dashboard-section">
                <div className="section-heading">
                    <div>
                        <span className="section-label">
                            QUICK ACCESS
                        </span>
                        <h2>Quick Actions</h2>
                    </div>
                </div>

                <div className="quick-actions">

                    <Link to="/add-employee" className="action-card">
                        <span className="action-icon">＋</span>
                        <div>
                            <h3>Add Employee</h3>
                            <p>Create a new employee record</p>
                        </div>
                        <span className="action-arrow">→</span>
                    </Link>

                    <Link to="/employees" className="action-card">
                        <span className="action-icon">👥</span>
                        <div>
                            <h3>Manage Employees</h3>
                            <p>View and manage employee records</p>
                        </div>
                        <span className="action-arrow">→</span>
                    </Link>

                </div>
            </section>

            <div className="dashboard-footer">
                <p>EmployeeMS · Employee Management System</p>
                <span>Dashboard powered by live API data</span>
            </div>

        </div>
    );
}

export default Dashboard;
