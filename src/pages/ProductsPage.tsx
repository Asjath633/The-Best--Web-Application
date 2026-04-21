import Products from '@/sections/Products';

export default function ProductsPage() {
  return (
    <div>
      <Products selectedCategory={null} onSelectCategory={() => {}} />
    </div>
  );
}
