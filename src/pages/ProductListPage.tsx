import { useQuery } from "react-query";
import { getProductList } from "../ApiAdapter/GetProductList";
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Typography,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import listLogo from "../assets/list.png";
import { useMemo, useState } from "react";

/**
 * 商品一覧ページコンポーネント
 * @returns 商品一覧ページ
 */
function ProductListPage() {
  // カートコンテキストを取得
  const { dispatch } = useCart();
  // キーワード検索の状態管理
  const [searchKeyword, setSearchKeyword] = useState("");
  // スナックバーの開閉状態管理
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
  // キーワード検索に基づいて商品をフィルタリング
  const filteredProducts = useMemo(() => {
    // 検索キーワードが空の場合は全商品を返す
    if (!searchKeyword.trim()) return products;
    return products.filter((product) =>
      // 商品名にキーワードが含まれているかをチェック
      product.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [products, searchKeyword]);

  // フィルタリング後の商品リスト
  const productList = filteredProducts?.map((product) => {
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

      // スナックバーを開く
      setSnackbarOpen(true);
    };

    return (
      <Paper
        key={product.id}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "#F2EBE0",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* 商品画像エリア（左） */}
          <Grid size={4}>
            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ maxHeight: "150px", objectFit: "contain" }}
              />
            </Box>
          </Grid>

          {/* 商品情報エリア（右） */}
          <Grid
            size={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <Link
              to={"/products/" + product.id}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Typography variant="h6" gutterBottom>
                {/* 商品名 */}
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {/* 商品説明 */}
                {product.description}
              </Typography>
              <Typography variant="h6">価格: ${product.price}</Typography>
            </Link>

            {/* カートに追加ボタン */}
            <Button
              variant="contained"
              sx={{
                mt: 1,
                backgroundColor: "#433E49",
                "&:hover": {
                  backgroundColor: "#2E2A34",
                },
                color: "white",
                alignSelf: "flex-start",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  });
  return (
    <>
      {/* エラー表示エリア */}
      {error && <p>エラーが発生しました</p>}

      {/* 商品一覧ロゴ */}
      <img
        src={listLogo}
        alt="商品一覧"
        style={{
          height: 50,
          margin: "20px 0",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      {/* キーワード検索エリア */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        sx={{ mb: 3 }}
      />

      {isLoading ? (
        // ローディング中表示
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        // 商品一覧表示
        <div>{productList}</div>
      )}

      {/* スナックバー（カート追加通知） */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={800}
        onClose={() => setSnackbarOpen(false)}
        message="カートに追加しました"
      />
    </>
  );
}

export default ProductListPage;
