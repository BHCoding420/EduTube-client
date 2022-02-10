import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Progress,
  Box,
  InputRightAddon,
  Flex,
  Wrap,
  WrapItem,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

import { getCurrentUser } from "../../services/getCurrentUser";
const Addtutorial = ({ videos, setvideos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tag, settag] = useState("");

  const [progress, setprogress] = useState(0);
  const [total, settotal] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const handleChange = (e) => {
    setuploadData({ ...uploadData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log(videos);
  }, []);

  const addtag = () => {
    const newtags = uploadData.tags.concat(tag);
    console.log(newtags);
    setuploadData({ ...uploadData, tags: newtags });
  };

  const handlePic = (e) => {
    console.log(e.target.files[0]);
    const pic = e.target.files[0];
    setthumbnail(pic);
  };
  const handlefile = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setfileAdded(file);
    setuploadData({ ...uploadData, file_type: file.type });
  };

  const handleSubmit = async () => {
    let newUploadData = uploadData;
    newUploadData.creator = getCurrentUser().id;
    console.log(thumbnail);
    console.log(fileAdded);

    if (fileAdded && thumbnail) {
      let formData = new FormData();
      formData.append("file", fileAdded);
      formData.append("upload_preset", "bucvnm5ghbjhbj");

      await axios
        .request({
          method: "post",
          url: "https://api.cloudinary.com/v1_1/dtgghkfz3/upload",
          data: formData,
          onUploadProgress: (p) => {
            console.log(p);
            setprogress(p.loaded);
            let my_total = p.total;
            settotal(my_total);
            let my_per = (p.loaded / my_total) * 100;
          },
        })
        .then((data) => {
          console.log({ data });
          //setuploadData({ ...uploadData, file: data.secure_url });
          newUploadData.file = data.data.secure_url;
        });

      formData = new FormData();
      formData.append("file", thumbnail);
      formData.append("upload_preset", "bucvnm5ghbjhbj");

      await axios
        .request({
          method: "post",
          url: "https://api.cloudinary.com/v1_1/dtgghkfz3/upload",
          data: formData,
        })
        .then((data) => {
          console.log({ data });
          //setuploadData({ ...uploadData, thumbnail: data.secure_url });
          newUploadData.thumbnail = data.data.secure_url;
        });
    }

    console.log(newUploadData);
    await axios
      .post("http://localhost:5000/tutorials", newUploadData)
      .then((response) => {
        console.log(response);
        newUploadData._id = response.data._id;
      })
      .catch((error) => {
        console.log(error);
      });
    onClose();
  };
  const [fileAdded, setfileAdded] = useState(null);
  const [thumbnail, setthumbnail] = useState(null);
  const [uploadData, setuploadData] = useState({
    _id: "",
    title: "",
    creator: "",
    description: "",
    tags: [],
    file: "",
    file_type: "",
    thumbnail: "",
  });
  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail]);
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="ghost">
        <i class="far fa-plus-square"></i>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Intructional video/pdf</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                name="title"
                value={uploadData.title}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>description</FormLabel>
              <Input
                placeholder="description"
                name="description"
                value={uploadData.description}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>tags</FormLabel>
              <Input
                placeholder="description"
                name="description"
                onChange={(e) => {
                  settag(e.target.value);
                  console.log(tag);
                }}
              />

              <Button onClick={addtag}>+</Button>
            </FormControl>
            <Wrap w="100%" templateColumns="repeat(3, 1fr)" gap={1}>
              {uploadData.tags.map((tag) => {
                return (
                  <WrapItem
                    style={{ textAlign: "center" }}
                    borderRadius="20px"
                    m={2}
                    p={2}
                  >
                    <Tag
                      size="md"
                      key="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="blue"
                      value={tag}
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton
                        onClick={(e) => {
                          setuploadData({
                            ...uploadData,
                            tags: uploadData.tags.filter((t) => t !== tag),
                          });
                          console.log(uploadData.tags.filter((t) => t !== tag));
                        }}
                      />
                    </Tag>
                  </WrapItem>
                );
              })}
            </Wrap>

            <FormControl isRequired>
              <FormLabel>File(Video/PDF)</FormLabel>
              <input type="file" name="file" onChange={handlefile} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>thumbnail</FormLabel>
              <input type="file" name="thumbnail" onChange={handlePic} />
            </FormControl>
            <p>
              {progress} bytes of {total} uploaded
            </p>
            <Progress hasStripe value={(progress / total) * 100} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addtutorial;
