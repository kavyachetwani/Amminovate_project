import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "./api";
import { GoogleGenerativeAI } from "@google/generative-ai";

//AIzaSyDbHnSQBBeZEy6o68g64TCHWnfUOdydvUE

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const API_KEY = "AIzaSyDbHnSQBBeZEy6o68g64TCHWnfUOdydvUE";
  const genAI = new GoogleGenerativeAI(API_KEY);
  async function improveWithAI() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const sourceCode = editorRef.current.getValue();
    const prompt = "Improve this code and add comments: \n" + sourceCode;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace("```" + `${language}`, "").replace(/```/, "");
    editorRef.current.setValue(text);
    // console.log(text);
  }

  return (
    <Box w="50%" className="cursor-default">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        // colorScheme="green"
        mb={4}
        bg="#0dab95"
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        variant="outline"
        // colorScheme="green"
        mb={4}
        bg="#0dab95"
        isLoading={isLoading}
        onClick={improveWithAI}
      >
        Improve
      </Button>
      <Box
        height="50vh"
        p={2}
        bg="white"
        color={isError ? "red.400" : "gray"}
        // border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
