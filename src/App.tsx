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
    <Box>
      {/* ヘッダー */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ECサイト
          </Typography>

          <Link to="/cart">
            <Badge badgeContent={totalCartItems} color="secondary" showZero>
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Container>
        <Routes>
          {/* 商品一覧ページ */}
          <Route path="/" element={<ProductListPage />} />
          {/* 商品詳細ページ */}
          <Route path="/products/:id" element={<ProductDetailPage />} />
          {/* カートページ */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>

      {/* フッター */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 2 }}>
        <Container>
          <Typography variant="body2" align="center">
            © 2025 ECサイト
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
