import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between bg-center bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      <img
        className="w-18 py-4 mx-4"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <div className="bg-white text-black px-4 py-6 space-y-4 ">
        <h2 className="text-2xl font-bold">Get Started With Uber</h2>
        <Link
          to="/login"
          className="bg-black flex items-center justify-center text-white py-2 px-2 rounded-lg w-full"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
