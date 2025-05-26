import {
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useQuery } from "react-query";
import { getProductList } from "../ApiAdapter/GetProductList";
import { useCallback, useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * カートページコンポーネント
 * @returns カートページ
 */
function CartPage() {
  // カートコンテキストを取得
  const { state, dispatch } = useCart();

  /**
   * 初期表示処理
   */
  // TODO:商品一覧を取得
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  /**
   * メモ化
   */
  // カート内の商品数量更新処理
  const handleUpdateQuantity = useCallback(
    (id: number, newQuantity: number) => {
      // 数量が1未満なら更新しない
      if (newQuantity < 1) return;

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          id: id,
          quantity: newQuantity,
        },
      });
    },
    [dispatch]
  );

  // カート内の商品削除処理
  const handleRemoveFromCart = useCallback(
    (id: number) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: id,
      });
    },
    [dispatch]
  );

  // 合計金額計算処理
  const totalAmount = useMemo(() => {
    return state.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [state.cartItems]);

  // カート内の商品を表示
  const cartItemElements = state.cartItems
    .map((item) => {
      // 商品IDを元にカート内の商品を検索
      const product = products.find((product) => product.id === item.id);
      // 商品が存在しない場合は何もしない
      if (!product) return null;

      return (
        <ListItem key={item.id} alignItems="flex-start" sx={{ mb: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {/* 商品画像 */}
              <Grid size={4}>
                <img src={product.image} alt={product.title} width="100%" />
              </Grid>

              {/* 商品情報 */}
              <Grid size={8}>
                {/* 商品名 */}
                <Typography variant="h6">{product.title}</Typography>
                {/* 商品カテゴリ */}
                <Typography color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {/* 商品数量 */}
                  数量: {item.quantity}
                  {/* 数量変更ボタン（+） */}
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  {/* 数量変更ボタン（-） */}
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  {/* 商品削除ボタン */}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    size="small"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Typography>

                {/* 商品価格 */}
                <Typography variant="body1" sx={{ mt: 1 }}>
                  単価: ${item.price}
                </Typography>

                {/* 商品小計 */}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  小計: ${item.price * item.quantity}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </ListItem>
      );
    })
    // 商品が存在しない場合はnullを返す
    .filter(Boolean);

  return (
    <Container sx={{ mt: 4 }}>
      {cartItemElements.length > 0 ? (
        <>
          {/* カート内の商品リスト */}
          <List>{cartItemElements}</List>

          {/* 合計金額の表示 */}
          <Typography variant="h5" align="right" sx={{ mt: 4 }}>
            合計金額: ${totalAmount}
          </Typography>
        </>
      ) : (
        <Typography>カートは空です</Typography>
      )}
    </Container>
  );
}

export default CartPage;
