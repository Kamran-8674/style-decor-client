import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">

      {/* Icon */}
      <div className="text-2xl">🎨</div>

      {/* Text */}
      <h1 className="text-xl font-bold text-primary">
        StyleDecor
      </h1>

    </Link>
  );
};

export default Logo;