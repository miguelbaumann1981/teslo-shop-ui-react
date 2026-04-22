import { Badge } from '@/components/ui/badge';
import { getProductBySlugAction } from '@/shop/actions/get-product-slug.action';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export const ProductPage = () => {
  const { idSlug } = useParams();

  const { data } = useQuery({
    queryKey: ['product', idSlug],
    queryFn: () => getProductBySlugAction(idSlug!),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className='py-12 px-4 lg:px-8'>
      <div className='container mx-auto'>
        <div className='flex flex-row gap-8'>
          <div className='w-200'>
            <img
              src={data?.images[0]}
              alt={data?.title}
              className='h-full w-full object-cover border border-gray-200'
            />
          </div>

          <div className='w-600'>
            <ul className='list-none'>
              <li className='flex mb-3'>
                <span className='font-montserrat font-bold'>{data?.title}</span>
              </li>

              <li className='flex mb-3'>
                <span>{data?.description}</span>
              </li>

              <li className='flex mb-3'>
                <span className='min-w-37.5 text-gray-400'>Género</span>
                <span>{data?.gender.toUpperCase()}</span>
              </li>

              <li className='flex mb-3'>
                <span className='min-w-37.5 text-gray-400'>Precio</span>
                <span className='font-bold'>{data?.price} €</span>
              </li>

              <li className='flex mb-3'>
                <span className='min-w-37.5 text-gray-400'>En stock</span>
                <span>{data?.stock}</span>
              </li>

              <li className='flex mb-3'>
                <span className='min-w-37.5 text-gray-400'>Tallas</span>
                {data?.sizes.map((size) => (
                  <Badge className='mr-2' key={size}>
                    {size}
                  </Badge>
                ))}
              </li>

              <li className='flex mb-3'>
                <span className='min-w-37.5 text-gray-400'>Etiquetas</span>
                {data?.tags.map((tag) => (
                  <Badge key={tag} variant='secondary'>
                    {tag}
                  </Badge>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
