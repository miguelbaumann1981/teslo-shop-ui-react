import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import { createUpdateProductAction } from '../actions/create-update-product.action';
import type { Product } from '@/interfaces/product.interface';

export const useAdminProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product admin', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    // enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      queryClient.setQueryData(['products', { id: product.id }], product);
    },
  });

  return {
    ...query,
    mutation,
  };
};
