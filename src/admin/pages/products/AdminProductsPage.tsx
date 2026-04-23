import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomScreenLoading } from '@/components/custom/CustomScreenLoading';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { currencyFormatter } from '../../../lib/currency-formatter';

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <CustomScreenLoading />;
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <AdminTitle
          title='Productos'
          subtitle='Aquí puedes administrar tus productos'
        />

        <div className='flex justify-end mb-10 gap-4'>
          <Link to='/admin/products/new'>
            <Button>
              <PlusIcon /> Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className='bg-white p-10 shadow-xs border border-gray-200 mb-10'>
        <TableHeader>
          <TableRow className='bg-emerald-50'>
            <TableHead>ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product?.id}>
              <TableCell>{product?.id}</TableCell>
              <TableCell>
                <img
                  src={product?.images[0] || 'https://placehold.co/250x250'}
                  alt={product?.title}
                  className='w-20 h-20 object-cover rounded-md'
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/products/${product?.id}`}
                  className='hover:text-blue-500 underline'
                >
                  {product?.title}
                </Link>
              </TableCell>
              <TableCell className='font-bold'>
                {currencyFormatter(product?.price)}
              </TableCell>
              <TableCell>{product?.gender.toUpperCase()}</TableCell>
              <TableCell>{product?.stock}</TableCell>
              <TableCell>{product?.sizes.join(', ')}</TableCell>
              <TableCell>
                <Link to={`/admin/products/${product?.id}`}>
                  <PencilIcon className='w-4 h-4 text-blue-500' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
