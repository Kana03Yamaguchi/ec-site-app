import {
  Container,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useQuery } from "react-query";
import { getProductList } from "../ApiAdapter/GetProductList";

/**
 * カートページコンポーネント
 * @returns カートページ
 */
function CartPage() {
  // カートコンテキストを取得
  const { state } = useCart();

  /**
   * 初期表示処理
   */
  // TODO:商品一覧を取得
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

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
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  数量: {item.quantity}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  単価: ${item.price}
                </Typography>
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
        <List>{cartItemElements}</List>
      ) : (
        <Typography>カートは空です</Typography>
      )}
    </Container>
  );
}

export default CartPage;
