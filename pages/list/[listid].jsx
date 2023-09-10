import { Client, fql, FaunaError } from "fauna";
import Head from "next/head";
import { useEffect, useState } from "react";

import { Layout } from "../../components/layout";
import { Item } from "../../components/item";
import { Card } from "../../components/card";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const { listid } = router.query;

  const [todoList, setTodoList] = useState({ list: [], source: "" });

  const client = new Client({
    secret: process.env.NEXT_PUBLIC_FAUNA_KEY,
  });

  var stream;

  const checkListExists = async (ref) => {
    if (!listid) return false;
    const checkQuery = await client
      .query(fql`todo.byId(${ref}).exists()`)
      .catch((e) => {
        return false;
      });
    return checkQuery;
  };

  const redirectIfInvalid = async () => {
    const exists = await checkListExists(listid);
    if (!exists) {
      await router.push("/");
    }
  };

  const syncDB = async (listid) => {
    console.log("Establishing Stream With Database 💌");

    const query = fql`todo.where(.id == ${listid}).toStream()`;
    client.stream(query).start(
      function onEvent(event) {
        switch (event.type) {
          case "update":
            setTodoList({ list: event.data.list, source: "db" });
            break;
        }
      },
      function onFatalError(error) {
        console.log("💀 Stream Died...");
        console.log(error);
      }
    );

    
  };

  const fetchData = (listid) => {
    const response = client
      .query(fql`todo.byId(${listid})`)
      .then((r) => setTodoList({ list: r.data.list, source: "db" }))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (listid) {
      redirectIfInvalid().then((e) => e);
    }
    fetchData(listid);
    syncDB(listid);
  }, [listid]);

  useEffect(() => {
    if (todoList.source == "client" && listid) {
      client
        .query(fql`todo.byId(${listid})?.update({ list: ${todoList.list} })`)
        .catch((e) => console.log(e));
      setTodoList({ ...todoList, source: "" });
    }
  }, [todoList]);

  const addFn = (item) => {
    setTodoList({ list: todoList.list.concat([item]), source: "client" });
    syncDB();
  };

  const removeFn = (index) => {
    setTodoList({
      list: todoList.list.filter((item, i) => i != index),
      source: "client",
    });
  };

  return (
    <div>
      <Head>
        <title>Serverless Todo List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Card addFn={addFn} />
        <Container maxW={"6xl"} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {todoList.list.map((e, i) => (
              <Item data={e} removeFn={removeFn} key={i} index={i}></Item>
            ))}
          </SimpleGrid>
        </Container>
      </Layout>

      <br />
    </div>
  );
}
