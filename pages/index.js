import Head from "next/head";

import { Layout } from "../components/layout";
import { Item } from "../components/item";
import { Card } from "../components/card";
import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createList = () => {
    if (loading) return;
    setLoading(true);
    fetch("/api/create")
      .then((res) => res.json())
      .then((res) => {
        if (res.listid) {
          router.push("/list/" + res.listid.toString());
        }
      });
  };

  return (
    <div>
      <Head>
        <title>Serverless Todo List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          as={Container}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          textAlign={"center"}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
          >
            This is a Todo List App!
          </Heading>
          <Text
            fontSize={{
              base: "sm",
              sm: "md",
            }}
            color={"gray.800"}
          >
            And it is enitrely Serverless ✨
          </Text>

          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              onClick={(e) => createList()}
              color={"white"}
              disabled={loading}
              _hover={{
                bg: "blue.500",
              }}
            >
              {loading ? (
                <SyncLoader color="white" size={10} />
              ) : (
                <>Create a new Todo List</>
              )}
            </Button>
          </Stack>
        </Stack>
      </Layout>
    </div>
  );
}
