import FormImages from "@components/forms/Images/FormImages";
import PathName from "@components/Housing-system/PathName/PathName";
import { CheckRoles } from "@utils/CheckRoles";
import { Helmet } from "react-helmet";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import styles from "@styles/SliderImages.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSlider,
  fetchImages,
  updateImage,
} from "@store/reducers/Image/ImageSlice";

const ImageEdit = () => {
  const [slider_images, setSliderImages] = useState([]);
  const [slider_edit, setSliderEdit] = useState("");
  const [slider_delete, setSliderDelete] = useState("");

  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  useEffect(() => {
    if (state) {
      setSliderImages(state.imageInSliders);
    }
  }, [state]);

  const handlerFilterSliderImages = (id) => {
    setSliderDelete(slider_images?.find((slider) => slider.id === id));
    setSliderImages(slider_images?.filter((slider) => slider.id !== id));
  };

  const onSubmit = (data) => {
    dispatch(updateImage(data))
      .unwrap()
      .then(() => {
        navigate("/images/list");
        dispatch(fetchImages(0));
      });
  };

  const onSave = () => {
    dispatch(
      deleteSlider({
        order: slider_delete.order,
        managementId: state.managementId,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/images/list");
        dispatch(fetchImages(0));
      });
  };

  if (!CheckRoles("ManagementOwner")) {
    return <Navigate to={"*"} replace />;
  }

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Images`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الصور / " />

        {/* Slider Images */}

        {!slider_edit && (
          <div className={styles.SliderImages}>
            {slider_images?.map((slider, index) => (
              <div key={index} className={styles.SliderImages_info}>
                <img
                  src={`${import.meta.env.VITE_WEBSITE_API_URL_image}/${
                    slider.imageUrl
                  }`}
                  alt={slider.name}
                  loading="lazy"
                />

                <div className={styles.slider_wapper}>
                  <h3>{slider.title}</h3>
                  <p>{slider.description}</p>
                </div>

                <div className={styles.slider_buttons}>
                  <button onClick={() => handlerFilterSliderImages(slider.id)}>
                    حذف
                  </button>
                  <button onClick={() => setSliderEdit(slider)}>تعديل</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {state.imageInSliders?.length > 0 &&
          !slider_edit &&
          slider_images?.length !== state.imageInSliders?.length && (
            <div className={styles.Save}>
              <button onClick={onSave}>Save</button>
            </div>
          )}

        {/*  End Slider Images */}

        {slider_edit && (
          <FormImages
            onSubmit={onSubmit}
            data={{
              managementId: state.managementId,
              sliderImage: slider_edit,
            }}
            edit={true}
            closeEdit={() => setSliderEdit("")}
          />
        )}
      </div>
    </section>
  );
};

export default ImageEdit;
