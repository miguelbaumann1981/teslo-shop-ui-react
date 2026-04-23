import { Navigate, useParams } from 'react-router';

import { useAdminProduct } from '@/admin/hooks/useAdminProduct';
import { CustomScreenLoading } from '@/components/custom/CustomScreenLoading';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  const { id } = useParams();
  const { isLoading, isError, data: product } = useAdminProduct(id || '');

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  if (isError) {
    return <Navigate to='/admin/products' />;
  }

  if (isLoading) {
    return <CustomScreenLoading />;
  }

  if (!product) {
    return <Navigate to='/admin/products' />;
  }

  return (
    <ProductForm
      title={title}
      subtitle={subtitle}
      product={product}
      // onSubmit={handleSubmitForm(product)}
    />
  );
};
