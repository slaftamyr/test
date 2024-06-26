import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [showQuestionOptions, setShowQuestionOptions] = useState(false);
  const [theTest, setTheTest] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState({ answer: "", status: false });
  const showStoredTest = JSON.parse(localStorage.getItem("theTest")) || [];

  useEffect(() => {
    setShowQuestionOptions(true);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    const updatedTest = [...theTest, { question, options }];
    setTheTest(updatedTest);
    localStorage.setItem("theTest", JSON.stringify(updatedTest));

    setShowQuestionOptions(true);
    setQuestion("");
    setOptions([]);
    setNewOption({ answer: "", status: false });
  };

  const handleCheckboxChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].status = event.target.checked;
    setOptions(updatedOptions);
  };

  const showOptions = options.map((option, index) => (
    <FormControlLabel
      key={index}
      control={
        <Checkbox
          checked={option.status}
          onChange={(event) => handleCheckboxChange(event, index)}
        />
      }
      label={option.answer}
    />
  ));

  const addChoiceToOptions = () => {
    setOptions([...options, newOption]);
    setNewOption({ answer: "", status: false });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the question
          </Typography>

          <TextField
            id="filled-multiline-flexible"
            label="Question"
            multiline
            maxRows={4}
            variant="filled"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <TextField
            value={newOption.answer}
            onChange={(event) =>
              setNewOption({ ...newOption, answer: event.target.value })
            }
            id="outlined-basic"
            label="Option"
            variant="outlined"
          />

          <Button onClick={addChoiceToOptions}>Add</Button>
          <div>{showOptions}</div>
          <hr />
          <Button onClick={handleClose}>OK</Button>
        </Box>
      </Modal>

      {showQuestionOptions && (
        <div>
          {showStoredTest.map((q, index) => (
            <div key={index}>
              <h2>{q.question}</h2>
              {q.options.map((option, i) => (
                <div key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={option.status}
                      onChange={(event) => handleCheckboxChange(event, i)}
                    />
                    {option.answer}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
