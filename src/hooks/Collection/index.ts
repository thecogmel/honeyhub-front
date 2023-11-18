import { useCallback } from 'react';

import { endpoints, useApi } from '@contexts/Api';

const useCollection = () => {
  const { request } = useApi();

  const listCollection = useCallback(
    async (hive?: string, created__lte?: string, created__gte?: string) => {
      const response = await request<Collection[]>({
        method: 'get',
        url: endpoints.private.collections.list,
        params: {
          hive,
          created__lte,
          created__gte,
        },
      });

      return response.data;
    },
    [request]
  );

  const createCollection = useCallback(
    async (data: CollectionFormValues) => {
      const response = await request<Collection>({
        method: 'post',
        url: endpoints.private.collections.create,
        data,
      });

      return response.data;
    },
    [request]
  );

  return {
    createCollection,
    listCollection,
  };
};

export default useCollection;
