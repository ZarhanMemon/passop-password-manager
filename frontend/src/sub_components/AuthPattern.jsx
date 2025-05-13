const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-zinc-950 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 2 === 0
                  ? "bg-green-500 animate-none shadow-lg shadow-green-500/30"
                  : "bg-green-800 animate-ping"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-green-400 mb-4 tracking-wide">
          {title}
        </h2>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
