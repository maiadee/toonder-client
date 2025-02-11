import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { profileUpdate, profileShow } from '../../services/postService';

export default function UpdateProfile() {
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        location: '',
        bio: '',
        gender: '',
        lookingFor: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { profileId } = useParams();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        profileShow(profileId)
            .then((data) => {
                if (data._id !== user._id) {
                    setErrors({ auth: "You don't have permission to edit this profile." });
                    return;
                }
                setFormData({
                    name: data.name || '',
                    age: data.age || '',
                    location: data.location || '',
                    bio: data.bio || '',
                    gender: data.gender || '',
                    lookingFor: data.lookingFor || '',
                });
            })
            .catch(() => setErrors({ fetch: "Failed to load profile data." }));
    }, [profileId, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = await profileUpdate(profileId, formData);
            navigate(`/profile/${updatedProfile._id}`);
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <h1>Update Your Profile</h1>
            {errors.auth && <p>{errors.auth}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <label>Image 1:</label>

                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange}></textarea>
                </div>

                <div>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="lookingFor">Looking For</label>
                    <select name="lookingFor" id="lookingFor" value={formData.lookingFor} onChange={handleChange} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="No Preference">No Preference</option>
                    </select>
                </div>

                <label>Image 1:</label>

                {errors.fetch && <p>{errors.fetch}</p>}

                <div>
                    <Link to="/profile">Cancel</Link>
                    <button type="submit">Confirm</button>
                </div>
            </form>
        </>
    );
}
