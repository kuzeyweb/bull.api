import { prisma } from "../prisma/client.js"
import jwt from "jsonwebtoken";
import { respondWithError, respondWithSuccess } from "./apiResponse.js";

export const createAuthTokens = async ({ user }) => {
    await prisma.$connect();

    await prisma.user_tokens.deleteMany({
        where: {
            user_id: user.id
        },
    });

    var accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            roles: user.roles,
            permissions: user.permissions,
            expiresIn: "1h",
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { algorithm: 'HS256' });

    var refreshToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            roles: user.roles,
            permissions: user.permissions,
            expiresIn: "1m",
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { algorithm: 'HS256' });

    var date = new Date();
    var oneMonthFromNow = new Date(date.setMonth(date.getMonth() + 1))
    await prisma.user_tokens.create({
        data: {
            user_id: user.id,
            type: "refresh",
            token: refreshToken,
            expires_at: oneMonthFromNow
        }
    });

    return { accessToken: accessToken, refreshToken: refreshToken };
};

export const refreshAccessToken = async ({ res, user, refreshToken }) => {
    const userToken = await prisma.user_tokens.findFirst({
        where: {
            user_id: user.id,
            type: "refresh"
        },
    });
    if (userToken.token !== refreshToken) return respondWithError({ res: res, message: 'Invalid token', httpCode: 401 });

    const now = new Date();
    const expireDate = new Date(userToken.expires_at);

    if (expireDate.getTime() < now.getTime()) return respondWithError({ res: res, message: 'Expired token', httpCode: 401 });

    var accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            roles: user.roles,
            expiresIn: "1h",
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { algorithm: 'HS256' });

    respondWithSuccess({ res: res, message: "Refreshed access token", payload: accessToken })

}