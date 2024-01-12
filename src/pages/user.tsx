import { useParams } from "react-router-dom";

const UserPage = () => {
  const params = useParams();

  return (
    <div>
      <h1>User Page</h1>
      <p>Hi, {params.id}</p>
    </div>
  );
};

export default UserPage;
