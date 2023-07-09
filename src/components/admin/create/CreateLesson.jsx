import React, {useCallback, useEffect, useState} from 'react';
import {
    Datagrid,
    Create,
    FormDataConsumer,
    Pagination,
    ReferenceField,
    ReferenceInput,
    ReferenceManyField,
    required,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    useEditController,
    useCreate,
    useNotify,
    useRefresh,
    useRedirect,
    Button, SimpleForm, NumberInput,
} from "react-admin";
import {RichTextInput} from "ra-input-rich-text";
import RichTextToolbar from "../toolbars/RichTextToolbar";
import CreateQuestion from "./CreateQuestion";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import {Modal, Table} from "react-bootstrap";
import {Interweave} from "interweave";
import AddIcon from "@mui/icons-material/Add";

const CreateLesson = (props) => {
    const selectedCourseId = props.data;
    const [create, {loading}] = useCreate();
    const notify = useNotify();
    const [showDialog, setShowDialog] = useState(false);

    const handleClick = () => {
        setShowDialog(true);
    }

    const handleCloseClick = () => {
        setShowDialog(false);
    }

    const handleSubmit = useCallback(async (values) => {
        const lessonEmpty = {
            ...values,
        }

        if (lessonEmpty.body === "" && lessonEmpty.body !== undefined) {
            delete lessonEmpty.body;
        }

        create(
            'lessons',
            {
                data: {
                    ...lessonEmpty,
                    course: selectedCourseId,
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
                label="Add lesson"
                onClick={handleClick}
            >
                <AddIcon/>
            </Button>
            <Modal show={showDialog} onHide={handleCloseClick}
                   size="lg" fullscreen="lg-down">
                <Modal.Header closeButton>
                    <Modal.Title>Add Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Create>
                        <SimpleForm onSubmit={handleSubmit}>
                            <ReferenceInput
                                source="lesson_type"
                                label="lesson_type"
                                reference="lessons/types">
                                <SelectInput optionText="label"
                                             optionValue="id"
                                             validate={required()}/>
                            </ReferenceInput>
                            <FormDataConsumer>
                                {
                                    ({formData, ...rest}) =>
                                        formData.lesson_type > 1 &&
                                        <ReferenceInput source="parent"
                                                        label="parent_lesson"
                                                        reference="lessons"
                                                        filter={{
                                                            parent_only: 1,
                                                            course_id: selectedCourseId,
                                                        }}>
                                            <SelectInput optionText="title"
                                                         optionValue="id"
                                                         validate={required()}/>
                                        </ReferenceInput>
                                }
                            </FormDataConsumer>
                            <NumberInput source="serial_number" min={1} step={1}/>
                            <TextInput source="title" fullWidth/>
                            <TextInput source="description" fullWidth
                                       multiline
                                       rows={3}/>
                            <FormDataConsumer>
                                {({formData, ...rest}) =>
                                    <>
                                        {
                                            formData.lesson_type === 2 &&
                                            <RichTextInput
                                                source="body"
                                                toolbar={
                                                    <RichTextToolbar/>}
                                                validate={required()}
                                                {...rest}/>
                                        }
                                    </>
                                }
                            </FormDataConsumer>
                        </SimpleForm>
                    </Create>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateLesson;