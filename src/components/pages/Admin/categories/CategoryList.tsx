import { useDispatch, useSelector } from "react-redux"
 
import { AppDispatch, RootState } from "../../../../app/store"

import { Category, getCategory } from "../../../../features/category/categorySlice"
import { useEffect } from "react";
import { logoutUser } from "../../../../features/auth/userSlice";
import CategoryItem from "../../Category/CategoryItem";
import AddCategory from "./AddCategory";

function CategoryList() {
    const {categories} = useSelector((state:RootState) => state.category)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (categories.length === 0 || localStorage.getItem('token')) {
			dispatch(getCategory());
		} else {
			dispatch(logoutUser());
		}
    },[dispatch, categories.length])


  return (
    <div>
        <div className="flex flex-col mx-auto my-[10%] max-w-[70%] xs:min-w-full lg:max-w-[60%] bg-gray-800 p-8 rounded-lg shadow-2xl">
            <div className="h-10 flex justify-center mb-4">
                <AddCategory />
            </div>
        {
           categories && categories.map((category: Category) => (
                <CategoryItem key={category.id} {...category} />
            ))
        }
        </div>
    </div>
  )
}
export default CategoryList