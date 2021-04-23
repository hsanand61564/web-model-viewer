import { Pagination } from "./pagination";
export type CustomError = {
    code?: string;
    message: string;
}

export class Result<T> {
    public success: boolean;
    public error: CustomError | undefined;
    public data: T | undefined;
    public message: string | undefined;
    public pagination: Pagination | undefined;

    public constructor(
        success: boolean,
        data?: T,
        error?: CustomError,
        message?: string,
        pagination?: Pagination
    ) {
        if (success && error) {
            throw new Error('Invalid Result: A result cannot be successful and contain an error');
        }

        this.success = success;
        this.error = error;
        this.data = data;
        this.message = message;
        this.pagination = pagination;
    }
}