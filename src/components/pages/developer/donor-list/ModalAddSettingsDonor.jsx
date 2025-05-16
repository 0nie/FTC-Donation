import React from "react";

import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { Form, Formik } from "formik";
// import { InputText, InputTextArea } from "../../../../custom-hooks/FormInputs";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { queryData } from "../../../../helper/queryData";
// import { StoreContext } from "../../../../../../store/StoreContext";

// import {
//   setError,
//   setMessage,
//   setSuccess,
// } from "../../../../../../store/StoreAction";

import ModalWrapperSide from "../../../partials/modal/ModalWrapperSide";
import { InputText, InputTextArea } from "../../../custom-hooks/FormInputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../helper/queryData";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  setError,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";

const ModalAddSettingsDonor = ({ itemEdit, setIsModal }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [animate, setAnimate] = React.useState("translate-x-full");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/rest/v1/controllers/developer/donor-list/donor.php?donorid=${itemEdit.donor_list_aid}`
          : `/rest/v1/controllers/developer/donor-list/donor.php`,
        itemEdit ? "put" : "post",
        values
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ query: ["donor-list"] });

      if (!data.success) {
        console.log("error");
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}.`));
        dispatch(setSuccess(true));
        setIsModal(false);
        console.log("save");
      }
    },
  });
  const initVal = {
    donor_list_first_name: itemEdit ? itemEdit.donor_list_first_name : "",
    donor_list_last_name: itemEdit ? itemEdit.donor_list_last_name : "",
    donor_list_email: itemEdit ? itemEdit.donor_list_email : "",
    donor_list_contact_number: itemEdit
      ? itemEdit.donor_list_contact_number
      : "",
    donor_list_address: itemEdit ? itemEdit.donor_list_address : "",
    donor_list_city: itemEdit ? itemEdit.donor_list_city : "",
    donor_list_state_province: itemEdit
      ? itemEdit.donor_list_state_province
      : "",

    donor_list_zip: itemEdit ? itemEdit.donor_list_zip : "",

    donor_list_first_name_old: itemEdit
      ? itemEdit.donor_list_first_name_old
      : "",
    donor_list_country: itemEdit ? itemEdit.donor_list_country : "",
  };
  const yupSchema = Yup.object({
    donor_list_first_name: Yup.string().required("required"),
    donor_list_last_name: Yup.string().required("required"),
    donor_list_email: Yup.string().required("required"),
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
          <h3>{itemEdit ? "Update" : "Add"} Donor</h3>
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
                          label="Last Name"
                          type="text"
                          name="donor_list_last_name"
                          disabled={false}
                        />
                      </div>

                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="First Name"
                          type="text"
                          name="donor_list_first_name"
                          disabled={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="Email "
                          type="email"
                          name="donor_list_email"
                          disabled={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="Contact Number "
                          type="text"
                          name="donor_list_contact_number"
                          disabled={false}
                          required={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputTextArea
                          label="Address"
                          type="text"
                          name="donor_list_address"
                          disabled={false}
                          required={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="City"
                          type="text"
                          name="donor_list_city"
                          disabled={false}
                          required={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="State/Province"
                          type="text"
                          name="donor_list_state_province"
                          disabled={false}
                          required={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="Country"
                          type="text"
                          name="donor_list_country"
                          disabled={false}
                          required={false}
                        />
                      </div>
                      <div className="relative mt-3 mb-5">
                        <InputText
                          label="Zip"
                          type="text"
                          name="donor_list_zip"
                          disabled={false}
                          required={false}
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

export default ModalAddSettingsDonor;
