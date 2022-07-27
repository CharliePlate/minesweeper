import React from 'react';

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	NumberInput,
	NumberInputField,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface Props {
	name: string;
	label: string;
	placeholder: string;
	type?: string;
}

const InputField = (props: Props) => {
	const [field, { error }] = useField(props);

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{props.label}</FormLabel>
			<NumberInput>
				<NumberInputField
					{...field}
					id={field.name}
					placeholder={props.placeholder}
				/>
			</NumberInput>
			<FormErrorMessage>{error}</FormErrorMessage>
		</FormControl>
	);
};

export default InputField;
