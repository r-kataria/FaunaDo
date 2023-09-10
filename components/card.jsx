import {
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Container,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Flex,
  Center,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Card = ({ addFn }) => {
  const router = useRouter()
  const toast = useToast()

  const {listid} = router.query

  const [newItem, setNewItem] = useState("");
  const [currentDomain, setCurrentDomain] = useState('');
  const { hasCopied, onCopy } = useClipboard(currentDomain+'/list/'+listid)
  
  useEffect(() => {
    setCurrentDomain(window.location.origin);
  }, [])
  
  const addTodo = (e) => {
    e.preventDefault();

    if (newItem != "") {
      addFn(newItem);
    } else {
      const emojis = [
        "🍇",
        "🍈",
        "🍉",
        "🍊",
        "🍋",
        "🍌",
        "🍍",
        "🥭",
        "🍎",
        "🍏",
        "🍐",
        "🍑",
        "🍒",
        "🍓",
        "🫐",
      ];
      addFn("Buy " + emojis[Math.floor(Math.random() * emojis.length)]);
    }

    setNewItem("");
  };

  const copyURLtoClipboard = () => {
    if (!toast.isActive('clipboard-copy')) {

    toast({
      title: 'URL Copied to Clipboard',
      status: 'info',
      isClosable: true,
      duration: 2500,
      id: 'clipboard-copy'
    })
  }
  onCopy()

}

  return (
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
        This is your Todo List!
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

      <Input
        name="todo"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="❔❔❔"
        _placeholder={{
          textAlign: "center",
          color: "gray.500",
        }}
        type="text"
      />
      <Stack spacing={6}>
        <Button
          onClick={(e) => {
            addTodo(e);
          }}
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Add to My List
        </Button>
      </Stack>
      <Stack spacing={6}>
        <Popover>
          <PopoverTrigger>
            <Button>Share List</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Scan the QR Code or Copy the Link!</PopoverHeader>
            <PopoverBody>
              <Center pb={2}>
                <QRCode value={currentDomain+'/list/'+listid} size={200} />
              </Center>
              <Input
              my={2}
                name="todo"
                value={currentDomain+'/list/'+listid}
                _value={{
                  textAlign: "center",
                  color: "gray.500",
                }}
                type="text"
                readOnly
                onClick={copyURLtoClipboard}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
    </Stack>
  );
};
