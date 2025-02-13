import { useState, useEffect } from "react";
import { profileShow, profileLike, profileDislike } from "../../services/profileService";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import styles from "./FullProfileCard.module.css";

export default function FullProfileCard() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await profileShow(id);
        if (data) {
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      await profileLike(profile._id); 
      setProfile({ ...profile, likes: [...profile.likes, "currentUserId"] }); 
    } catch (error) {
      console.error("Failed to like profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDislike = async () => {
    setIsLoading(true);
    try {
      await profileDislike(profile._id); 
      setProfile({ ...profile, dislikes: [...profile.dislikes, "currentUserId"] });  
    } catch (error) {
      console.error("Failed to dislike profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) return <Spinner />;

  if (error) return <p className="error-message">{error}</p>;

  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className={styles["full-profile-card"]}>
      <div className={styles["profileImage"]}>
        {profile.profileImage ? (
          <img src={profile.profileImage} alt={`${profile.name}'s profile`} />
        ) : (
          <div className={styles["placeholderImage"]}>No Image</div>
        )}
      </div>
  
      <div className={styles["profileIndexInfo"]}>
        <h4>{profile.name}</h4>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Bio:</strong> {profile.bio}</p>
        <p><strong>Passions:</strong> {profile.passions || "Not specified"}</p>
        <p><strong>Icks:</strong> {profile.icks || "Not specified"}</p>
      </div>
  
      <div className={styles["profile-buttons"]}>
     
      
      </div>
    </div>
  );
}  
