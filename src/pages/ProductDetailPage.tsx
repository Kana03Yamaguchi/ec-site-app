import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../ApiAdapter/GetProductDetail";
import {
  Button,
  Grid,
  Paper,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

// Grid内で使う <Item> コンポーネント
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  textAlign: "left",
  boxShadow: "none",
}));

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
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* 商品画像（左） */}
          <Grid size={5}>
            <Item>
              <img
                src={product?.image}
                alt={product?.title}
                style={{ width: "100%", objectFit: "contain", maxHeight: 300 }}
              />
            </Item>
          </Grid>

          {/* 商品情報（右） */}
          <Grid size={7}>
            <Item>
              <Typography variant="h5" gutterBottom>
                {product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                カテゴリ: {product?.category}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {product?.description}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                価格: ${product?.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleAddToCart}
              >
                カートに追加
              </Button>
            </Item>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductDetailPage;
