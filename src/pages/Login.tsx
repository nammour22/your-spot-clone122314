import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Music2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-bright">MySpot</span>
          </div>
          <h1 className="text-3xl font-bold text-bright mb-2" style={{ lineHeight: 1.1 }}>Log in to MySpot</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-bright mb-2 block">Email or username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or username"
              className="w-full h-12 px-4 rounded-md bg-surface-highlight border border-border text-bright placeholder:text-subdued focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-bright mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-12 px-4 pr-12 rounded-md bg-surface-highlight border border-border text-bright placeholder:text-subdued focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subdued hover:text-bright"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform text-base"
          >
            Log In
          </button>
        </form>

        <div className="text-center">
          <button className="text-sm text-bright underline hover:text-primary transition-colors">Forgot your password?</button>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-subdued text-sm">
            Don't have an account?{" "}
            <button onClick={() => navigate("/")} className="text-bright underline hover:text-primary">Sign up for MySpot</button>
          </p>
        </div>
      </div>
    </div>
  );
}
