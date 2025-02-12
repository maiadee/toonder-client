import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function Homepage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <img src="/images/logo.png" alt="Toonder Logo" />

      {!user && (
        <>
          <p>Sign Up To Find Love Today! 💕</p>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </>
      )}
    </div>
  );
}
