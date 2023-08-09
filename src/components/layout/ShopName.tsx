type ShopNameProp = {
    first: string
    last: string
}

function ShopName(props: ShopNameProp) {
  return (
    <h1>{props.first}<span className='pl-0 text-2xl text-amber-600 p-1 rounded-md'>{props.last}</span></h1>
  )
}
export default ShopName