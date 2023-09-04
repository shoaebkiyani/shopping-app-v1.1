import React from 'react';

interface Props {
	isChecked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

const Checkbox = (props: Props) => {
	return (
		<div className='flex xs:w-full items-center xs:justify-center align-middle border border-black rounded-xl p-2 sm:mr-2 md:mr-2 xs:mb-2 xs:text-sm text-center'>
			<input
				type='checkbox'
				id={props.label}
				checked={props.isChecked}
				onChange={props.handleChange}
                className='cursor-pointer'
			/>
			<label className='ml-2' htmlFor={props.label}>{props.label}</label>
		</div>
	);
};

export default Checkbox;
