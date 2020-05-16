/*@jsx jsx*/
import { jsx } from "@emotion/core";
import React from "react";
import {
  Stack,
  Input,
  Checkbox as BaseCheckbox,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { ComponentWrapper, Container } from "lib/components";

export const CreateAccount = (props) => {
  return (
    <ComponentWrapper bg='gray.100'>
      <Stack
        backgroundImage='url("https://picsum.photos/1600/250")' /* The image used */
        backgroundPosition='center' /* Center the image */
        backgroundRepeat='no-repeat' /* Do not repeat the image */
        backgroundSize='cover'
        height='250px'
      />
      <Container maxW='5xl' mt='-120px'>
        <Stack
          spacing={[6, "12"]}
          bg='white'
          p={[3, 10]}
          py={[4, 16]}
          boxShadow='2xl'
          borderRadius='30px'
          {...props}
        >
          <Box mx='auto'>
            <Text fontSize='3xl' fontWeight='bold' textAlign='center'>
              Create a free account
            </Text>
          </Box>
          <Stack>
            <RegisterForm mx='auto' />
          </Stack>
        </Stack>
      </Container>
    </ComponentWrapper>
  );
};

const RegisterForm = (props) => {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    triggerValidation,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { isSubmitting, touched } = formState;

  const onSubmit = async (data) => {
    try {
      const response = await api({ delay: 2000, data });
      typeof window !== "undefined" && window.alert(JSON.stringify(response, null, 2));
      reset();
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  const doValidate = (e) => triggerValidation(e.target.name);
  return (
    <Stack
      as='form'
      onSubmit={handleSubmit(onSubmit)}
      spacing='6'
      maxW='lg'
      width='full'
      {...props}
    >
      <FormInput
        placeholder='Your email*'
        onChange={doValidate}
        onFocus={doValidate}
        isInvalid={!!errors.email}
        touched={touched.email}
        name='email'
        type='email'
        ref={register({
          required: true,
          min: 3,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        })}
      />
      <FormInput
        touched={touched.firstname}
        placeholder='First name*'
        type='text'
        isInvalid={!!errors.firstname}
        ref={register({ required: true, min: 1, max: 20 })}
        onChange={doValidate}
        onFocus={doValidate}
        name='firstname'
      />
      <FormInput
        placeholder='Last name*'
        type='text'
        touched={touched.lastname}
        isInvalid={!!errors.lastname}
        ref={register({ required: true, min: 1, max: 20 })}
        onChange={doValidate}
        onFocus={doValidate}
        name='lastname'
      />
      <FormInput
        placeholder='Password*'
        type='password'
        onChange={doValidate}
        onFocus={doValidate}
        touched={touched.password}
        isInvalid={!!errors.password}
        ref={register({ required: true, minLength: 6 })}
        name='password'
      />
      <FormInput
        placeholder='Repeat password*'
        type='password'
        onChange={doValidate}
        onFocus={doValidate}
        touched={touched.passwordConfirm}
        isInvalid={!!errors.passwordConfirm}
        name='passwordConfirm'
        ref={register({
          required: true,
          validate: {
            positive: (value) => getValues("password") === value,
          },
        })}
      />
      <Checkbox
        ml='1'
        onFocus={doValidate}
        onChange={doValidate}
        isInvalid={!!errors.checkbox}
        touched={touched.checkbox}
        name='checkbox'
        ref={register({
          required: true,
          validate: {
            positive: (value) => value,
          },
        })}
      />
      <Box mt='5' mx='auto'>
        <Button
          type='submit'
          height='16'
          width='40'
          rounded='full'
          fontSize='xl'
          color='white'
          isLoading={isSubmitting}
          fontWeight='bold'
          bg='purple.600'
          _hover={{
            bg: "purple.500",
          }}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};

// eslint-disable-next-line react/display-name
const Checkbox = React.forwardRef(({ isInvalid, touched, ...rest }, ref) => {
  return (
    <BaseCheckbox
      ref={ref}
      size='lg'
      variantColor='gray'
      borderColor={!isInvalid ? "gray.300" : "red.300"}
      {...rest}
    >
      <Text fontSize='sm'>
        Accept{" "}
        <Box as='span' fontWeight='semibold'>
          Terms and Conditions
        </Box>
      </Text>
    </BaseCheckbox>
  );
});

// eslint-disable-next-line react/display-name
const FormInput = React.forwardRef((props, ref) => {
  const { touched, isInvalid } = props;

  return (
    <InputGroup size='lg'>
      <Input
        px='6'
        height={[12, 16]}
        ref={ref}
        _focus={{
          boxShadow: "outline",
        }}
        size='lg'
        rounded='full'
        borderColor='gray.300'
        _placeholder={{ fontWeight: "light" }}
        errorBorderColor='red.300'
        {...props}
      />
      <InputRightElement height={[12, 16]} pr='4'>
        {touched && (
          <Icon
            name={!isInvalid ? "check-circle" : "warning"}
            size='8'
            color={!isInvalid ? "purple.300" : "red.300"}
          />
        )}
      </InputRightElement>
    </InputGroup>
  );
});

const api = async ({ delay, data }) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(data ? data : true);
    }, delay);
  });
};
