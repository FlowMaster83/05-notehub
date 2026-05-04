import { Formik, Form, Field, ErrorMessage } from 'formik'
import type { FormikHelpers } from 'formik'
import * as Yup from 'yup'
import css from './NoteForm.module.css'

interface NoteFormProps {
    onClose: () => void
}

interface NoteFormValues {
    title: string,
    content: string,
    tag: string,
}

const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
}

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title too short')
        .max(50, 'Title too long')
        .required('Title is required'),
    content: Yup.string()
        .max(500, 'Not more than 500 characters'),
    tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
        .required('Tag should be one of the following values')
})

export default function NoteForm({ onClose }: NoteFormProps) {

    const handleSubmit = (
        values: NoteFormValues,
        actions: FormikHelpers<NoteFormValues>
    ) => {
        console.log(values);
        actions.resetForm();
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>

            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name='title' component='span' className={css.error} data-name="title" />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field as='textarea'
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage name='content' component='span' className={css.error} data-name="content" />

                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as='select' id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name='tag' component='span' className={css.error} data-name="tag" />
                </div>

                <div className={css.actions}>
                    <button onClick={onClose} type="button" className={css.cancelButton}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false} // temp
                    >
                        Create note
                    </button>
                </div>
            </Form>

        </Formik>
    )
};
