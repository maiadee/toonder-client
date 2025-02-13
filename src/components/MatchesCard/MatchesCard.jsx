import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./matches.module.css";

import {
  profileShow,
  matchDelete,
  matchesIndex,
} from "../../services/profileService";

import Spinner from "../Spinner/Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 400,
  bgcolor: "background.paper",
  border: "0 solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function MatchesCard() {
  // state

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [profile, setProfile] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      await matchDelete(profileId); 
      setMatches((prevMatches) =>
        prevMatches.filter((match) => match._id !== profileId)
      );
    } catch (error) {
      console.error("Error removing match:", error);
    }
  };

  // function to show full profile

  const handleView = async (profileId) => {
    try {
      setShowFullProfile(true);
      setOpen(true);
      console.log("Viewing profile with ID:", profileId);
      const data = await profileShow(profileId);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Spinner />;
  if (matches.length === 0) return <p className="pageAlert">💔 No matches available 💔</p>;

  return (
    <>
      <div className={styles.matchesGrid}>
        {matches.map((match) => (
          <div key={match._id} className={styles.matchCard}>
            <div className={styles.profileImage}>
              {/* Render the profile image */}
              {match.profileImage ? (
                <img
                  src={match.profileImage}
                  alt={`Profile of ${match.name}`}
                />
              ) : (
                <div className={styles.placeholderImage}>No Image</div>
              )}
            </div>
            <div className={styles.profileIndexInfo}>
              <h4>{match.name}</h4>
              <p>{match.age},</p>
              <p>{match.location}</p>
            </div>
            <div className={styles.matchCardButtons}>
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
      {showFullProfile && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {profile.name}
              </Typography>
              {profile.profileImage && (
                <img
                  src={profile.profileImage}
                  alt={`${profile.name}'s profile`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                component="div"
              >
                <p>
                  {profile.age}, {profile.gender}, {profile.location}
                </p>
                <div>{profile.bio}</div>
                <div>{profile.passions}</div>
                <div>{profile.icks}</div>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
