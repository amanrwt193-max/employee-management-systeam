import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../service/api";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["employee", id],
        queryFn: async () => {
            const response = await api.get(`/users/${id}`);
            return response.data;
        },
    });

    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setEmail(data.email || "");
            setCity(data.address?.city || "");
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: async (updatedEmployee) => {
            const response = await api.put(`/users/${id}`, updatedEmployee);
            return response.data;
        },

        onSuccess: () => {
            alert("Employee updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            navigate("/employees");
        },
    });

    function handleSubmit(e) {
        e.preventDefault();

        const updatedEmployee = {
            name,
            email,
            address: {
                city,
            },
        };

        mutation.mutate(updatedEmployee);
    }

    if (isLoading) return <h2>Loading employee...</h2>;
    if (isError) return <h2>Error fetching employee!</h2>;

    return (
        <div>
            <h1>Edit Employee</h1>

            <Link to="/employee">Back to Employees</Link>

            <br /><br />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Employee Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Employee City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Updating..." : "Update Employee"}
                </button>
            </form>
        </div>
    );
}

export default EditEmployee;