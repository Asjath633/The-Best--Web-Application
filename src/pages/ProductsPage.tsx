import Products from '@/sections/Products';

export default function ProductsPage() {
  return (
    <div className="pt-20">
      <Products selectedCategory={null} onSelectCategory={() => {}} />
    </div>
  );
}
