import { useMutation, useQueryClient } from 'react-query';
import { IFetcherData, IRes } from '@app/type/api.type';
import { FucApi } from '@app/type/api.type';
import { useEffect } from 'react';

interface UseApiMutationOptions<TData, TError, TVariables, TContext> {
  onSuccess?: (response: IRes<TData>, variables: IFetcherData<TVariables>, context: TContext) => void | Promise<unknown>;
  onError?: (error: TError, variables: IFetcherData<TVariables>, context: TContext | undefined) => void | Promise<unknown>;
  onSettled?: (response: IRes<TData> | undefined, error: TError | null, variables: IFetcherData<TVariables>, context: TContext | undefined) => void | Promise<unknown>;
  invalidateQueries?: string[];
  setQueryData?: {
    queryKey: string[];
    transform?: (oldData: any, newData: TData) => any;
  };
  /**
   * Nếu được đặt là true, hook sẽ tự động gọi API ngay khi component được mount
   */
  executeOnMount?: boolean;
  /**
   * Dữ liệu ban đầu để gọi API khi executeOnMount là true
   */
  initialVariables?: IFetcherData<TVariables>;
}

interface ApiMutationResult<TData, TError, TVariables> {
  /**
   * Dữ liệu trả về từ API
   */
  data?: TData;
  /**
   * Response gốc từ API
   */
  response?: IRes<TData>;
  /**
   * Lỗi nếu có
   */
  error: TError | null;
  /**
   * Trạng thái loading
   */
  isLoading: boolean;
  /**
   * Trạng thái thành công
   */
  isSuccess: boolean;
  /**
   * Trạng thái lỗi
   */
  isError: boolean;
  /**
   * Hàm thực hiện mutation
   */
  mutate: (variables: IFetcherData<TVariables>) => Promise<IRes<TData>>;
  /**
   * Hàm reset mutation
   */
  reset: () => void;
}

/**
 * Custom hook để quản lý các mutation API với React Query
 * 
 * @param apiFn - Hàm API được tạo bởi createFetcher
 * @param options - Tùy chọn cho mutation
 * @returns Đối tượng chứa các thuộc tính và hàm cần thiết để quản lý mutation
 */
export function useApiMutation<TVariables, TData, TError = Error>(
  apiFn: FucApi<TVariables, TData>,
  options?: UseApiMutationOptions<TData, TError, TVariables, unknown>
): ApiMutationResult<TData, TError, TVariables> {
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

  useEffect(() => {
    // Thực hiện gọi API khi component được mount nếu có yêu cầu
    if (options?.executeOnMount && options?.initialVariables) {
      mutation.mutate(options.initialVariables);
    }
  }, [options?.executeOnMount]);

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

export default useApiMutation;