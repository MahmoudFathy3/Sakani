import styles from "@styles/forms.module.css";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import FormControlls from "@components/Housing-system/FormControlls/FormControlls";
import FormButtons from "@components/Housing-system/FormButtons/FormButtons";
import { onReset } from "@utils/onReset";
import { useState } from "react";
import Complexe from "@components/Housing-system/Select/Shared/Complexe/Complexe";

const FormImages = ({ onSubmit, reset, data, edit, isLoading, closeEdit }) => {
  const [ManagementId, setManagementId] = useState("");

  const handlerSubmitted = (event) => {
    event.preventDefault();
    let Image = {
      Title: event.target.title.value,
      ManagementId: ManagementId || data.managementId,
      Description: event.target.description.value,
    };

    if (event.target.ImageUrl.files[0]?.name)
      Image.ImageUrl = event.target.ImageUrl.files[0];

    if (edit) Image.id = data.sliderImage.id;
    if (edit) Image.order = data.sliderImage.order;

    onSubmit(Image);
    onReset(event.currentTarget.reset());
  };

  return (
    <Box component={"form"} onSubmit={handlerSubmitted} className={styles.form}>
      <div className={styles.form_wapper}>
        <FormControlls
          id="title"
          label="الاسم"
          type="text"
          fullWidth
          required={true}
          defaultValue={data?.sliderImage?.title}
        />

        <Complexe
          id="ManagementId"
          label="اسم المجمع"
          setState={setManagementId}
          defaultValue={data?.managementId}
        />

        <FormControlls
          id="description"
          label="الوصف"
          type="text"
          fullWidth
          required={true}
          defaultValue={data?.sliderImage?.description}
        />

        <FormControlls
          id="ImageUrl"
          label="صورة"
          type="file"
          fullWidth
          required={edit ? false : true}
        />
      </div>
      <FormButtons
        onReset={reset ? onReset : () => closeEdit()}
        edit={edit}
        isLoading={isLoading}
      />
    </Box>
  );
};

FormImages.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.bool,
  data: PropTypes.object,
  edit: PropTypes.bool,
  isLoading: PropTypes.bool,
  closeEdit: PropTypes.func,
};

export default FormImages;
