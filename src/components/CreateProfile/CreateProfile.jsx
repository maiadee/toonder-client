import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { profileCreate } from '../../services/profileService'; 
 

export default function CreateProfile() {
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        location: "",
        bio: "",
        gender: "",
        preferences: "",
        image1: "",
        image2: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            formData.age = Number(formData.age)
            console.log(formData)
            await profileCreate(formData)
            navigate('/profiles/index');
        
        } catch (error) {
            setErrors(error.response.data.errors || { general: "Failed to create profile." });
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <h2>Create Profile</h2>
            {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
            <form onSubmit={handleSubmit}>
                <label>Image 1:</label>

                <label>Name:</label>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Age:</label>
                <input id="age" type="number" name="age" value={formData.age} onChange={handleChange} required />

                <label>Location:</label>
                <input id="location" type="text" name="location" value={formData.location} onChange={handleChange} required />

                <label>Bio:</label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />

                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Looking For:</label>
                <select name="preferences" value={formData.preferences} onChange={handleChange} required>
                    <option value="" disabled>Select Preference</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="no preference">No Preference</option>
                </select>

                <label>Image 2:</label>

                <button type="submit">Create Profile</button>
            </form>
        </>
    );
};
