/**
 * 型定義：PostType
 * - APIから取得する商品情報の型定義
 */
export interface ProductType {
  id: number; // 商品ID
  title: string; // 商品名
  price: number; // 商品価格
  description: string; // 商品説明
  category: string; // 商品カテゴリ
  image: string; // 商品画像URL
}
