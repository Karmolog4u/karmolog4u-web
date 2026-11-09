const ProductsError = ({ error }: { error: string }) => {
  return <div>{error ? error : 'Помилка'}</div>;
};

export default ProductsError;
