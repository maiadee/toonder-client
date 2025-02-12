import { useState, useEffect } from "react";
import { profileShow, profileLike, profileDislike } from "../../services/profileService";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

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
    <div className="full-profile-card">
      {profile.profileImage && <img src={profile.profileImage} alt="Profile Image 1" className="profile-image" />}
      <h2>{profile.name}</h2>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Passions:</strong> {profile.passions || "Not specified"}</p>
      <p><strong>Icks:</strong> {profile.icks || "Not specified"}</p>
      
      
      <div className="profile-buttons">
        <button onClick={handleDislike} disabled={isLoading}>👎</button>
        <button onClick={handleLike} disabled={isLoading}>👍</button>
      </div>
    </div>
  );
}
