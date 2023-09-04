import FeaturedTitle from './FeaturedTitle'

function Featured() {
 
  return (
    <div className='max-w-screen-2xl m-auto py-2 px-4 lg:px-0'>
        <FeaturedTitle title = 'Featured Products'/>
            <div className='flex xs:flex-wrap gap-2 my-4 lg:mx-4 justify-evenly sm:justify-between items-center'>
                    <div>
                        <img src='../public/images/featured/featured_4.jpg' alt='featured' className='xs:w-full xs:h-[250px] w-[250px]' />
                    </div>
                    <div>
                        <img src='../public/images/featured/featured_2.jpg' alt='featured' className='xs:w-full xs:h-[250px] w-[250px]' />
                    </div>
                    <div>
                        <img src='../public/images/featured/featured_3.jpg' alt='featured' className='xs:w-full xs:h-[250px] w-[250px]' />
                    </div>
                    <div>
                        <img src='../public/images/featured/featured_5.jpg' alt='featured' className='xs:w-full xs:h-[250px] w-[250px]' />
                    </div>            
            </div>
    </div>
  )
}
export default Featured