import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  profileIndex,
  profileLike,
  profileDislike,
  profileShow,
} from "../../services/profileService";
import Spinner from "../Spinner/Spinner";
import styles from "./index.module.css";

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
  gap: "20px",
};

export default function IndexCard() {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [matchMessage, setMatchMessage] = useState(""); 

  const fetchProfile = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await profileIndex();
      setCurrentProfile(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLike = async () => {
    if (!currentProfile) return;
    setIsLoading(true);
    try {
      const response = await profileLike(currentProfile._id);
  
      if (response.message.includes("It's a match")) {
        setMatchMessage(`🎉 You matched with ${currentProfile.name}! 🎉`);
  
        setTimeout(() => {
          setMatchMessage("");
          fetchProfile();
        }, 3000);
      } else {
        fetchProfile();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDislike = async () => {
    if (!currentProfile) return;
    setIsLoading(true);
    try {
      await profileDislike(currentProfile._id);
      fetchProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProfile = async (profileId) => {
    try {
      setOpen(true);
      const data = await profileShow(profileId);
      setProfileDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setOpen(false);

  if (isLoading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;
  if (!currentProfile)
    return <p className="pageAlert">🥲 No profiles available right now! 🥲</p>;

  return (
    <>
      {matchMessage && <div className={styles.matchAlert}>{matchMessage}</div>}

      <section className={styles.indexContainer}>
        <div className={styles.indexCard}>
          <div
            className={styles.profileImage}
            onClick={() => handleViewProfile(currentProfile._id)}
          >
            {currentProfile.profileImage ? (
              <img
                src={currentProfile.profileImage}
                alt={`Profile of ${currentProfile.name}`}
              />
            ) : (
              <div className={styles.placeholderImage}>
                <p>No Image</p>
              </div>
            )}
          </div>
          <div className={styles.profileIndexInfo}>
            <h4>{currentProfile.name}</h4>
            <p>
              {currentProfile.age}, {currentProfile.location}
            </p>
          </div>
          <div className={styles.indexCardButtons}>
            <button className={styles.dislikeButton} onClick={handleDislike}>
              👎
            </button>
            <button className={styles.likeButton} onClick={handleLike}>
              👍
            </button>
          </div>
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {profileDetails.profileImage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <img
                src={profileDetails.profileImage}
                alt={`${profileDetails.name}'s profile`}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", fontSize: "20px", marginBottom: "10px" }}
          >
            {profileDetails.name}
          </Typography>
          <Typography sx={{ fontSize: "14px", marginBottom: "10px" }}>
            {profileDetails.age}, {profileDetails.gender}, {profileDetails.location}
          </Typography>
          <Typography sx={{ fontSize: "13px", marginBottom: "10px" }}>
            <strong>Bio: </strong>
            {profileDetails.bio}
          </Typography>
          <Typography sx={{ fontSize: "13px", marginBottom: "10px" }}>
            <strong>Passions: </strong>
            {profileDetails.passions}
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            <strong>Icks: </strong>
            {profileDetails.icks}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}


