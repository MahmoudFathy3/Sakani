import styles from "@styles/Page.module.css";
import PathName from "@components/Housing-system/PathName/PathName";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";

const DetailsInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const context = useOutletContext();

  return (
    <section>
      <Helmet>
        <title>{`${context} | Details Invoices`}</title>
      </Helmet>

      <div className="section_content">
        <PathName path="عرض" name="الفاتورة / " />

        <div className={styles.details_content}>
          <div className={styles.details_wapper}>
            <div className={styles.details_info}>
              <h3> عنوان الفاتورة :</h3>
              <span>{state.invoiceTitle}</span>
            </div>
            <div className={styles.details_info}>
              <h3>اسم المجمع :</h3>
              <span>{state.managementName}</span>
            </div>
            <div className={styles.details_info}>
              <h3>اسم الوحدة :</h3>
              <span>{state.unitId}</span>
            </div>
            <div className={styles.details_info}>
              <h3> وصف الفاتورة :</h3>
              <span>{state.invoiceDescription}</span>
            </div>
            <div className={styles.details_info}>
              <h3> نوع الفاتورة :</h3>
              <span>
                {state.invoiceType === 0 && "لشهر واحد"}
                {state.invoiceType === 1 && "تكرار لكل شهر"}
              </span>
            </div>
            <div className={styles.details_info}>
              <h3> تاريخ الفاتورة :</h3>
              <span>{state.invoiceData}</span>
            </div>
            <div className={styles.details_info}>
              <h3> حالة الفاتورة :</h3>
              <span>{state.isPaid ? "مدفوعة" : "غير مدفوعة"}</span>
            </div>
            <div className={styles.details_info}>
              <h3> سعر الفاتورة :</h3>
              <span>{state.totalPrice}</span>
            </div>
          </div>

          <button
            onClick={() =>
              navigate("/invoices/list", {
                state: {
                  managementId: state.managementId,
                },
              })
            }
          >
            عودة
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailsInvoice;
