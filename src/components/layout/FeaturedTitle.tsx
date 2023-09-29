type TitleProps = {
	title: string;
};

function FeaturedTitle(props: TitleProps) {
	return <h1 className='text-xl mx-4'>{props.title}</h1>;
}
export default FeaturedTitle;
