import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { profileCreate } from "../../services/profileService";
import styles from "./createProfile.module.css";
import ImageUpload from "../ImageUpload/ImageUpload";

export default function CreateProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    gender: "",
    preferences: "",
    profileImage: "",
    passions: "",
    icks: "",
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formData.age = Number(formData.age);
      console.log("Submitting profile:", formData);
      const newProfile = await profileCreate(formData);

      setUser((prevUser) => ({
        ...prevUser,
        profile: newProfile._id, 
      }));

      navigate('/profiles/index');
    } catch (error) {
      setErrors(
        error.response?.data?.errors || { general: "Failed to create profile." }
      );
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Your Profile</h1>

      {errors.general && <p className={styles.error}>{errors.general}</p>}

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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Looking For:</label>
          <select
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Preference
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="No Preference">No Preference</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Passions:</label>
          <input
            type="text"
            name="passions"
            placeholder="E.g., Music, Traveling, Fitness"
            value={formData.passions}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Icks:</label>
          <input
            type="text"
            name="icks"
            placeholder="E.g., Loud chewing, Being late"
            value={formData.icks}
            onChange={handleChange}
          />
        </div>

        <button className={styles.button} type="submit">
          Create Profile
        </button>
      </form>
    </div>
  );
}
