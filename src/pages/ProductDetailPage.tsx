import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../ApiAdapter/GetProductDetail";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

/**
 * 商品詳細ページコンポーネント
 * @returns 商品詳細ページ
 */
function ProductDetailPage() {
  // URLパラメータを取得
  const urlParams = useParams<{ id: string }>();
  // URLパラメータID
  const productId = Number(urlParams.id);
  // カートコンテキストを取得
  const { dispatch } = useCart();

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

  /**
   * メモ化
   */
  // 商品をカートに追加する関数
  const handleAddToCart = () => {
    // 商品が存在しない場合は何もしない
    if (!product) return;
    // 商品が存在する場合はカートに追加
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
    <>
      {/* エラー表示エリア */}
      {error && <p>商品データの取得に失敗しました。</p>}

      {isLoading ? (
        // ローディング中表示
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <Grid container spacing={2}>
          <Grid component="div" width={"100%"} height={"80%"}>
            <Card>
              <CardMedia
                component="img"
                alt={product?.title}
                // height="50%"
                image={product?.image}
              />
              <CardContent>
                <Typography variant="h5">{product?.title}</Typography>
                <Typography variant="body2">{product?.description}</Typography>
                <Typography variant="h6">価格: ¥{product?.price}</Typography>
                <Typography variant="body2">
                  カテゴリ: {product?.category}
                </Typography>
                <Button onClick={handleAddToCart}>カートに追加</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductDetailPage;
