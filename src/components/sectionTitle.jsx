const SectionTitle = ({ title }) => {
  return (
    <div className="grid grid-cols-12 items-center px-4">
      <span className="col-span-1 text-lg text-zinc-50 font-bold">{title}</span>
      <div className="col-span-11 border-t border-zinc-50 my-8"></div>
    </div>
  );
};

export default SectionTitle