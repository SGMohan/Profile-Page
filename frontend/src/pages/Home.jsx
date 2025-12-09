import AppHeader from "../components/AppHeader";
import HeaderContent from "../components/HeaderContent";
import bg_img from "../assets/bg_img.png";
// import Loading from "../components/Loading";
// import { useState } from "react";

const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      {/* {isLoading && <Loading/>} */}
      <AppHeader />
      <HeaderContent />
    </div>
  );
};

export default Home;
