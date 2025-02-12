import { useState, useEffect } from "react";
import {
  profileIndex,
  profileLike,
  profileDislike,
} from "../../services/profileService";
import Spinner from "../Spinner/Spinner";

export default function IndexCard() {
  // State
  const [profiles, setProfiles] = useState([]); // Now handles an array of profiles
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch profiles
  const fetchProfiles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await profileIndex();
      setProfiles(data || []); // Set profiles or an empty array
    } catch (error) {
      console.error(error);
      setError("Failed to load profiles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Fetch profiles when the component loads
  }, []);

  // Handle Like
  const handleLike = async (profileId) => {
    setIsLoading(true);
    try {
      await profileLike(profileId); // Backend call to like a profile
      setProfiles(profiles.filter((profile) => profile._id !== profileId)); // Remove liked profile from UI
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Dislike
  const handleDislike = async (profileId) => {
    setIsLoading(true);
    try {
      await profileDislike(profileId); // Backend call to dislike a profile
      setProfiles(profiles.filter((profile) => profile._id !== profileId)); // Remove disliked profile from UI
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
  if (!profiles.length) return <p>No profiles available at the moment.</p>;

  // Render profiles
  return (
    <>
      <h2>Browse Profiles</h2>
      <div className="profiles-grid">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <div className="profile-image">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={`Profile of ${profile.name}`}
                />
              ) : (
                <p>No Image</p>
              )}
            </div>
            <div className="profile-info">
              <p>Name: {profile.name}</p>
              <p>Age: {profile.age}</p>
              <p>Location: {profile.location}</p>
            </div>
            <div className="profile-buttons">
              <button onClick={() => handleDislike(profile._id)}>
                👎 Dislike
              </button>
              <button onClick={() => handleLike(profile._id)}>👍 Like</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
