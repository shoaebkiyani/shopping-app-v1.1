type TitleProps = {
    title: string
}

function FeaturedTitle(props: TitleProps) {
  return (
    <h1 className='text-xl text-gray-900'>
        {props.title}
    </h1>
  )
}
export default FeaturedTitle