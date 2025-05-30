// third-party
import { combineReducers } from "redux";

// project import
import metaAccount from "./metaAccount";
import metaAccountInfo from "./metaAccountInfo";
import webhook from "./webhook";
import metaStats from "./metaStats";
import metaTotalStats from "./metaTotalStats";
import metaViualTrades from "./metaVisualTrades";
import tradelocker from "./tradelocker";
import tradelockerInfo from "./tradelockerInfo";
import trade from "./trade";
import alert from "./alert";
import acttrader from "./Acttrader";
import acttraderInfo from "./acttraderinfo";
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  metaAccount,
  metaAccountInfo,
  webhook,
  metaStats,
  metaTotalStats,
  metaViualTrades,
  tradelocker,
  tradelockerInfo,
  trade,
  alert,
  acttrader,
  acttraderInfo
});

export default reducers;
