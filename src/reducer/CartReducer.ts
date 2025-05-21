import type { CartDataType, CartItemType } from "../types/CartType";

// 型定義：アクション（命令の種類）
export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItemType } // 商品をカートに追加
  | { type: "REMOVE_FROM_CART"; payload: number } // 商品をカートから削除
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }; // 商品の数量を更新

// Reducer関数：状態変更のルール
export function cartReducer(
  state: CartDataType,
  action: CartAction
): CartDataType {
  let addCartItem: CartItemType | undefined;
  let removeCartItem: CartItemType | undefined;

  switch (action.type) {
    // カートに商品を追加
    case "ADD_TO_CART":
      // 商品IDを元にカート内の商品を検索
      addCartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      // 既存の商品があれば数量を更新、なければ新規追加
      if (addCartItem) {
        // 既存商品の数量を更新
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          // 合計金額を更新
          totalAmount:
            state.totalAmount + action.payload.price * action.payload.quantity,
        };
      } else {
        // 新規商品をカートに追加
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          // 合計金額を更新
          totalAmount:
            state.totalAmount + action.payload.price * action.payload.quantity,
        };
      }

    // カートから商品を削除
    case "REMOVE_FROM_CART":
      // 商品IDを元にカート内の商品を検索
      removeCartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      // 既存の商品があれば削除
      if (removeCartItem) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload
          ),
          // 合計金額を更新
          totalAmount:
            state.totalAmount - removeCartItem.price * removeCartItem.quantity,
        };
      }
      return state;

    // カート内の商品数量を更新
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        // 合計金額を更新
        totalAmount: state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

    default:
      return state;
  }
}
