import { cache } from 'react';

import data from '@/lib/data';
import { Product } from '@/lib/models/ProductModel';

export const revalidate = 3600;

const mockProducts: Product[] = data.products.map((p, i) => ({
  ...p,
  _id: String(i + 1),
}));

const getLatest = cache(async () => {
  return [...mockProducts].reverse().slice(0, 8);
});

const getTopRated = cache(async () => {
  return [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 8);
});

const getFeatured = async () => {
  return mockProducts.filter((p: any) => p.isFeatured).slice(0, 3);
};

const getBySlug = cache(async (slug: string) => {
  return mockProducts.find((p) => p.slug === slug) as Product;
});

const PAGE_SIZE = 3;
const getByQuery = cache(
  async ({
    q,
    category,
    sort,
    price,
    rating,
    page = '1',
  }: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  }) => {
    let filtered = [...mockProducts];

    if (q && q !== 'all') {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()),
      );
    }
    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (rating && rating !== 'all') {
      filtered = filtered.filter((p) => p.rating >= Number(rating));
    }
    if (price && price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    if (sort === 'lowest') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'highest') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'toprated') filtered.sort((a, b) => b.rating - a.rating);
    else filtered.sort((a, b) => Number(b._id) - Number(a._id));

    const countProducts = filtered.length;
    const pageNum = Number(page);
    const products = filtered.slice(
      PAGE_SIZE * (pageNum - 1),
      PAGE_SIZE * pageNum,
    );
    const categories = [...new Set(mockProducts.map((p) => p.category))];

    return {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / PAGE_SIZE),
      categories,
    };
  },
);

const getCategories = cache(async () => {
  return [...new Set(mockProducts.map((p) => p.category))];
});

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getByQuery,
  getCategories,
  getTopRated,
};

export default productService;
