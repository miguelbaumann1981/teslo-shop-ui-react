import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

const invoices = [
  {
    id: 1,
    image: 'https://placehold.co/250x250',
    name: 'Producto 1',
    price: '250 €',
    category: 'Categoria 1',
    stock: 'Inventario 1',
    sizes: 'XS, L, M',
  },
];

export const AdminProductsPage = () => {
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
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className='font-medium'>#{invoice.id}</TableCell>
              <TableCell>
                <img
                  src={invoice.image}
                  alt='Product'
                  className='w-20 h-20 object-cover rounded-md'
                />
              </TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell>{invoice.category}</TableCell>
              <TableCell>{invoice.stock}</TableCell>
              <TableCell>{invoice.sizes}</TableCell>
              <TableCell>
                <Link to={`/admin/products/t-shirt`}>Editar</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={10} />
    </>
  );
};
