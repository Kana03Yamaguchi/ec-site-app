import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../ApiAdapter/GetProductDetail";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductDetailPage;
