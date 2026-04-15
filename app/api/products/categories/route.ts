import productService from '@/lib/services/productService';

export const GET = async () => {
  const categories = await productService.getCategories();
  return Response.json(categories);
};
