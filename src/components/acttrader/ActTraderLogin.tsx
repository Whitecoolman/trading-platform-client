import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Loader } from "lucide-react";
import { CiLogin } from "react-icons/ci";
import axios from "../../utils/api";
import { toast } from "react-toastify";

interface LoginProps {
  onAuthSuccess: () => void;
}

interface LoginResponse {
  data: {
    token: string;
    user: {
      email: string;
      server: string;
      accountType: string;
    };
  };
}

const ActTraderLogin: React.FC<LoginProps> = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("DEMO");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post<LoginResponse>("acttrader/login", {
        username,
        password,
        accountType,
      });

      const token = response.data.data.token;
      console.log("--------------->actTradertoken", token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      if (token.length > 0) {
        onAuthSuccess();
      }
    } catch (error) {
      toast.warn("Login info is wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-[#070707] p-6 rounded shadow-md w-96 border border-[#333333] border-dashed">
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <div className="flex justify-center items-center gap-2">
            <img src="/acttrader_logo.svg" alt="" className="w-[40px] h-auto" />
            <h1 className="text-2xl text-blue-400">ActTrader</h1>
          </div>
          {/* Username Field */}
          <div className="mb-4 w-[80%] space-y-2">
            <label className="block text-gray-700 text-sm" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#070707] text-white rounded-lg px-3 py-2 w-full border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-4 w-[80%] space-y-2">
            <label className="block text-gray-700 text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#070707] text-white rounded-lg px-3 py-2 w-full border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
              required
            />
          </div>
          {/* Server Selection */}
          <div className="mb-4 w-[80%]">
            <div className="w-full flex justify-between items-center">
              <label className="text-sm block text-gray-700">
                <span>Server Name</span>
              </label>
              <div className="flex justify-center items-center gap-2">
                {/* DEMO Button */}
                <span
                  className={`select-none rounded-full px-2 text-[12px] cursor-pointer flex justify-center items-center gap-1 ${
                    accountType === "DEMO"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => setAccountType("DEMO")}
                >
                  {accountType === "DEMO" && (
                    <FaCheckCircle className="w-3 h-3" />
                  )}
                  DEMO
                </span>
                {/* LIVE Button */}
                <span
                  className={`select-none rounded-full px-2 text-[12px] cursor-pointer flex justify-center items-center gap-1 ${
                    accountType === "LIVE"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => setAccountType("LIVE")}
                >
                  {accountType === "LIVE" && (
                    <FaCheckCircle className="w-3 h-3" />
                  )}
                  LIVE
                </span>
              </div>
            </div>
          </div>
          {/* Login Button */}
          <div className="mb-4 w-[80%]">
            <button
              className="w-full bg-blue-500 rounded-lg p-2 flex justify-center items-center gap-2 outline-1 outline-dashed outline-blue-500 outline-offset-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading && <Loader className="h-5 w-5 mr-2 animate-spin" />}
              {!loading && <CiLogin className="w-5 h-5" />}
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActTraderLogin;