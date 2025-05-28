import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../contexts/CartContext";
import ProductListPage from "../pages/ProductListPage";
import { QueryClient, QueryClientProvider } from "react-query";

// テスト用のQueryClient（キャッシュを共有しないよう毎回新規生成）
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe("ProductListPage", () => {
  test("初期表示でロゴ画像が表示される", () => {
    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <BrowserRouter>
          <CartProvider>
            <ProductListPage />
          </CartProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const logoImg = screen.getByAltText("商品一覧");
    expect(logoImg).toBeInTheDocument();
  });
});
