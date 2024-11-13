import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box, FormControl, FormLabel } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import Status from "@components/Housing-system/Select/Shared/Status/Status";
import { useState } from "react";

const FormComplaints = ({ onSubmit, complaint, reset, edit, isLoading }) => {
  const [userName, setUserName] = useState(complaint?.item?.userName || "");
  const [statusId, setStatusId] = useState();

  const handlerSubmitted = (e) => {
    e.preventDefault();

    let complaints = {};

    if (statusId >= 0) {
      complaints.status = statusId;
    } else {
      complaints.status = complaint.item.status >= 0 && complaint.item.status;
    }

    if (edit) complaints.id = complaint.item.id;

    onSubmit(complaints);
    onReset(e.currentTarget.reset());
  };

  return (
    <Box component={"form"} onSubmit={handlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <FormControlls
          id="fileName"
          label="اسم المستخدم"
          type="text"
          fullWidth
          required={edit ? false : true}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={edit}
        />
        <FormControlls
          id="subject"
          label="عنوان الشياكة"
          type="text"
          fullWidth
          required={edit ? false : true}
          defaultValue={complaint?.item?.subject}
          disabled={edit}
        />
        <Status
          id="status"
          label="حالة الشكاوي"
          defaultValue={complaint?.item?.status}
          required={true}
          setStatusID={setStatusId}
        />
      </div>
      <div className={styles.Complaints}>
        <FormControlls
          id="file"
          label="الصورة"
          type="file"
          fullWidth
          required={edit ? false : true}
          disabled={edit}
        />
        <FormControl sx={{ gap: 1, width: "100%" }}>
          <FormLabel htmlFor="message">
            الشكوي {!edit && <span style={{ color: "red" }}>*</span>}
          </FormLabel>
          <textarea
            id="message"
            name="message"
            required={edit ? false : true}
            defaultValue={complaint?.item?.message}
            disabled={edit}
          ></textarea>
        </FormControl>
      </div>
      <FormButtons
        onReset={reset && onReset}
        edit={edit}
        isLoading={isLoading}
      />
    </Box>
  );
};

FormComplaints.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  complaint: PropTypes.object,
  reset: PropTypes.bool,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default FormComplaints;
