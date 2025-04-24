import { useMutation, useQueryClient } from 'react-query';
import { IFetcherData, IRes } from '@app/type/api.type';
import { FucApi } from '@app/type/api.type';

interface UseAppMutationOptions<TData, TError, TVariables, TContext> {
  onSuccess?: (response: IRes<TData>, variables: IFetcherData<TVariables>, context: TContext) => void | Promise<unknown>;
  onError?: (error: TError, variables: IFetcherData<TVariables>, context: TContext | undefined) => void | Promise<unknown>;
  onSettled?: (response: IRes<TData> | undefined, error: TError | null, variables: IFetcherData<TVariables>, context: TContext | undefined) => void | Promise<unknown>;
  invalidateQueries?: string[];
  setQueryData?: {
    queryKey: string[];
    transform?: (oldData: any, newData: TData) => any;
  };
}

interface AppMutationResult<TData, TError, TVariables> {
  data?: TData;
  response?: IRes<TData>;
  error: TError | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  mutate: (variables: IFetcherData<TVariables>) => Promise<IRes<TData>>;
  reset: () => void;
}

/**
 * Custom hook để quản lý các mutation API với React Query
 * 
 * @param apiFn - Hàm API được tạo bởi createFetcher
 * @param options - Tùy chọn cho mutation
 * @returns Đối tượng chứa các thuộc tính và hàm cần thiết để quản lý mutation
 */
export default function useAppMutation<TVariables, TData, TError = Error>(
  apiFn: FucApi<TVariables, TData>,
  options?: UseAppMutationOptions<TData, TError, TVariables, unknown>
): AppMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();

  const mutation = useMutation<IRes<TData>, TError, IFetcherData<TVariables>>({
    mutationFn: async (variables: IFetcherData<TVariables>) => {
      const response = await apiFn(variables);
      if (!response.status) {
        throw new Error(response.error?.message || 'Lỗi không xác định') as TError;
      }
      return response;
    },
    onSuccess: (response, variables, context) => {
      // Tự động invalidate các queries nếu được chỉ định
      if (options?.invalidateQueries?.length) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }

      // Cập nhật cache cho query cụ thể nếu được chỉ định
      if (options?.setQueryData) {
        const { queryKey, transform } = options.setQueryData;
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (transform) {
            return transform(oldData, response.data);
          }
          return response.data;
        });
      }

      // Gọi callback onSuccess nếu được cung cấp
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: (response, error, variables, context) => {
      if (options?.onSettled) {
        options.onSettled(response, error, variables, context);
      }
    },
  });
  // Trả về đối tượng chứa các thuộc tính và hàm cần thiết
  return {
    data: mutation.data?.data,
    response: mutation.data,
    error: mutation.error,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    mutate: mutation.mutateAsync,
    reset: mutation.reset
  };
}