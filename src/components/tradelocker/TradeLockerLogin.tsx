import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Loader } from "lucide-react";
import { CiLogin } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "../../utils/api";
interface LoginProps {
  onAuthSuccess: () => void;
}
interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      email: string;
      server: string;
      accountType: string;
    };
  };
}
const TradeLockerLogin: React.FC<LoginProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [server, setServer] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("DEMO");
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post<LoginResponse>("tradelocker/login", {
        email,
        password,
        server,
        accountType,
      });
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      console.log("-----------tradelocker authtoken------->", accessToken);
      console.log("😋😋😋" , JSON.stringify(response.data.data.user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      if (accessToken.length > 0) {
        onAuthSuccess();
      }
    } catch (error) {
      toast.warn("Login info is wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="bg-[#070707] p-6 rounded shadow-md w-96 border border-[#333333] border-dashed">
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <img src="/tradelocker-white.svg" alt="" className="w-1/3 h-auto" />
          <div className="mb-4 w-[80%] space-y-2">
            <label className="block text-gray-700 text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-[#070707] text-white rounded-lg px-3 py-2
                             w-full order border-dashed border-gray-700 focus:border-blue-500 focus:ring-0 text-sm"
              required
            />
          </div>
          <div className="mb-4 w-[80%] space-y-2">
            <label className="text-sm block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-[#070707] text-white rounded-lg px-3 py-2
                             w-full order border-dashed border-gray-700 focus:border-blue-500 focus:ring-0 text-sm"
              required
            />
          </div>
          <div className="mb-4 w-[80%] space-y-2">
            <div className="w-full flex justify-between items-center ">
              <label className="text-sm block text-gray-700">
                <span>Server Name</span>
              </label>
              <div className="flex justify-center items-center gap-2">
                <span
                  className="select-none rounded-full bg-yellow-500 text-white px-2 text-[12px] cursor-pointer flex justify-center items-center gap-1"
                  onClick={() => setAccountType("DEMO")}
                >
                  {accountType == "DEMO" && (
                    <FaCheckCircle className="w-3 h-3" />
                  )}
                  DEMO
                </span>
                <span
                  className="select-none rounded-full bg-green-500 text-white px-2 text-[12px] cursor-pointer flex justify-center items-center gap-1"
                  onClick={() => setAccountType("LIVE")}
                >
                  {accountType == "LIVE" && (
                    <FaCheckCircle className="w-3 h-3" />
                  )}
                  LIVE
                </span>
              </div>
            </div>
            <input
              type="text"
              id="server"
              placeholder="Server"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              className=" bg-[#070707] text-white rounded-lg px-3 py-2
                             w-full order border-dashed border-gray-700 focus:border-blue-500 focus:ring-0 text-sm"
              required
            />
          </div>
          <div className="mb-4 w-[80%]">
            <button
              className=" w-full bg-blue-500 outline-1 outline-dashed rounded-lg outline-blue-500 outline-offset-2 p-1 flex justify-center items-center gap-2"
              onClick={handleLogin}
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

export default TradeLockerLogin;
