const [formData, setFormData] = useState({
  username: "",
  codeLanguage: "",
  stdin: "",
  sourceCode: "",
});
const [codeSnippets, setCodeSnippets] = useState([]);

useEffect(() => {
  fetchCodeSnippets();
}, []);

const fetchCodeSnippets = async () => {
  try {
    const res = await axios.get("/api/code-snippets");
    setCodeSnippets(res.data);
    console.log(res?.data);
  } catch (error) {
    console.error("Error fetching code snippets:", error);
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("/api/users/create/", formData);
    setFormData({
      username: "",
      codeLanguage: "",
      stdin: "",
      sourceCode: "",
    });
    fetchCodeSnippets();
  } catch (error) {
    console.error("Error submitting code snippet:", error);
  }
};

const handleUpdate = async (id) => {
  // Implement update functionality
  console.log("Update code snippet with id:", id);
};

const handleDelete = async (id) => {
  // Implement delete functionality
  console.log("Delete code snippet with id:", id);
};
