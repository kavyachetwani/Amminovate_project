import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = () => {
  const userGender = JSON.parse(localStorage.getItem("user")).gender;

  // Define the default position
  let avatarPositionY = -2.0;

  // Check if the user's gender is male
  if (userGender === "Male" || userGender === "male") {
    // Set the position for male avatar
    avatarPositionY = -2.14;
  }

  return (
    <>
      <OrbitControls />
      {/* <group scale={1.4} position-z={0} position-y={-2.0} position-x={0}> */}
      {/* Female Avatar - intensity: 1.8*/}
      <group scale={1.4} position={[0, avatarPositionY, 0]}>
        <Avatar />
      </group>
      <ambientLight intensity={2.4} />
    </>
  );
};
