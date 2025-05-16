export const config = {
  port: process.env.PORT || 5173,
  databaseUrl: process.env.DATABASE_URL || "sqlite:./dev.db",
  jwtSecret: process.env.JWT_SECRET || "default_secret",
};