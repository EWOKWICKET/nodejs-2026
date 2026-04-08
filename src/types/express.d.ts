declare global {
  namespace Express {
    interface Request {
      user: import('./jwt-payload.type').JwtPayload;
    }
  }
}

export {};
