import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Music2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Music2 className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-bright">404</h1>
        <p className="mb-6 text-xl text-subdued">This page doesn't exist on MySpot</p>
        <a href="/" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform inline-block">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
