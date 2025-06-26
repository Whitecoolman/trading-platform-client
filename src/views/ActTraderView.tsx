import { useEffect, useState } from "react";
import ActTraderLogin from "@/components/acttrader/ActTraderLogin";
import ActTraderAccountList from "@/components/acttrader/ActTraderAccountList";
export default function ActTraderView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleAuthenticationSuccess = () : void => {
    setIsAuthenticated(true);
  }
  const handleLogout = () : void => {
    localStorage.removeItem("AtaccessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("AtaccessToken");
    if(accessToken) {
      setIsAuthenticated(true);
    }
  }, [])
  return (
    <div className="w-full flex justify-center items-center h-full">
      {isAuthenticated ? (
        <ActTraderAccountList onLogout={handleLogout}/>
      ) : (
        <ActTraderLogin onAuthSuccess={handleAuthenticationSuccess}/>
      )}
    </div>
  );
}
