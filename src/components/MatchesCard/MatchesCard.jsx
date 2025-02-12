import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

import {
  profileShow,
  matchDelete,
  matchesIndex,
} from "../../services/profileService";

import Spinner from "../Spinner/Spinner";

export default function MatchesCard() {
  // state

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [profile, setProfile] = useState({});

  const { profileId: currentUserId } = useParams();

  //  functions

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const data = await matchesIndex(currentUserId);
      console.log(data);
      setMatches(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(); // Fetch a profile when the component loads
  }, [currentUserId]);

  const handleRemove = async (profileId) => {
    try {
      // * Send a request to the backend
      await matchDelete(profileId);
      setMatches(matches.filter((match) => match._id !== profileId));
    } catch (error) {
      console.error(error);
    }
  };

  // function to show full profile

  const handleView = async (profileId) => {
    try {
      setShowFullProfile(true);
      console.log("Viewing profile with ID:", profileId);
      const data = await profileShow(profileId);
      setProfile(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Spinner />;
  if (matches.length === 0) return <p>💔 No matches available 💔</p>;

  return (
    <>
      <h2>Your Matches</h2>
      <div className="matches-grid">
        {matches.map((match) => (
          <div key={match._id} className="match-card">
            <div className="profile-image">
              {/* Render the profile image */}
              {match.profileImage ? (
                <img
                  src={match.profileImage}
                  alt={`Profile of ${match.name}`}
                />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
            </div>
            <div className="profile-index-info">
              <p>{match.name}</p>
              <p>{match.age}</p>
              <p>Location: {match.location}</p>
              <button>Chat</button>
            </div>
            <div className="match-card-buttons">
              <button onClick={() => handleRemove(match._id)}>
                Remove Match
              </button>
              <button onClick={() => handleView(match._id)}>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      {showFullProfile && <div>{profile.name}</div>}
    </>
  );
}
