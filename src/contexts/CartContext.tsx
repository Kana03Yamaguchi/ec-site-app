import { createContext, useContext, useReducer, type ReactNode } from "react";
import { initialCartDataType, type CartDataType } from "../types/CartType";
import { cartReducer, type CartAction } from "../reducer/CartReducer";

// 型定義：Context
export type CartContextType = {
  state: CartDataType; // カートの状態
  dispatch: React.Dispatch<CartAction>; // カートの状態を変更する関数
};

// Context：カートの状態を管理する
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * カートの状態を返すコンテキストプロバイダー
 * - 他のコンポーネントにカートの状態を渡す
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // カートの状態を管理
  const [state, dispatch] = useReducer(cartReducer, initialCartDataType);

  // カートの状態を返す
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * カートの状態を取得するためのカスタムフック
 * - コンポーネントでCartContextを使ってカート情報にアクセスする
 */
export const useCart = () => {
  // Contextから取得
  const context = useContext(CartContext);

  // Contextがundefinedの場合
  if (!context) {
    throw new Error("useCartは<TodoContext.Provider>の中で使ってください");
  }
  return context;
};
