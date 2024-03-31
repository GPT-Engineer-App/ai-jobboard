import { useState, useEffect } from "react";
import { Box, Heading, Text, Button, Grid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Image, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "https://kvdb.io/BLbtbuWvN1B5uCxdV8Nzk6/hello";

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch(`${API_URL}?limit=1000`, {
      headers: {
        Authorization: "Basic " + btoa("legal:"),
      },
    });
    const data = await res.json();
    const jobPromises = data.map((key) => fetch(`${API_URL}${key}`));
    const jobResponses = await Promise.all(jobPromises);
    const jobs = await Promise.all(jobResponses.map((res) => res.json()));
    setJobs(jobs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const job = { title, description, url };
    if (editingJob) {
      await fetch(`${API_URL}${editingJob}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      setEditingJob(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
    }
    setTitle("");
    setDescription("");
    setUrl("");
    onClose();
    fetchJobs();
    toast({
      title: editingJob ? "Job Updated" : "Job Created",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = (job) => {
    setEditingJob(job.key);
    setTitle(job.title);
    setDescription(job.description);
    setUrl(job.url);
    onOpen();
  };

  const handleDelete = async (key) => {
    await fetch(`${API_URL}${key}`, { method: "DELETE" });
    fetchJobs();
    toast({
      title: "Job Deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        AGI Jobs
      </Heading>
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
        Add Job
      </Button>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} mt={8}>
        {jobs.map((job) => (
          <Box key={job.key} borderWidth={1} borderRadius="lg" p={4}>
            <Heading as="h2" size="md" mb={2}>
              {job.title}
            </Heading>
            <Text mb={4}>{job.description}</Text>
            <Button as="a" href={job.url} target="_blank" colorScheme="blue" size="sm" mr={2}>
              Apply
            </Button>
            <Button leftIcon={<FaEdit />} size="sm" mr={2} onClick={() => handleEdit(job)}>
              Edit
            </Button>
            <Button leftIcon={<FaTrash />} size="sm" colorScheme="red" onClick={() => handleDelete(job.key)}>
              Delete
            </Button>
          </Box>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingJob ? "Edit Job" : "Add Job"}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Image src={`https://source.unsplash.com/random/?portrait%20professional`} alt="Job" mb={4} />
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>URL</FormLabel>
                <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="teal" mr={3}>
                {editingJob ? "Update" : "Create"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
