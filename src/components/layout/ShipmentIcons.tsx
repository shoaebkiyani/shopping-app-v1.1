import { faAward, faDolly, faShippingFast, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ShipmentIcons() {
  return (
    <div className='bg-gray-900 mx-4 py-3 mb-2'>
        <div className='max-w-[1154px] mx-auto my-4 px-5 relative bg-gray-900'>
            <ul className='flex justify-around'>
                <li className='flex flex-col items-center justify-start p-4'>
                    <div className='text-4xl text-amber-600'><FontAwesomeIcon icon={faDolly} /></div>
                    <span className='xs:text-[14px] xs:font-thin pt-5 text-center leading-none text-amber-600'>Free Shipping</span>
                </li>
                <li className='flex flex-col items-center justify-start p-4'>
                    <div className='text-4xl text-amber-600'><FontAwesomeIcon icon={faShippingFast} /></div>
                    <span className='xs:text-[14px] xs:font-thin pt-5 text-center leading-none text-amber-600'>Fast Shipping</span>
                </li>
                <li className='flex flex-col items-center justify-start p-4'>
                    <div className='text-4xl text-amber-600'><FontAwesomeIcon icon={faTruck} /></div>
                    <span className='xs:text-[14px] xs:font-thin pt-5 text-center leading-none text-amber-600'>Delivery to EU Countries</span>
                </li>
                <li className='flex flex-col items-center justify-start p-4'>
                    <div className='text-4xl text-amber-600'><FontAwesomeIcon icon={faAward} />
                    </div>
                    <span className='xs:text-[14px] xs:font-thin pt-5 text-center leading-none text-amber-600'>24 months warranty</span>
                </li>
            </ul>
        </div>
    </div>
  )
}
export default ShipmentIcons