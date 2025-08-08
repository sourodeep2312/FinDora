import { UserCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/usermenu");
  }
  return (
    <div className="relative  inline-block">
      <button onClick={handleClick} tabIndex={0}></button>
    </div>
  );
}

export default UserMenu;
