import { Outlet } from "react-router-dom"
import ProductsList from "../../pages/Admin/ProductsList"
import AddProduct from "../../pages/Admin/AddProduct"


function ProductLayout() {
  return (
    <div>ProductLayout
      <ProductsList />
      <AddProduct />
      <Outlet />
    </div>
  )
}
export default ProductLayout