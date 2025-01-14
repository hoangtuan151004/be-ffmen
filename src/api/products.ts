import { Data, Product } from "../types";
import { baseApi } from "./index";
import axios from "axios";
export const getAllProducts = async (): Promise<Product | null> => {
  try {
    const response = await baseApi.get<Product>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }
};
export const getProduct = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await baseApi.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductHot = async (): Promise<Product | null> => {
  try {
    const response = await baseApi.get<Product>("/products/hot");
    return response.data;
  } catch (error) {
    console.error("Error fetching new products", error);
    return null;
  }
};
export const getProductDetail = async (id: string): Promise<Data | null> => {
  try {
    const response = await baseApi.get<Data>(`/products/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details", error);
    return null;
  }
};
export const relatedProducts = async (id: string): Promise<Data | null> => {
  try {
    // Thay đổi URL để bao gồm productId trong query parameters
    const response = await baseApi.get<Data>(`/products/lienquan/${id}`);

    console.log({ response: typeof response.data });

    return response.data;
  } catch (error) {
    console.error("Error fetching product relatedProducts", error);
    return null;
  }
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

export const deleteProduct = async (
  id: string
): Promise<{ ProductDelete: Data } | null> => {
  try {
    const response = await baseApi.delete(`/products/${id}`);
    return response.data as { ProductDelete: Data };
  } catch (error) {
    console.error("Error deleting product", error);
    return null;
  }
};
// Hàm thêm sản phẩm
// export const addProduct = async (
//   data: FormData,
//   accessToken: string,
//   callbacks: {
//     setError: (error: string) => void;
//     setMessage: (message: string) => void;
//     setShowPopup: (isVisible: boolean) => void;
//     setIsSuccessPopupVisible: (isVisible: boolean) => void;
//     fetchProducts: () => void;
//     setPreviewimg: (preview: string | null) => void;
//     setSubmitting: (isSubmitting: boolean) => void;
//   }
// ) => {
//   const {
//     setError,
//     setMessage,
//     setShowPopup,
//     setIsSuccessPopupVisible,
//     fetchProducts,
//     setPreviewimg,
//     setSubmitting,
//   } = callbacks;

//   try {
//     const res = await fetch("http://localhost:3000/products/add", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`, // Thêm token vào header nếu cần
//       },
//       body: data,
//     });
//     const result = await res.json();
//     if (result.error) {
//       setError(result.error); // Hiển thị lỗi từ server
//     } else {
//       setMessage(result.message); // Hiển thị thông báo thành công
//       setShowPopup(false); // Đóng popup
//       setIsSuccessPopupVisible(true); // Hiển thị popup thành công
//       fetchProducts(); // Reload danh sách sản phẩm
//       setPreviewimg(null); // Reset ảnh xem trước
//     }
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       setError(err.message);
//     } else {
//       setError(String(err));
//     }
//   } finally {
//     setSubmitting(false); // Đảm bảo trạng thái submitting luôn được tắt
//   }
// };

// Xử lý khi thay đổi ảnh
export const handleImgChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: any) => void,
  setPreviewimg: (preview: string | null) => void
) => {
  const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
  if (!file) return; // Nếu không có file thì không làm gì
  setFieldValue("img", file); // Gắn file vào form
  const reader = new FileReader();
  reader.onload = () => {
    setPreviewimg(reader.result as string); // Hiển thị ảnh xem trước
  };
  reader.readAsDataURL(file); // Đọc file ảnh
};

// phân trang
export const getPaginatedProducts = async (
  pageNumber: number,
  limit: number,
  sortBy: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/paginated/products?pageNumber=${pageNumber}&limit=${limit}&sortBy=${sortBy}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", (error as Error).message);
    return null;
  }
};

export const getProductsByCategory = async (
  category: string,
  token: string
) => {
  try {
    const response = await axios.get(`/products/category/${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API lấy sản phẩm theo danh mục:", error);
    throw error;
  }
};
