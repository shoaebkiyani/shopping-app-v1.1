import { faAward, faDolly, faShippingFast, faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ShipmentIcons() {
  return (

    <div className="bg-slate-200 mx-4">
        <div className="max-w-[1154px] my-4 px-5 relative bg-slate-200">
            <ul className="flex justify-around">
                <li className="flex flex-col items-center justify-start p-4">
                    <div className="text-4xl"><FontAwesomeIcon icon={faDolly} /></div>
                    <span className="text-[14px] xs:font-thin pt-5 text-center leading-none">Free Shipping</span>
                </li>
                <li className="flex flex-col items-center justify-start p-4">
                    <div className="text-4xl"><FontAwesomeIcon icon={faShippingFast} /></div>
                    <span className="text-[14px] xs:font-thin pt-5 text-center leading-none">Fast Shipping</span>
                </li>
                <li className="flex flex-col items-center justify-start p-4">
                    <div className="text-4xl"><FontAwesomeIcon icon={faTruck} /></div>
                    <span className="text-[14px] xs:font-thin pt-5 text-center leading-none">Delivery to EU Countries</span>
                </li>
                <li className="flex flex-col items-center justify-start p-4">
                    <div className="text-4xl"><FontAwesomeIcon icon={faAward} />
                    </div>
                    <span className="text-[14px] xs:font-thin pt-5 text-center leading-none">24 months warranty</span>
                </li>
            </ul>
        </div>
    </div>



    // <div className="h-[200px] bg-[#f3f5f6] py-4 mx-4 relative border border-black">
    //     <div className="container my-0 mx-auto max-w-[1154px] flex justify-center border border-black">
    //         <ul className=" items-center border border-black">
    //             <li className="xs:text-[12px] text-xl p-0">
    //                 <FontAwesomeIcon icon={faDolly} className="xs:text-xl text-6xl px-0" />
    //                 <span className="block mt-2 max-w-[9em]">Free Shipp</span>
    //             </li>
    //             <li className="xs:text-[12px] text-xl p-0">
    //                 <FontAwesomeIcon icon={faShippingFast} className="xs:text-xl text-6xl px-0" />
    //                 <span className="block mt-2 max-w-[9em]">Fast Shipp</span> 
    //             </li>
    //             <li className="xs:text-[12px] text-xl p-0">
    //                 <FontAwesomeIcon icon={faTruck} className="xs:text-xl text-6xl px-0" />
    //                 <span className="block mt-2 max-w-[9em]">EU Shipping</span>
    //             </li>
    //             <li className="xs:text-[12px] text-xl p-0">
    //                 <FontAwesomeIcon icon={faAward} className="xs:text-xl text-6xl px-0" />
    //                 <span className="block mt-2 max-w-[9em]">24 months warranty</span>
    //             </li>
    //         </ul>
    //     </div>


    // </div>
  )
}
export default ShipmentIcons