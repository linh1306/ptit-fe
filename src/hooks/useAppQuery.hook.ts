import {
  useQuery,
  useQueryClient,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { IFetcherData, IRes } from "@app/type/api.type";
import { FucApi } from "@app/type/api.type";

interface UseAppQueryOptions<TData, TError, TVariables> {
  queryKey: string | string[]; // Thêm queryKey vào options
  variables?: IFetcherData<TVariables>;
  onSuccess?: (response: IRes<TData>) => void | Promise<unknown>;
  onError?: (error: TError) => void | Promise<unknown>;
  onSettled?: (
    response: IRes<TData> | undefined,
    error: TError | null
  ) => void | Promise<unknown>;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  retry?: boolean | number;
  retryDelay?: number;
  staleTime?: number;
  cacheTime?: number;
  keepPreviousData?: boolean;
  select?: (data: TData) => any;
}

interface AppQueryResult<TData, TError> {
  data?: TData;
  response?: IRes<TData>;
  error: TError | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<IRes<TData>, TError>>;
  isFetching: boolean;
}

/**
 * Custom hook để quản lý các query API với React Query
 *
 * @param apiFn - Hàm API được tạo bởi createFetcher
 * @param options - Tùy chọn cho query, bao gồm queryKey
 * @returns Đối tượng chứa các thuộc tính và hàm cần thiết để quản lý query
 */
export default function useAppQuery<TVariables, TData, TError = Error>(
  apiFn: FucApi<TVariables, TData>,
  options: UseAppQueryOptions<TData, TError, TVariables>
): AppQueryResult<TData, TError> {
  const queryClient = useQueryClient();

  // Chuyển đổi queryKey thành mảng nếu là string
  const queryKeyArray = Array.isArray(options.queryKey)
    ? options.queryKey
    : [options.queryKey];

  const query = useQuery<IRes<TData>, TError>({
    queryKey: options.variables
      ? [...queryKeyArray, options.variables]
      : queryKeyArray,
    queryFn: async () => {
      const response = await apiFn(
        options.variables || ({} as IFetcherData<TVariables>)
      );
      if (!response.status) {
        throw new Error(
          response.error?.message || "Lỗi không xác định"
        ) as TError;
      }
      return response;
    },
    onSuccess: (response) => {
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
    onSettled: (response, error) => {
      if (options?.onSettled) {
        options.onSettled(response, error);
      }
    },
    enabled: options?.enabled !== undefined ? options.enabled : true,
    refetchOnWindowFocus: false,
    refetchOnMount: options?.refetchOnMount,
    refetchOnReconnect: options?.refetchOnReconnect,
    retry: options?.retry,
    retryDelay: options?.retryDelay,
    staleTime: options?.staleTime ?? 0,
    cacheTime: options?.cacheTime ?? 5 * 60 * 1000,
    keepPreviousData: options?.keepPreviousData,
    select: options?.select
      ? (response: IRes<TData>) => options.select?.(response.data as TData)
      : undefined,
  });

  // Trả về đối tượng chứa các thuộc tính và hàm cần thiết
  return {
    data: query.data?.data,
    response: query.data,
    error: query.error,
    isLoading: query.isLoading,
    isSuccess: query.isSuccess,
    isError: query.isError,
    isIdle: query.isIdle,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
