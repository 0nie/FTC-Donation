import React from "react";

import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  setError,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import ModalWrapperSide from "../../../partials/modal/ModalWrapperSide";
import { InputText, InputTextArea } from "../../../custom-hooks/FormInputs";
import { queryData } from "../../../helper/queryData";
import { StoreContext } from "../../../../../store/StoreContext";

const ModalAddSettingsWork = ({ itemEdit, setIsModal }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [animate, setAnimate] = React.useState("translate-x-full");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/rest/v1/controllers/developer/work/Work.php?workid=${itemEdit.work_aid}`
          : `/rest/v1/controllers/developer/work/Work.php`,
        itemEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["work-list"] });

      if (!data.success) {
        dispatch(setMessage(data.error));
        dispatch(setError(true));
      } else {
        setIsModal(false);
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}.`));
        dispatch(setSuccess(true));
      }
    },
  });

  const initVal = {
    work_title: itemEdit ? itemEdit.work_title : "",
    work_description: itemEdit ? itemEdit.work_description : "",
    work_title_old: itemEdit ? itemEdit.work_title : "",
  };
  const yupSchema = Yup.object({
    work_title: Yup.string().required("required"),
    work_description: Yup.string().required("required"),
  });

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      setIsModal(false); // CLOSE MODAL
    }, 200);
  };

  React.useEffect(() => {
    setAnimate();
  }, []);

  return (
    <>
      <ModalWrapperSide handleClose={handleClose} className={`${animate}`}>
        <div className="modal__header">
          <h3>{itemEdit ? "Update" : "Add"} Work</h3>
          <button
            type="button"
            className="absolute top-0 right-0"
            onClick={handleClose}
          >
            <FaTimesCircle className="text-lg" />
          </button>
        </div>

        <div className="modal__body">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="forms_wrapper">
                    <div className="forms">
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="Title"
                          type="text"
                          name="work_title"
                          disabled={false}
                        />
                      </div>

                      <div className="relative mt-3 mb-5">
                        <InputTextArea
                          label="Description"
                          type="text"
                          name="work_description"
                          disabled={false}
                        />
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        type="submit"
                        className="btn-modal-submit"
                        disabled={!props.dirty}
                      >
                        {itemEdit ? "Save" : "Add"}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapperSide>
    </>
  );
};

export default ModalAddSettingsWork;
