import { tesloApi } from '@/api/tesloApi';
import type { Product } from '@/interfaces/product.interface';

export const getProductBySlugAction = async (
  slug: string,
): Promise<Product> => {
  const { data } = await tesloApi.get<Product>(`/products/${slug}`);

  return {
    ...data,
    images: data.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  };
};
