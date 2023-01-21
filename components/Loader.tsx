import styled from 'styled-components';

interface LoaderProps {
	height: string | number;
	width: string | number;
}

const Loader = ({ height, width }: LoaderProps) => {
	return (
		<Parent>
			<img
				src='/images/loader.gif'
				height={height}
				width={width}
				alt='Loader'
			/>
		</Parent>
	);
};

export default Loader;

const Parent = styled.div`
	height: 100%;
	width: 100%;
`;
