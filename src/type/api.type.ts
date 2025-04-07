import { IPaginationParams } from "./index.type";

export interface IRes<T> {
    status: boolean;
    data: T;
    error?: IErr;
    metadata?: IPaginationParams;
}

interface IErr {
    code: string;
    message: string;
    field?: string[];
}

export interface IFetcherData<T> {
    body?: T;
    pagination?: IPaginationParams;
    params?: Record<string, any>;
    pathIds?: string[];
}

export type FucApi<
    TRequest,
    TResponse,
> = (
    options: IFetcherData<TRequest>
) => Promise<IRes<TResponse>>;