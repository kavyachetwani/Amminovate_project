import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/teach-dash", { replace: true });
  }, [navigate]);

  return null; // Since this is a utility component for redirection, it doesn't render anything
};

export default TeacherRoute;
