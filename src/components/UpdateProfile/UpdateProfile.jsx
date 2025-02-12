import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { profileUpdate, profileShow } from "../../services/profileService";

export default function UpdateProfile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        location: "",
        bio: "",
        gender: "",
        preferences: "",
        passions: "",
        icks: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        profileShow(id)
            .then((data) => {
                if (!data || data.id !== user.profile) {
                    setErrors({ message: "You don't have permission to edit this profile." });
                    return;
                }
                setFormData({
                    name: data.name || "",
                    age: data.age || "",
                    location: data.location || "",
                    bio: data.bio || "",
                    gender: data.gender || "",
                    preferences: data.preferences || "",
                    passions: data.passions || "",
                    icks: data.icks || "",
                });
            })
            .catch(() => {
                setErrors({ fetch: "Failed to load profile data." });
            });
    }, [id, user, navigate]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await profileUpdate(id, formData);
            navigate("/profiles/index"); 
        } catch (error) {
            setErrors(error.response?.data?.errors || { general: "Failed to update profile." });
        }
    };

    return (
        <>
            <h1>Update Your Profile</h1>

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                <label>Bio:</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} />

                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label>Looking For:</label>
                <select name="preferences" value={formData.preferences} onChange={handleChange} required>
                    <option value="" disabled>Select Preference</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="No Preference">No Preference</option>
                </select>

                <label>Passions:</label>
                <input
                    type="text"
                    name="passions"
                    placeholder="E.g., Music, Traveling, Fitness"
                    value={formData.passions}
                    onChange={handleChange}
                />

                <label>Icks:</label>
                <input
                    type="text"
                    name="icks"
                    placeholder="E.g., Loud chewing, Being late"
                    value={formData.icks}
                    onChange={handleChange}
                />

                <button type="submit">Update Profile</button>
            </form>
        </>
    );
}
