import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"; // Material UIのButtonコンポーネントを使う
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CartPage from "./components/CartPage";
import ProductListPage from "./components/ProductListPage";

/**
 * Appコンポーネント
 * - アプリ全体のレイアウトとルーティングを管理
 */
function App() {
  return (
    <BrowserRouter>
      <Box>
        {/* ヘッダー */}
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ECサイト
            </Typography>
            <Link to="/cart">カート</Link>
          </Toolbar>
        </AppBar>

        {/* メインコンテンツ */}
        <Container>
          <Routes>
            {/* 商品一覧ページ */}
            <Route path="/" element={<ProductListPage />} />{" "}
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
    </BrowserRouter>
  );
}

export default App;
