import fs from 'fs/promises';
import path from 'path';

import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

const ProductItem = async ({ product }: { product: Product }) => {
  let base64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  try {
    let buffer: Buffer;
    if (product.image.startsWith('/')) {
      buffer = await fs.readFile(
        path.join(process.cwd(), 'public', product.image),
      );
    } else {
      buffer = await fetch(product.image).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );
    }
    const result = await getPlaiceholder(buffer);
    base64 = result.base64;
  } catch {}

  return (
    <div className='card mb-4 bg-base-300'>
      <figure>
        <Link
          href={`/product/${product.slug}`}
          className='relative aspect-square h-full w-full'
        >
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={base64}
            width={350}
            height={350}
            className='h-full w-full object-cover'
          />
        </Link>
      </figure>
      <div className='card-body'>
        <Link href={`/product/${product.slug}`}>
          <h3 className='card-title line-clamp-1 font-normal'>
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} caption={`(${product.name})`} isCard />
        <p className='line-clamp-1'>{product.brand}</p>
        <div className='card-actions flex items-center justify-between'>
          <span className='text-2xl'>${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
