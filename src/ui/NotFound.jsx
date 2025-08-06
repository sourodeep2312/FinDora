import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-stone-100">
      <div className=" border-0 w-[32rem] p-4 rounded-lg h-40">
        <h1 className="text-zinc-800 font-bold text-4xl text-center">
          The page does not exist
        </h1>
        <button
          className="bg-emerald-500 px-4 py-2 mt-10 rounded-lg block mx-auto"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
