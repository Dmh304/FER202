import data from "./database.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shopping = ({ onOrderPlaced }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(data.products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);

  // Lấy danh sách category không trùng lặp từ data.products
  const categories = [...new Set(data.products.map((p) => p.category))];

  // Hàm tính điểm đánh giá trung bình
  const getAverageRate = (reviews) => {
    if (!reviews || reviews.length === 0) return (0).toFixed(2);
    const sum = reviews.reduce((acc, current) => acc + current.rating, 0);
    return (sum / reviews.length).toFixed(2);
  };

  // Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Nếu đã có trong giỏ, tăng số lượng
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // Nếu chưa có, thêm mới với số lượng 1
      return [...prevCart, { ...product, quantity: 1, name: product.title }];
    });
  };

  // Hàm xóa khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Hàm xử lý Place Order
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng!");
      return;
    }
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    const newOrder = {
      id: orderHistory.length + 1,
      date: new Date().toLocaleString("vi-VN"),
      address: address,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    setOrderHistory([...orderHistory, newOrder]);
    setCart([]);
    setAddress("");
    alert("Đơn hàng đã được đặt thành công!");

    // Lưu vào localStorage để giữ dữ liệu khi chuyển trang
    localStorage.setItem("orders", JSON.stringify([...orderHistory, newOrder]));
  };

  // Lọc sản phẩm theo category đã chọn
  const displayedProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="container mt-4">
      <h1 className="mb-0 flex-grow-1 text-center">Shopping System</h1>
      {/* Thanh công cụ tìm kiếm / lọc (giữ nguyên của bạn) */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Select all category ---</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div>
          <Button
            variant="success"
            type="button"
            onClick={() => navigate("/orders")}
          >
            Orders History
          </Button>
        </div>
      </div>

      <div className="row">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="col-md-8">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{getAverageRate(product.reviews)}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cột phải: Giỏ hàng */}
        <div className="col-md-4">
          <div className="p-3 border rounded shadow-sm">
            <h3 className="text-center mb-4">Cart</h3>

            <table className="table table-borderless align-middle">
              <thead>
                <tr className="border-bottom">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Form địa chỉ giao hàng */}
            <div className="mt-4">
              <label className="fw-bold mb-2">Ship Address</label>
              <textarea
                className="form-control mb-3"
                rows="3"
                placeholder="Ví dụ: Tòa BE, Đại học FPT, Hà Nội"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="text-end">
                <Button
                  variant="warning"
                  className="fw-bold"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
