import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { profileShow, matchDelete, matchesIndex } from "./services/profileService";

import Spinner from "../Spinner/Spinner";

export default function MatchesCard() {
  // state

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //  functions

  const fetchMatches = async () => {
    setIsLoading(true);
    try {
        const data = await matchesIndex();
        setMatches(data || [])
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(); // Fetch a profile when the component loads
  }, []);

  const handleRemove = async (profileId) => {
    try {
      // * Send a request to the backend
      await matchDelete(profileId);
      setMatches(matches.filter((match) => match._id !== profileId)); // ✅ Remove from UI
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = async () => {
    try {
      await profileShow(profileId);
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
              {/* <img src={matches.profileImage} alt={`Profile of ${matches.name}`} /> */}
            </div>
            <div className="profile-index-info">
              <p>{match.name}</p>
              <p>{match.age}</p>
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
    </>
  );
}
