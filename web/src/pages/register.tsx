import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '@/components/InputField';
import { Layout } from '@/components/Layout';
import { useRegisterMutation } from '@/generated/graphql';
import { createUrqlClient } from '@/utils/urql';
import { toErrorMap } from '@/utils/toErrorMap';

const Register = (() => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await register({ options: values });
          if (data?.register.errors) {
            setErrors(toErrorMap(data.register.errors));
          } else if (data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}) as React.FC<{}>;

export default withUrqlClient(createUrqlClient)(Register);
