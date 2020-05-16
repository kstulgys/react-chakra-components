import React from "react";
import { Flex, Button as BaseButton, Box, Stack, Input } from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { ComponentWrapper, Container } from "lib/components";

export function Login() {
  const [formType, setFormType] = React.useState("login");
  return (
    <ComponentWrapper isInline position='relative'>
      <PageImage />
      <Stack p={[4, 10, 10, 20]} width={["full", "full", "50%"]} boxShadow='2xl' spacing='0'>
        <FormControls formType={formType} setFormType={setFormType} />
        <LoginOrRegisterForm mt='12' maxW='lg' formType={formType} />
      </Stack>
    </ComponentWrapper>
  );
}

function FormControls({ formType, setFormType }) {
  return (
    <Stack isInline spacing={[8, 12, 16]}>
      <Box>
        <FormType name='login' formType={formType} onClick={setFormType} />
      </Box>
      <Box>
        <FormType name='register' formType={formType} onClick={setFormType} />
      </Box>
    </Stack>
  );
}

function PageImage(props) {
  return (
    <Flex
      display={["none", "none", "block"]}
      width='50%'
      backgroundImage='url("https://picsum.photos/800/800")'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      flex='1'
      {...props}
    />
  );
}

function FormType({ name, formType, onClick }) {
  return (
    <BaseButton
      height={[12, 16]}
      fontSize={["3xl", "4xl"]}
      fontWeight='medium'
      variant='unstyled'
      onClick={() => onClick(name)}
      color={formType === name ? "green.600" : "gray.400"}
      borderBottom='1px solid'
      borderWidth='7px'
      rounded='none'
      textTransform='uppercase'
      borderColor={formType === name ? "purple.800" : "gray.400"}
      _hover={{
        color: "green.600",
        borderColor: "purple.800",
      }}
    >
      {name}
    </BaseButton>
  );
}

function LoginOrRegisterForm({ formType, ...rest }) {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    triggerValidation,
    getValues,
    reset,
  } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      const response = await api({ delay: 2000, data });
      reset();
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  const validateOnChange = (e) => triggerValidation(e.target.name);

  return (
    <Stack width='full' {...rest}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} width='full'>
          <FormInput
            onChange={validateOnChange}
            isInvalid={!!errors.email}
            placeholder='Email address'
            name='email'
            type='email'
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          <FormInput
            onChange={validateOnChange}
            isInvalid={!!errors.password}
            ref={register({ required: true, minLength: 6 })}
            placeholder='Password'
            name='password'
            type='password'
          />
        </Stack>
        {formType === "register" && (
          <Stack mt='5' spacing={5} width='full'>
            <FormInput
              onChange={validateOnChange}
              isInvalid={!!errors.passwordConfirm}
              ref={register({
                required: true,
                validate: {
                  positive: (value) => getValues("password") === value,
                },
              })}
              placeholder='Password confirm'
              name='passwordConfirm'
              type='password'
            />
            <FormInput
              isInvalid={!!errors.firstname}
              ref={register({ required: true, minLength: 1, maxLength: 20 })}
              onChange={validateOnChange}
              placeholder='First name'
              name='firstname'
              type='text'
            />
            <FormInput
              isInvalid={!!errors.lastname}
              ref={register({ required: true, minLength: 1, maxLength: 20 })}
              onChange={validateOnChange}
              placeholder='Last name'
              name='lastname'
              type='text'
            />
            <FormInput
              isInvalid={!!errors.groupCode}
              ref={register({ required: true, minLength: 4, maxLength: 4 })}
              onChange={validateOnChange}
              placeholder='Code'
              width='24'
              name='groupCode'
              type='number'
            />
          </Stack>
        )}

        <Box mt='6'>
          <BaseButton
            color='white'
            bg='green.600'
            _hover={{
              bg: "green.500",
            }}
            width={["full", 40]}
            height={[12, 16]}
            size='lg'
            type='submit'
            isLoading={isSubmitting}
            textTransform='uppercase'
          >
            {formType}
          </BaseButton>
        </Box>
      </form>
    </Stack>
  );
}

const FormInput = React.forwardRef((props, ref) => {
  return (
    <Input
      ref={ref}
      height={[12, 16]}
      borderRadius='lg'
      size='lg'
      _invalid={{
        bg: "red.100",
        border: "none",
      }}
      _placeholder={{
        color: "gray.600",
      }}
      _focus={{ boxShadow: "outline" }}
      {...props}
    />
  );
});

const api = async ({ delay, data }) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(data ? data : true);
    }, delay);
  });
};
