export interface ActTraderAccount {
    AccountID :  string;
    Balance : string;
    TraderID : string;
    Currency : string;
    UsedMargin : string;
    Reserved : string;
}
export interface ActTraderStateProps {
    accounts : ActTraderAccount[];
    error : object | string | null;
}

export interface ActTraderInfoStateProps{
    accountInfo : ActtraderInfoParams[];
    error : Object | string | null;
}

export interface UserParams{
    username : string;
    accountType: string;
}

export interface ActtraderAccountListProps {
    onLogout : () => void;
}

export interface ActtraderInfoParams {
    AccountID :  string;
    Balance : string;
    TraderID : string;
    Currency : string;
    UsedMargin : string;
    Reserved : string;
}