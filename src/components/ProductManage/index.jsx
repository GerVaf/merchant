import Category from "./components/Category";
import ProductTable from "./components/ProductTable";

const ProductManage = () => {
  return (
    <div className="p-6 space-y-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Category Management
          </h2>
        </div>
        <Category />
      </section>

      <section className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Product Management
          </h2>
        </div>
        <ProductTable />
      </section>
    </div>
  );
};

export default ProductManage;
