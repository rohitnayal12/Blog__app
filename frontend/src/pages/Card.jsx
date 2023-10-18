
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Badge,
  Input,
  Textarea,
  Select,
  useToast,
  Avatar,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

import { FormControl, FormLabel } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Routes/Auth_context";

const Card = ({ item, fetchBlog }) => {
  const toast = useToast();
  const [comment, setComment] = useState([]);

  const [isediting, setIseditng] = useState(false);

  const [editedData, setEditedData] = useState({
    title: item.title,
    content: item.content,
    category: item.category,
  });

  const {Authstate}=useContext(AuthContext)
  // console.log(Authstate)

  const [user,setUser]=useState(Authstate.user) 



  const handleEdit = () => {
    setIseditng(true);
    //onOpen()
  };

  const handlesaveclick = () => {
    try {
      const authtoken = localStorage.getItem("token");
      fetch(`https://blogs-gvrb.onrender.com/api/blogs/${item._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response);
        })

        .then(() => {
          fetchBlog();
        })
        .then(() => {
          toast({
            title: "Blog Edited successfully",
            description: "Your blog has been edited succesfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
    setIseditng(false);
  };

  const deleteBlog = () => {
    try {
      const authtoken = localStorage.getItem("token");
      fetch(`https://blogs-gvrb.onrender.com/api/blogs/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          toast({
            title: "Blog deleted successfully",
            description: "Your blog has been deleted succesfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })

        .then(() => {
          fetchBlog();
        })

        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = () => {
    try {
      const authtoken = localStorage.getItem("token");
      fetch(
        `https://blogs-gvrb.onrender.com/api/blogs/${item._id}/comment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ content: comment }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          toast({
            title: "Comment added successfully",
            description: "Your comment has been added succesfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })

        .then(() => {
          fetchBlog();
        })

        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    try {
      const authtoken = localStorage.getItem("token");
      fetch(
        `https://blogs-gvrb.onrender.com/api/blogs/${item._id}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ content: comment }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          toast({
            title: "Blog liked ",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })

        .then(() => {
          fetchBlog();
        })

        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      key={item._id}
      borderwidth="1px"
      borderradius="1g"
      overflow="hidden"
      p={4}
      maxW="90%"
      boxshadow="md"
      border={"2px solid brown"}
      ml={"5%"}
      mt={5}
      backgroundColor="white"
      color="black"
    >
      <Flex justifyContent="space-between" mb={5}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={item.username} src="#" />

            <Box>
              <Heading size="sm">{item.username}</Heading>
              <Text>Creator of this Blog</Text>
            </Box>
          </Flex>
        </Flex>

        <Flex justifyContent={"space-evenly"} gap={2}>
        {user.username==item.username? <Button
            bg={"teal"}
            color={"black"}
            onClick={() => {
              handleEdit();
            }}
          >
            Edit
          </Button>:""}
          
          <Modal
            isOpen={isediting}
            onClose={() => {
              setIseditng(false);
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit your Blog</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box border={"2px solid black"} padding={4}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      value={editedData.title}
                      onChange={(e) => {
                        setEditedData({ ...editedData, title: e.target.value });
                      }}
                      border={"2px solid black"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      value={editedData.content}
                      onChange={(e) => {
                        setEditedData({
                          ...editedData,
                          content: e.target.value,
                        });
                      }}
                      border={"2px solid black"}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={editedData.category}
                      placeholder="Select option"
                      onChange={(e) => {
                        setEditedData({
                          ...editedData,
                          category: e.target.value,
                        });
                      }}
                      border={"2px solid black"}
                    >
                      <option value="Business">Business</option>
                      <option value="Tech">Tech</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Entertainment">Entertainment</option>
                    </Select>
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    handlesaveclick();
                  }}
                >
                  Submit
                </Button>
                <Button onClick={() => setIseditng(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {user.username==item.username?  <Button bg={"red.600"} color={"black"} onClick={() => deleteBlog()}>
            Delete
          </Button>:""}
         
        </Flex>
      </Flex>

      <Heading as="h2" fontSize="xl" mb={2}>
        {item.title}
      </Heading>
      <Text fontSize="md" color={"black"} mb={4}>
        {item.content}
      </Text>

      <Badge varient="outline" colorScheme="teal">
        Category: {item.category}
      </Badge>

      <Text color={"black"} fontSize="sm" mt={2}>
        Date: {item.date}
      </Text>

      <Flex justifyContent={"space-between"} mb={5}>
        <Flex justifyContent={"space-between"} gap={2}>
          <Heading as="h5" size={"md"} color={"red"} fontWeight="bold">
            Likes:
          </Heading>
          <Text color={"orange"} fontWeight="bold">
            {item.likes}
          </Text>
        </Flex>

        <Button
          bg={"white"}
          onClick={() => {
            handleLike();
          }}
        >
          <Icon as={FaHeart} color="red.500" fontSize="xl" />
        </Button>
      </Flex>

      <Flex mt={2} gap={5} justifyContent={"space-between"}>
        <Input
          type="text"
          placeholder="type youer comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          border={"1px solid blue"}
        />
        <Button
          bg="orange.500"
          onClick={() => {
            handleComment();
          }}
        >
          Comment
        </Button>
      </Flex>

      <Flex justifyContent={"space-between"}>
        <Box mt={4}>
          <Text fontWeight="bold" color={"green"} fontSize={"lg"} textAlign={"left"}>
            Comments:
          </Text>
          {item.comments.map((comment, index) => (
            <Flex
              border={"1px solid teal"}
              key={index}
              mt={2}
              pt={2}
              w={"100%"}
              gap={5}
              padding={2}
            >
              <Avatar name={comment.username} src="#" />
              <Text>
                <span style={{ fontWeight: "bold" }}>
                  {comment.username + " "}:{" "}
                </span>
              </Text>
              <Text>{comment.content}</Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Card;