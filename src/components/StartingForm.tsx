import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import InputField from './InputField';

type Props = {
	setStatus: (status: string) => void;
	handleSubmit: (values: Values) => void;
};

interface Values {
	[index: string]: string;
	height: string;
	width: string;
}

const StartingForm = (props: Props) => {
	const { setStatus, handleSubmit } = props;

	const validateNum = (vals: Values) => {
		const errors: Record<string, string> = {};
		for (let val in vals) {
			if (parseInt(vals[val]) < 4) {
				errors[val] = 'Number must be greater than 4!';
			}
			if (parseInt(vals[val]) > 100) {
				errors[val] = 'Number must be less than 100!';
			}
		}
		return errors;
	};

	return (
		<Box
			mx={'auto'}
			mt={20}
			border={'solid'}
			borderWidth={2}
			bg={'blue.600'}
			borderRadius={15}
			w={'20%'}
		>
			<Formik
				validateOnChange={false}
				initialValues={{ height: '18', width: '18' }}
				onSubmit={(values: Values, { setErrors }) => {
					handleSubmit(values);
					setStatus('awaiting first click');
				}}
				validate={(values) => validateNum(values)}
			>
				<Box w={'75%'} maxW='500px' mx='auto' py={5}>
					<Form>
						<InputField
							name='height'
							placeholder='18'
							label='Height'
						/>
						<InputField
							name='width'
							placeholder='18'
							label='Width'
						/>
						<Button bg={'green.300'} mt={4} w='full' type='submit'>
							Play Game!
						</Button>
					</Form>
				</Box>
			</Formik>
		</Box>
	);
};

export default StartingForm;
