import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Create,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    useCreate,
    useNotify,
    FormDataConsumer,
} from "react-admin";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import {RichTextInput} from "ra-input-rich-text";
import {Modal, Table} from "react-bootstrap";
import RichTextToolbar from "../toolbars/RichTextToolbar";
import CreateAnswer from "./CreateAnswer";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateQuestion = (props) => {
    const selectedLesson = props.data;
    const setQuestion = props.func;
    const [showDialog, setShowDialog] = useState(false);
    const [create, {loading}] = useCreate();
    const notify = useNotify();

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handleSubmit = useCallback(async (values) => {
        const questionEmpty = {
            ...values,
        };

        if (setQuestion !== undefined) {
            setQuestion(questionEmpty);
            handleCloseClick();
            return null;
        }

        create(
            'lessons/questions',
            {
                data: {
                    ...questionEmpty,
                    lesson: selectedLesson,
                },
            },
            {
                onSuccess: (data) => {
                    handleCloseClick();
                },
                onFailure: ({error}) => {
                    notify(error.message, 'error');
                },
            },
        );
    });

    return (
        <>
            <Button
                variant="raised"
                label="Add question"
                onClick={handleClick}
            >
                <AddIcon/>
            </Button>
            <Modal show={showDialog} onHide={handleCloseClick}
                   size="lg" fullscreen="lg-down">
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Create>
                        <SimpleForm onSubmit={handleSubmit}>
                            <RichTextInput
                                source="body"
                                toolbar={<RichTextToolbar/>}
                                validate={required()}/>
                            <ReferenceInput source="question_type"
                                            label="question_type"
                                            reference="lessons/questions/types">
                                <SelectInput optionText="label"
                                             optionValue="id"
                                             validate={required()}/>
                            </ReferenceInput>
                        </SimpleForm>
                    </Create>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateQuestion;