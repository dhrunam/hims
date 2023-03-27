export interface AuthResponse{
    expiry: Date,
    token: string,
    user: Array<any>
}