import {
  AppBar,
  Badge,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useCart } from "./contexts/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMemo } from "react";
import siteLogo from "./assets/site_name.png";

/**
 * Appコンポーネント
 * - アプリ全体のレイアウトとルーティングを管理
 */
function App() {
  // カートコンテキストを取得
  const { state } = useCart();

  /**
   * メモ化
   */
  // カートの商品合計数を計算
  const totalCartItems = useMemo(() => {
    return state.cartItems.reduce((totalItem, item) => {
      return totalItem + item.quantity;
    }, 0);
  }, [state.cartItems]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ヘッダー */}
      <AppBar position="sticky" sx={{ bgcolor: "#DDC9BC", color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 左：空のBoxでバランス調整 */}
          <Box sx={{ flex: 1 }} />

          {/* 中央：ロゴ */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={siteLogo}
              alt="サイトロゴ"
              style={{ height: 40, marginRight: 8 }}
            />
          </Box>

          {/* 右：ナビゲーション（TOP・カート） */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              TOP
            </Link>

            <Link to="/cart" style={{ color: "black" }}>
              <Badge badgeContent={totalCartItems} color="secondary" showZero>
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          {/* 商品一覧ページ */}
          <Route path="/" element={<ProductListPage />} />
          {/* 商品詳細ページ */}
          <Route path="/products/:id" element={<ProductDetailPage />} />
          {/* カートページ */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Box>

      {/* フッター */}
      <Box sx={{ bgcolor: "#DDC9BC", color: "black", py: 2 }}>
        <Container>
          <Typography variant="body2" align="center">
            © 2025 Online Shop
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
