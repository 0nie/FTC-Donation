import React from "react";
import ModalWrapperSide from "../../../../partials/modal/ModalWrapperSide";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "../../../../custom-hooks/FormInputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../helper/queryData";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  setError,
  setMessage,
  setSuccess,
} from "../../../../../../store/StoreAction";

const ModalAddSettingsCategory = ({ itemEdit, setIsModal }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/rest/v1/controllers/developer/settings/category/category.php?categoryid=${itemEdit.category_aid}`
          : `/rest/v1/controllers/developer/settings/category/category.php`,
        itemEdit ? "put" : "post",
        values
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ query: ["category"] });

      if (!data.success) {
        console.log("error");
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        setIsModal(false);
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}.`));
        console.log("save");
      }
    },
  });
  const initVal = {
    category_name: itemEdit ? itemEdit.category_name : "",
    category_description: itemEdit ? itemEdit.category_description : "",
  };
  const yupSchema = Yup.object({
    category_name: Yup.string().required("required"),
    category_description: Yup.string().required("required"),
  });

  const handleClose = () => {
    setAnimate("translate-x-full");
    setTimeout(() => {
      setIsModal(false);
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);
  return (
    <>
      <ModalWrapperSide handleClose={handleClose} className={`${animate}`}>
        <div className="modal__header">
          <h3>{itemEdit ? "Update" : "Add"} Category</h3>
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
              console.log(values);
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
                          label="Name"
                          type="text"
                          name="category_name"
                          disable="false"
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputTextArea
                          label="Description"
                          type="text"
                          name="category_description"
                          disable="false"
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

export default ModalAddSettingsCategory;
