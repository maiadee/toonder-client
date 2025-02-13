import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./matches.module.css"; 

import {
  profileShow,
  matchDelete,
  matchesIndex,
} from "../../services/profileService";

import Spinner from "../Spinner/Spinner";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: "auto", 
  backdropFilter: "blur(15px)",
  background: "rgba(255, 255, 255, 0.15)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
  color: "white",
  p: 5,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "30px", 
};

export default function MatchesCard() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  const { profileId: currentUserId } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const data = await matchesIndex(currentUserId);
        setMatches(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
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

  const handleView = async (profileId) => {
    try {
      setOpen(true);
      const data = await profileShow(profileId);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setProfile(null);
  };

  if (isLoading) return <Spinner />;
  if (matches.length === 0)
    return <p className="pageAlert">💔 No matches available 💔</p>;

  return (
    <>
      <div className={styles.matchesGrid}>
        {matches.map((match) => (
          <div key={match._id} className={styles.matchCard}>
            <div className={styles.profileImage} onClick={() => handleView(match._id)}>
              {match.profileImage ? (
                <img
                  src={match.profileImage}
                  alt={`Profile of ${match.name}`}
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              ) : (
                <div className={styles.placeholderImage}>No Image</div>
              )}
            </div>
            <div className={styles.profileIndexInfo}>
              <h4>{match.name}</h4>
              <p>{match.age}, {match.location}</p>
            </div>
            <div className={styles.matchCardButtons}>
              <button onClick={() => handleRemove(match._id)}>Remove Match</button>
              <button onClick={() => handleView(match._id)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {profile && (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
          <Box sx={modalStyle}>
            {profile.profileImage && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={profile.profileImage}
                  alt={`${profile.name}'s profile`}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    margin: "8px",
                  }}
                />
              </div>
            )}
            <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {profile.name}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {profile.age}, {profile.gender}, {profile.location}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>
              <strong>Bio: </strong> {profile.bio}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>
              <strong>Passions: </strong> {profile.passions}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>
              <strong>Icks: </strong> {profile.icks}
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}
