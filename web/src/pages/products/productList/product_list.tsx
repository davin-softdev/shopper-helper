import { useState, useEffect } from 'react';
import { IProduct, IProductService } from '../../../interfaces/iproduct';
import ProductCard from '../../../common/components/productCard/product_card';
import './product_list.css'
import PageController from '../../../common/components/pageController/page_controller';

interface Props {
  productService: IProductService;
}

const ProductList: React.FC<Props> = ({ productService }) => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [displayProducts, setDisplayProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.ceil(allProducts.length / pageSize);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await productService.fetchProducts();
      setAllProducts(fetchedProducts);
      setDisplayProducts(fetchedProducts.slice(0, pageSize));
    };
    
    loadProducts();
  }, [productService]);

  const handlePageChange = (newPage: number) => {
    const startIndex = (newPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayProducts(allProducts.slice(startIndex, endIndex));
    setPage(newPage);
  }

  return (
    <div className='product-list--container'>
      <div className="product-list">
        {displayProducts.map(product => (
          <div key={product.id} className='product-card--container'>
            <ProductCard type='product' product={product}/>
          </div>
        ))}
      </div>
      <div className='product-list__page-controller'>
        <PageController 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;