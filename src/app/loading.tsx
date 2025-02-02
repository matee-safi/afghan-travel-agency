import Nav from "./components/Nav";

const Loading = () => {
  return (
    <div className="h-screen w-full">
      <Nav />
      <div className="flex h-full justify-center items-center">
        <div className="sk-chase mb-20">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
