import Content from "../components/Content";

const Error = () => {
  return (
    <div className="flex items-center w-full max-w-xl px-6 mx-auto py-12">
      <div className="flex-1">
        <Content
          title="404 Not Found"
          desc="404 page not found because the link is invalid. Please login again later."
        />
      </div>
    </div>
  );
};

export default Error;
