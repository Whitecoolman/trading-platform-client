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

export interface UserParams{
    username : string;
    accountType: string;
}

export interface ActtraderAccountListProps {
    onLogout : () => void;
}