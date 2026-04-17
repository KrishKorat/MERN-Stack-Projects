import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface AuthRequest extends Request {
    user?: any;
}

interface JwtPayloadWithId extends JwtPayload {
    id: string;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
    ) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
        );

        // Type guard
        if (typeof decoded !== "object" || !("id" in decoded)) {
        return res.status(401).json({ message: "Invalid token" });
        }

        const { id } = decoded as JwtPayloadWithId;

        const user = await User.findById(id).select("-password");

        if (!user) {
        return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
};