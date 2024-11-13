import FormComplaints from "@components/forms/Complaints/FormComplaints";
import PathName from "@components/Housing-system/PathName/PathName";
import {
  fetchComplaints,
  updateComplaint,
} from "@store/reducers/Complaints/ComplaintsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const ComplaintEdit = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useOutletContext();

  const { isLoading } = useSelector((state) => state.complaints);

  const onSubmit = (data) => {
    dispatch(updateComplaint(data))
      .unwrap()
      .then(() => {
        dispatch(
          fetchComplaints({ managementId: state.managementId, page: 0 })
        );
        navigate(`/complaints/list`, {
          state: {
            managementId: state.managementId,
            message: "تم تعديل الشكوي بنجاح",
          },
        });
      });
  };

  return (
    <section>
      <Helmet>
        <title>{`${context} | Edit Complaint`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="تعديل" name="الشكاوي / " />

        <FormComplaints
          onSubmit={onSubmit}
          complaint={state}
          edit={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default ComplaintEdit;
