import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { profileUpdate, profileShow } from "../../services/profileService";
import styles from './updateProfile.module.css';
import ImageUpload from '../ImageUpload/ImageUpload';

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
        profileImage: ""
    });

    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        profileShow(id)
            .then((data) => {
                if (!data || data._id !== user.profile) {
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
                    profileImage: data.profileImage || ""
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
            console.log("Updating profile:", formData);
            await profileUpdate(id, formData);
            navigate("/profiles/index");
        } catch (error) {
            setErrors(error.response?.data?.errors || { general: "Failed to update profile." });
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Update Your Profile</h1>

            {errors.general && <p className={styles.error}>{errors.general}</p>}
            {errors.message && <p className={styles.error}>{errors.message}</p>}
            {errors.fetch && <p className={styles.error}>{errors.fetch}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <ImageUpload 
                    errors={errors} 
                    setErrors={setErrors}
                    formData={formData} 
                    setFormData={setFormData}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                />

                <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Bio:</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Looking For:</label>
                    <select name="preferences" value={formData.preferences} onChange={handleChange} required>
                        <option value="" disabled>Select Preference</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="No Preference">No Preference</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Passions:</label>
                    <input type="text" name="passions" placeholder="E.g., Music, Traveling, Fitness" value={formData.passions} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Icks:</label>
                    <input type="text" name="icks" placeholder="E.g., Loud chewing, Being late" value={formData.icks} onChange={handleChange} />
                </div>

                <button className={styles.button} type="submit">Update Profile</button>
            </form>
        </div>
    );
}
