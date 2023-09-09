import { Category } from "../../../features/category/categorySlice"

function CategoryItem(category: Category) {
  return (
    <>
      <div className="px-3 bg-gray-400 m-3">{category.name}</div>
    </>
  )
}
export default CategoryItem