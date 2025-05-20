import axios from "axios";
import type { ProductType } from "../types/ProductType";

/**
 *  商品一覧取得
 * - 外部APIから商品一覧データを取得する
 * @returns ProductType[] 商品一覧データ
 */
export const getProductList = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    // 成功時は取得データを返却
    return response.data;
  } catch {
    // 失敗時は空の配列を返却
    return [];
  }
};
