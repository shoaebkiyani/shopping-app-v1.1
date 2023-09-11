import { Category, deleteCategory } from "../../../features/category/categorySlice"
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";

function CategoryItem(category: Category) {

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
      dispatch(deleteCategory(id))
  }

  return (
    <>
        <div className="flex justify-between items-center py-2 px-4 mb-4 border text-white border-white rounded-xl">
          {category.name.toUpperCase()}
          <div className="flex justify-between items-center w-12 xs:w-8">
            <BiEdit size={15} className='text-green-400 cursor-pointer' />
            <RiDeleteBin6Line size={15} onClick={() => handleDelete(category.id)} className='text-red-400 cursor-pointer' />
          </div>
        </div>
    </>
  )
}
export default CategoryItem