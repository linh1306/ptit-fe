import { FucApi, IFetcherData } from "@app/type/api.type";
import { IPaginationParams } from "@app/type/index.type";
import { useState } from "react";
import { useMutation } from "react-query";

interface UseLazyLoadDataOptions<TRequest, TResponse> {
  fetchApi: FucApi<TRequest, TResponse[]>;
  options: IFetcherData<TRequest>;
}

function useLazyLoadData<TRequest, TResponse>({
  fetchApi,
  options,
}: UseLazyLoadDataOptions<TRequest, TResponse>) {
  const [data, setData] = useState<TResponse[]>([]);
  const [pagination, setPagination] = useState<IPaginationParams>({
    page: 1,
    pageSize: 20,
  });

  const { mutate, isLoading, isError } = useMutation(fetchApi, {
    onSuccess: ({ data }) => {
      setData((prevData) => [...prevData, ...data]);
    },
  });

  const load = () => {
    setData([]);
    mutate({ ...options, pagination });
  };

  const loadMore = () => {
    mutate({ ...options, pagination });
    setPagination((prevPage) => ({
      ...prevPage,
      page: prevPage.page + 1,
    }));
  };

  return {
    data,
    loadMore,
    load,
    isLoading,
    isError,
  };
}

export default useLazyLoadData;
