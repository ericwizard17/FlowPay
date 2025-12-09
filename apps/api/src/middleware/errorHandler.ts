import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', error);

    // Prisma errors
    if (error.code === 'P2002') {
        return res.status(409).json({
            error: 'A record with this value already exists',
        });
    }
    if (error.code === 'P2025') {
        return res.status(404).json({
            error: 'Record not found',
        });
    }

    // Default error
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
};
