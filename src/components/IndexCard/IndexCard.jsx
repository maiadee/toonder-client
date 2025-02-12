import { useState, useEffect } from "react";
import {
  profileIndex,
  profileLike,
  profileDislike,
} from "../../services/profileService";
import Spinner from "../Spinner/Spinner";

export default function IndexCard() {
  // State
  const [currentProfile, setCurrentProfile] = useState(null); // single profile
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch profiles
  const fetchProfile = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await profileIndex();
      console.log(data);
      setCurrentProfile(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch a profile when the component loads
  }, []);

  // Handle Like
  const handleLike = async () => {
    if (!currentProfile) return; // No profile to like
    setIsLoading(true);
    try {
      await profileLike(currentProfile._id); // Like the current profile
      fetchProfile(); // Fetch the next profile
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Dislike
  const handleDislike = async () => {
    if (!currentProfile) return; // No profile to dislike
    setIsLoading(true);
    try {
      await profileDislike(currentProfile._id); // Dislike the current profile
      fetchProfile(); // Fetch the next profile
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state
  if (isLoading) return <Spinner />;

  // Render error state
  if (error) return <p className="error-message">{error}</p>;

  // Render if no profiles are available
  if (!currentProfile) return <p>No profiles available at the moment.</p>;

  // Render profiles
  return (
    <div className="profile-card">
      <div className="profile-image">
        {currentProfile.profileImage ? (
          <img
            src={currentProfile.profileImage}
            alt={`Profile of ${currentProfile.name}`}
          />
        ) : (
          <p>No Image</p>
        )}
      </div>
      <div className="profile-info">
        <p>Name: {currentProfile.name}</p>
        <p>Age: {currentProfile.age}</p>
        <p>Location: {currentProfile.location}</p>
      </div>
      <div className="profile-buttons">
        <button onClick={handleDislike}>👎 Dislike</button>
        <button onClick={handleLike}>👍 Like</button>
      </div>
    </div>
  );
}
