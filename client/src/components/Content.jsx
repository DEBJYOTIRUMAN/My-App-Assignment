const Content = ({ title, desc, optional }) => {
  return (
    <div className="text-gray-900">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-12 font-medium">{desc}</p>
      {optional && (
        <p className="mt-4 font-medium">{optional}</p>
      )}
    </div>
  );
};

export default Content;
