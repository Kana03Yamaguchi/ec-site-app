import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../ApiAdapter/GetProductDetail";
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
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
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <Box sx={{ flex: 1, height: "100vh" }}>
          <Paper elevation={3} sx={{ width: "100%", height: "100%" }}>
            {/* 商品画像セクション */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "white",
                p: 3,
                minHeight: "300px",
              }}
            >
              <img
                src={product?.image}
                alt={product?.title}
                style={{ maxWidth: "600px", width: "100%" }}
              />
            </Box>

            {/* 商品情報セクション */}
            <Box sx={{ bgcolor: "#F2EBE0", p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {/* 商品名 */}
                {product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {/* 商品カテゴリ */}
                カテゴリ: {product?.category}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {/* 商品説明 */}
                {product?.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {/* 商品価格 */}
                価格: ${product?.price}
              </Typography>

              {/* カートに追加ボタン */}
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#433E49",
                  "&:hover": {
                    backgroundColor: "#2E2A34",
                  },
                }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default ProductDetailPage;
