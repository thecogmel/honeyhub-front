import { useCallback } from 'react';

import { endpoints, useApi } from 'contexts/Api';

const useHives = () => {
  const { request } = useApi();

  const listHives = useCallback(async () => {
    const response = await request<Hive[]>({
      method: 'get',
      url: endpoints.private.hives.list,
    });

    return response.data;
  }, [request]);

  const getHive = useCallback(
    async (id: string) => {
      const response = await request<Hive>({
        method: 'get',
        url: endpoints.private.hives.detail.replace(':id', id),
      });

      return response.data;
    },
    [request]
  );

  const createHive = useCallback(
    async (data: HiveFormValues) => {
      const response = await request<Hive>({
        method: 'post',
        url: endpoints.private.hives.create,
        data,
      });

      return response.data;
    },
    [request]
  );

  const updateHive = useCallback(
    async (id: string, data: HiveFormValues) => {
      const response = await request<Hive>({
        method: 'put',
        url: endpoints.private.hives.update.replace(':id', id),
        data,
      });

      return response.data;
    },
    [request]
  );

  const deleteHive = useCallback(
    async (id: string) => {
      await request({
        method: 'delete',
        url: endpoints.private.hives.delete.replace(':id', id),
      });
    },
    [request]
  );

  const getHiveMetrics = useCallback(
    async (hive: string) => {
      const response = await request<{ collection_average: number }>({
        method: 'get',
        url: endpoints.private.hives.metrics.replace(':id', hive),
      });

      return response.data;
    },
    [request]
  );

  return {
    listHives,
    getHive,
    createHive,
    updateHive,
    deleteHive,
    getHiveMetrics,
  };
};

export default useHives;
