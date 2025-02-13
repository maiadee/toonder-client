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
  height: 400,
  bgcolor: "rgba(255, 255, 255, 0.9)",
  color: "black",
  border: "0 solid #000",
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
};

export default function IndexCard() {
  
  const [currentProfile, setCurrentProfile] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Modal state
  const [profileDetails, setProfileDetails] = useState({}); // Full profile details for modal

  const fetchProfile = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await profileIndex(); // Fetch next profile
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
    fetchProfile(); 
  }, []);

  const handleLike = async () => {
    if (!currentProfile) return; // No profile to like
    setIsLoading(true);
    try {
      await profileLike(currentProfile._id); // Like the current profile
      fetchProfile(); 
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
      setOpen(true); // Open the modal
      const data = await profileShow(profileId); 
      setProfileDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setOpen(false);

  // Render loading state
  if (isLoading) return <Spinner />;

  // Render error state
  if (error) return <p className="error-message">{error}</p>;

  // Render if no profiles are available
  if (!currentProfile)
    return <p className="pageAlert">No profiles available at the moment.</p>;

  return (
    <>
      <section className={styles.indexContainer}>
        <div className={styles.indexCard}>
          <div
            className={styles.profileImage}
            onClick={() => handleViewProfile(currentProfile._id)} // Trigger modal on image click
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
                  margin: "5px",
                }}
              />
            </div>
          )}
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {profileDetails.name}
            </Typography>
            <p style={{ fontSize: "14px" }}>
              {profileDetails.age}, {profileDetails.gender},{" "}
              {profileDetails.location}
            </p>
            <div style={{ fontSize: "13px" }}>
              <strong>Bio: </strong>
              {profileDetails.bio}
            </div>
            <div style={{ fontSize: "13px" }}>
              <strong>Passions: </strong>
              {profileDetails.passions}
            </div>
            <div style={{ fontSize: "13px" }}>
              <strong>Icks: </strong>
              {profileDetails.icks}
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
