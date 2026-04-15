import { Metadata } from 'next';
import { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import Slider from '@/components/slider/Slider';

export const metadata: Metadata = {
  title: "Olivia's Verden",
  description: 'Din ultimate destinasjon for mote og stil',
};

const HomePage = () => {
  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      <div>
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </div>
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='flex-1'>
          <p className='text-nowrap text-4xl font-semibold md:text-6xl'>
            Enkelt unikt/ <br /> Enkelt bedre.
          </p>
        </div>
        <div className='flex flex-1 items-center'>
          <div>
            <span className='font-bold'>Olivia&apos;s Verden</span> er en gave &amp;
            klesbutikk. <br className='hidden sm:inline' />
            Utforsk vår samling av stilfulle klær.
          </div>
        </div>
      </div>
      <Categories />
      <Icons />

      <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Nyeste produkter' />}
      >
        <ProductItems />
      </Suspense>

      <Suspense fallback={<ProductItemsSkeleton qty={4} name='Toppvurderte' />}>
        <Slider />
      </Suspense>

      <ReadMore>
        <Text />
      </ReadMore>
    </div>
  );
};

export default HomePage;
