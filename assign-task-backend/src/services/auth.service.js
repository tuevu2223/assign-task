import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const SALT_ROUNDS = 10;

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const makeError = (code) => {
  const err = new Error(code);
  err.code = code;
  return err;
};

const normalizeEmail = (email) => String(email).toLowerCase().trim();

const signToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

export const createUser = async ({ fullName, email, password }) => {
  if (
    !fullName ||
    typeof fullName !== "string" ||
    !fullName.trim() ||
    !email ||
    typeof email !== "string" ||
    !password ||
    typeof password !== "string"
  ) {
    throw makeError("INVALID_INPUT");
  }

  if (!isValidEmail(email)) {
    throw makeError("INVALID_EMAIL");
  }

  if (password.length < 6) {
    throw makeError("WEAK_PASSWORD");
  }

  const existing = await User.findOne({ email: normalizeEmail(email) });
  if (existing) {
    throw makeError("EMAIL_IN_USE");
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    fullName: fullName.trim(),
    email: normalizeEmail(email),
    password: hashed,
  });

  return user;
};

export const loginWithPassword = async ({ email, password }) => {
  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    throw makeError("INVALID_CREDENTIALS");
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || user.isBanned) {
    throw makeError("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw makeError("INVALID_CREDENTIALS");
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-secret-dev";
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-secret-dev";
  return {
    accessToken: signToken(
      { sub: user.id, email: user.email },
      accessTokenSecret,
      "15m",
    ),
    refreshToken: signToken(
      { sub: user.id, email: user.email },
      refreshTokenSecret,
      "7d",
    ),
  };
};
