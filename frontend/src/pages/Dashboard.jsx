import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import Card from "./Card";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [blogs, setblogs] = useState([]);
  const [filterdblogs, setFilteredblogs] = useState([]);

  const [category, setCategory] = useState("");
  //console.log(category);
  const [sortbyDate, setSortbydate] = useState("");
  //console.log(sortbyDate)
  const [searchQuerry, setSearchQuerry] = useState("");

  const authtoken = localStorage.getItem("token");
  const navigate = useNavigate();

  const [newBlogData, setNewblogdata] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleCreate = async (e) => {
    // e.preventDefault();
    try {
      const authtoken = localStorage.getItem("token");
      //console.log(token)

      const response = await axios.post(
        "https://blogs-gvrb.onrender.com/api/blogs",
        newBlogData,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            "content-type": "application/json",
          },
        }
      );
      toast({
        title: "Blog Posted successfully",
        description: "Your blog has been posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("New blog created", response.data);

      fetchBlog();
    } catch (error) {
      console.log(error.message);
    }
  };

  //========================================>

  const fetchBlog = () => {
    const authtoken = localStorage.getItem("token");
    //console.log(token)

    fetch("https://blogs-gvrb.onrender.com/api/blogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const data = res.blog.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // console.log(data);
        setblogs(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handlePostblogfunc = () => {
    handleCreate();
    onClose();
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    let filtered = [...blogs];

    if (category) {
      filtered = filtered.filter((blog) => blog.category === category);
    }

    if (sortbyDate === "asc") {
      filtered = filtered.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
    }
    if (sortbyDate === "desc") {
      filtered = filtered.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    }

    if (searchQuerry) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuerry.toLocaleLowerCase())
      );
    }

    setFilteredblogs(filtered);
  }, [category, sortbyDate, searchQuerry, blogs]);

  //console.log(blogs);

  return (
    <div>
      <Box>
        {authtoken ? (
          <Box>
            <Heading mb={6}>Welcome to Blog App</Heading>

            <Box>
              <Flex
                justifyContent={"space-evenly"}
                mr={"10%"}
                ml={"10%"}
                gap={4}
                mb={4}
              >
                <Box
                  bg={"teal"}
                  color={"white"}
                  width={200}
                  pt={2}
                  pb={2}
                  fontStyle={"bold"}
                >
                  Blogs
                </Box>

                <Box>
                  <Button onClick={onOpen} bg={"blue.400"} color={"black"}>
                    Post Blog
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Post your Blog</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Box border={"2px solid black"} padding={4}>
                          <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                              type="text"
                              value={newBlogData.title}
                              onChange={(e) => {
                                setNewblogdata({
                                  ...newBlogData,
                                  title: e.target.value,
                                });
                              }}
                              border={"2px solid black"}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Content</FormLabel>
                            <Textarea
                              value={newBlogData.content}
                              onChange={(e) => {
                                setNewblogdata({
                                  ...newBlogData,
                                  content: e.target.value,
                                });
                              }}
                              border={"2px solid black"}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select
                              value={newBlogData.category}
                              placeholder="Select option"
                              onChange={(e) => {
                                setNewblogdata({
                                  ...newBlogData,
                                  category: e.target.value,
                                });
                              }}
                              border={"2px solid black"}
                            >
                              <option value="Business">BUSINESS</option>
                              <option value="Tech">TECH</option>
                              <option value="Lifestyle">LIFESTYLE</option>
                              <option value="Entertainment">
                                ENTERTAINMENT
                              </option>
                            </Select>
                          </FormControl>
                        </Box>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={handlePostblogfunc}
                        >
                          Post Bog
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              </Flex>
              <Box
                mb={5}
                border={"3px solid teal"}
                padding={5}
                marginLeft={"20%"}
                marginRight={"20%"}
              >
                <Input
                  placeholder={"Search by Title"}
                  onChange={(e) => setSearchQuerry(e.target.value)}
                />
                <Box mt={3}>
                  <Heading
                    as={"h5"}
                    size={"md"}
                    display={"flex"}
                    alignItems={"left"}
                    mb={2}
                  >
                    Filter by Category
                  </Heading>
                  <Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value={""}>All</option>
                    <option value="Business">BUSINESS</option>
                    <option value="Tech">TECH</option>
                    <option value="Lifestyle">LIFESTYLE</option>
                    <option value="Entertainment">ENTERTAINMENT</option>
                  </Select>
                </Box>
                <Flex gap={3} mt={4} justifyContent={"space-evenly"}>
                  <Heading
                    as={"h5"}
                    size={"md"}
                    display={"flex"}
                    alignItems={"left"}
                    pt={2}
                  >
                    Sort By Date
                  </Heading>
                  <Grid
                    gap={3}
                    gridTemplateColumns={[
                      "repeat(1, 1fr)",
                      "repeat(1, 1fr)",
                      "repeat(2, 1fr)",
                    ]}
                    justifyContent={"space-evenly"}
                  >
                    <Button
                      bg={"teal.200"}
                      onClick={() => setSortbydate("asc")}
                      color={"black"}
                    >
                      Asc
                    </Button>
                    <Button
                      bg={"teal.200"}
                      onClick={() => setSortbydate("desc")}
                    >
                      Desc
                    </Button>
                  </Grid>
                </Flex>
              </Box>
              <Grid
                border={"2px solid green"}
                gridTemplateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                ]}
                alignContent={"center"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
                paddingBottom={2}
                marginLeft={2}
                marginRight={2}
              >
                {filterdblogs.map((item) => (
                  <Card key={item._id} item={item} fetchBlog={fetchBlog} />
                ))}
              </Grid>
            </Box>
          </Box>
        ) : (
          navigate("/login")
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
