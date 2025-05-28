import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../pages/CartPage";
import { CartContext, type CartContextType } from "../contexts/CartContext";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// 🔧 getProductListをモック（←CartPageで使ってるやつ）
vi.mock("../api/getProductList", () => ({
  getProductList: () =>
    Promise.resolve([
      {
        id: 1,
        title: "テスト商品",
        price: 1500,
        description: "ダミー説明",
        category: "テストカテゴリ",
        image: "dummy.jpg",
      },
    ]),
}));

// カートのモックデータ（商品1件）
const mockCartContext: CartContextType = {
  state: {
    cartItems: [
      {
        id: 1,
        price: 1500,
        quantity: 2,
      },
    ],
    totalAmount: 3000,
  },
  dispatch: () => {},
};

// 各種Providerをまとめてラップ
const MockCartProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider value={mockCartContext}>
          {children}
        </CartContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

// テスト本体
describe("CartPage", () => {
  test("カート商品が表示される", async () => {
    render(
      <MockCartProvider>
        <CartPage />
      </MockCartProvider>
    );

    // ⏳ 非同期なのでfindByTextに変更
    expect(await screen.findByText("テスト商品")).toBeInTheDocument();
    expect(await screen.findByText("¥1,500")).toBeInTheDocument();
  });
});