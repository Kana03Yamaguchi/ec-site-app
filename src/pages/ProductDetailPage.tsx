import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../ApiAdapter/GetProductDetail";

/**
 * 商品詳細ページコンポーネント
 * @returns 商品詳細ページ
 */
function ProductDetailPage() {
  // URLパラメータを取得
  const urlParams = useParams<{ id: string }>();
  // URLパラメータID
  const productId = Number(urlParams.id);

  /**
   * 初期表示処理
   */
  // 商品詳細データを取得
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId, // idが存在する場合のみAPIを実行する
  });

  return (
    <>
      {/* エラー表示エリア */}
      {error && <p>商品データの取得に失敗しました。</p>}

      {isLoading ? (
        // ローディング中表示
        <p>読み込み中...</p>
      ) : (
        <div>
          <h2>{product?.title}</h2>
          <img src={product?.image} alt={product?.title} width={200} />
          <p>価格：{product?.price}</p>
          <p>{product?.description}</p>
          <p>カテゴリ：{product?.category}</p>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
