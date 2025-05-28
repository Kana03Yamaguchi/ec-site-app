import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../contexts/CartContext";
import ProductDetailPage from "../pages/ProductDetailPage";
import * as reactQuery from "react-query";

describe("ProductDetailPage", () => {
  test("商品詳細情報が表示される", () => {
    // useQueryのモック
    vi.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: {
        id: 1,
        title: "モック商品名",
        description: "モック商品説明",
        category: "モックカテゴリ",
        price: 999,
        image: "https://example.com/image.jpg",
      },
      isLoading: false,
      error: null,
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
      isSuccess: true,
      status: "success",
      failureCount: 0,
      isFetched: true,
      isRefetching: false,
      isLoadingError: false,
      isPlaceholderData: false,
      isPreviousData: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      remove: vi.fn(),
      fetchStatus: "idle",
    } as unknown as reactQuery.UseQueryResult); // 型エラーを防止

    render(
      <BrowserRouter>
        <CartProvider>
          <ProductDetailPage />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("モック商品名")).toBeInTheDocument();
    expect(screen.getByText(/モックカテゴリ/)).toBeInTheDocument();
    expect(screen.getByText(/999/)).toBeInTheDocument();
  });
});
