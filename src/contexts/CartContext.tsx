import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { type CartDataType } from "../types/CartType";
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
  // カートの前回保存データを取得
  const getSavedCartState = (): CartDataType => {
    // 前回保存データをlocalStorageから取得
    const savedCartData = localStorage.getItem("cartData");

    if (savedCartData) {
      // 前回保存データが存在する場合
      try {
        // JSON変換：文字列から配列に変換
        return JSON.parse(savedCartData);
      } catch (error) {
        // JSON変換に失敗した場合
        console.error("カートデータの復元に失敗しました", error);
      }
    }
    // データがない or JSONが壊れてたときの初期値
    return { cartItems: [], totalAmount: 0 };
  };

  // カートの状態を管理
  const [state, dispatch] = useReducer(
    cartReducer, // カートの状態を変更する関数
    undefined, // 仮の初期値
    getSavedCartState // 前回保存データを取得する関数：初期値
  );

  // カートが変更されたときにlocalStorageに保存
  useEffect(() => {
    // カートの状態をlocalStorageに保存
    localStorage.setItem("cartData", JSON.stringify(state));
  }, [state]);

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

export { CartContext };
