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
  bgcolor: "background.paper",
  border: "0 solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function IndexCard() {
  // State
  const [currentProfile, setCurrentProfile] = useState(null); // Single profile
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Modal state
  const [profileDetails, setProfileDetails] = useState({}); // Full profile details for modal

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

  // Handle Image Click to View Full Profile
  const handleViewProfile = async (profileId) => {
    try {
      setOpen(true); // Open the modal
      const data = await profileShow(profileId); // Fetch full profile details
      setProfileDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Close Modal
  const handleClose = () => setOpen(false);

  // Render loading state
  if (isLoading) return <Spinner />;

  // Render error state
  if (error) return <p className="error-message">{error}</p>;

  // Render if no profiles are available
  if (!currentProfile) return <p>No profiles available at the moment.</p>;

  // Render profiles
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
            <button onClick={handleDislike}>👎</button>
            <button onClick={handleLike}>👍</button>
          </div>
        </div>
      </section>

      {/* Modal for full profile */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {profileDetails.name}
          </Typography>
          {profileDetails.profileImage && (
            <img
              src={profileDetails.profileImage}
              alt={`${profileDetails.name}'s profile`}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )}
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <p>
              {profileDetails.age}, {profileDetails.gender},{" "}
              {profileDetails.location}
            </p>
            <div>{profileDetails.bio}</div>
            <div>{profileDetails.passions}</div>
            <div>{profileDetails.icks}</div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
