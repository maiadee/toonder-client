import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { profileIndex, profileLike, profileDislike } from "./services/profileService"

import Spinner from '../Spinner/Spinner'

export default function IndexCard({ profile }) {
  // state

    const [card, setCard] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

  // location variables

  const navigate = useNavigate();

  //  functions

    const fetchProfile = async () => {
      setIsLoading(true)
    try {
        const data = await profileIndex();

      if (data) {
        setCard(data); // Set next profile
      } else {
        setCard(null); // No more profiles available
      }
    } catch (error) {
      console.error(error);
    } finally {
        setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch a profile when the component loads
  }, []);

    const handleLike = async () => {
      setIsLoading(true)
    try {
      // * Send a request to the backend
      await profileLike(profile._id)
      fetchProfile();
    } catch (error) {
      console.error(error);
    }
  };

    const handleDislike = async () => {
     setIsLoading(true)
    try {
      await profileDislike(profile._id)
      fetchProfile();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="index-card">
        <div className="profile-image">
          <img
            src={profile.profileImage}
            alt={`Profile image for ${profile.name}`}
          />
        </div>
        <div className="profile-index-info">
          <p>{profile.name}</p>
          <p>{profile.age}</p>
          <p>{profile.location}</p>
        </div>
        <div className="profile-buttons">
          <button onClick={handleDislike}>👎</button>
          <button onClick={handleLike}>👍</button>
        </div>
      </div>
    </>
  );
}

export default IndexCard;