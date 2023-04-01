import AssortmentMenu from '@/components/Products/AssortmentMenu';
import ProductSearchBar from '@/components/Products/ProductSearchBar';
import ProductsTable from '@/components/Products/ProductsTable';
import React from 'react';

const page = () => {
  return (
    <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <h3 className="text-center">Sök bland 200 000 bygg produkter!</h3>
      <div className="max-w-[600px] mx-auto mt-4">
        <ProductSearchBar />
      </div>
      <div className="max-w-[1200px] mx-auto flex gap-4 mt-4">
        <div className="flex-none w-64">
          <AssortmentMenu />
        </div>
        <div className="flex-grow bg-white rounded-2xl">
          <ProductsTable />
        </div>
      </div>
    </div>
  );
};

export default page;
