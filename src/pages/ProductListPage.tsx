import { useQuery } from "react-query";
import { getProductList } from "../ApiAdapter/GetProductList";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * 商品一覧ページコンポーネント
 * @returns 商品一覧ページ
 */
function ProductListPage() {
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
    return (
      <li key={product.id}>
        <Link to={"/products/" + product.id}>
          <img src={product.image} alt={product.title} width={100} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>価格：{product.price}</p>
        </Link>
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
