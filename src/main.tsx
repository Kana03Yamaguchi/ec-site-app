import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "./contexts/CartContext";

/**
 * Material-UIのテーマ設定
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

// クライアントのインスタンスを作成
const queryClient = new QueryClient();

// Reactアプリのレンダリング
createRoot(document.getElementById("root")!).render(
  // Material UIのテーマを適用
  <ThemeProvider theme={theme}>
    {/* ルーティングの設定 */}
    <BrowserRouter>
      {/* React Queryの設定をラップ */}
      <QueryClientProvider client={queryClient}>
        {/* カートの状態を管理するプロバイダー */}
        <CartProvider>
          <App />
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
);
