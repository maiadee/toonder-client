import { useState, useEffect } from "react";
import { profileIndex, profileLike, profileDislike } from "../../services/profileService"
import Spinner from '../Spinner/Spinner'

export default function IndexCard() {
  // state

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //  functions

  const fetchProfile = async () => {
    setIsLoading(true)
    setError("");
    try {

      const data = await profileIndex();


      if (data) {
        setProfile(data); // Set next profile
      } else {

        setProfile(null); // No more profiles available

      }
    } catch (error) {
      console.error(error);
      setError("Failed to load profiles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch a profile when the component loads
  }, []);

  const handleLike = async () => {
    setIsLoading(true)
    try {
      // * Send a request to the backend
      await axios.put(profileLike(profile._id))
      fetchProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    setIsLoading(true)
    try {
      await axios.put(profileDislike(profile._id))
      fetchProfile();
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
  if (!profile) return <p>No profiles available at the moment.</p>;

  return (
    <>
      <div className="index-card">
        <div className="profile-image">

        </div>
        <div className="profile-index-info">
          <p>{profile.name}</p>
          <p>{profile.age}</p>
          <p>{profile.location}</p>
        </div>
        <div className="profile-buttons">
          <button onClick={handleDislike} disabled={isLoading}>👎</button>
          <button onClick={handleLike} disabled={isLoading}>👍</button>
        </div>
      </div>
    </>
  );
}

