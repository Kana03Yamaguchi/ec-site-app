import { useQuery } from "react-query";
import { getProductList } from "../ApiAdapter/GetProductList";
import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

/**
 * 商品一覧ページコンポーネント
 * @returns 商品一覧ページ
 */
function ProductListPage() {
  // カートコンテキストを取得
  const { dispatch } = useCart();

  /**
   * 初期表示処理
   */
  // TODO:商品一覧を取得（キャッシュ・ローディング・エラー状態も含む）
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  /**
   * メモ化
   */
  const productList = products?.map((product) => {
    // 商品をカートに追加する関数
    const handleAddToCart = () => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: product.id,
          price: product.price,
          quantity: 1,
        },
      });
    };

    return (
      <li key={product.id}>
        <Link to={"/products/" + product.id}>
          <img src={product.image} alt={product.title} width={100} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>価格：{product.price}</p>
        </Link>
        <Button onClick={handleAddToCart}>カートに追加</Button>
      </li>
    );
  });
  return (
    <>
      {/* エラー表示エリア */}
      {error && <p>エラーが発生しました</p>}

      <h2>商品一覧ページ</h2>

      {isLoading ? (
        // ローディング中表示
        <div>
          <ul>
            <li>
              <Skeleton variant="rectangular" width={100} height={100} />
              <Skeleton variant="text" width={120} />
              <Skeleton variant="text" width={80} />
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul>{productList}</ul>
        </div>
      )}
    </>
  );
}

export default ProductListPage;
