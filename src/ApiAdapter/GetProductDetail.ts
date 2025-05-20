import axios from "axios";
import type { ProductType } from "../types/ProductType";

/**
 *  商品詳細取得
 * - 外部APIから商品詳細データを取得する
 * @param id 商品ID
 * @returns ProductType | null の 商品詳細データ
 */
export const getProductDetail = async (
  id: number
): Promise<ProductType | null> => {
  try {
    const response = await axios.get<ProductType>(
      "https://fakestoreapi.com/products/" + id
    );
    // 成功時は取得データを返却
    return response.data;
  } catch {
    // 失敗時は null を返却
    return null;
  }
};
