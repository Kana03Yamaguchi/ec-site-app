/**
 * 型定義：CartItemType
 * - カート内の商品に関する型定義
 */
export interface CartItemType {
  id: number; // 商品ID
  quantity: number; // 数量
  price: number; // 価格
}

/**
 * 型定義：CartDataType
 * - カート全体の型定義
 */
export interface CartDataType {
  cartItems: CartItemType[]; // 商品リスト
  totalAmount: number; // 合計金額
}

/**
 * 型定義：initCartData
 * - カート全体の初期値
 */
export const initCartData: CartDataType = {
  cartItems: [], // 商品リスト
  totalAmount: 0, // 合計金額
};
