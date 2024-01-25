import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AudioUploader = () => {
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState();
  const toast = useToast();
  const uploadAudio = (audio) => {
    setLoading(true);
    if (audio === undefined) {
      toast({
        title: "Please select audio file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (audio.type === "audio/mpeg" || audio.type === "audio/wav") {
      const data = new FormData();
      data.append("file", audio);
      data.append("upload_preset", "audio-separation");
      data.append("cloud_name", "dmzqmxi2w");
      fetch("https://api.cloudinary.com/v1_1/dmzqmxi2w/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAudio(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select audio file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    if (!audio) {
      toast({
        title: "Please upload audio file!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/audio-separation/processAudio",
        { audio },
        config
      );
      toast({
        title: "Uploaded Audio!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("audioInfo", JSON.stringify(data));
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Stack>
      <FormControl id="audio">
        <FormLabel>Upload audio file.</FormLabel>
        <Input
          type="file"
          accept="audio/*"
          onChange={(e) => uploadAudio(e.target.files[0])}
        />
      </FormControl>
      <Stack spacing="6">
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Process Audio
        </Button>
      </Stack>
    </Stack>
  );
};

export default AudioUploader;