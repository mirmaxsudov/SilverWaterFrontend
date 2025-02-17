import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplications,
  searchApplications,
  sortApplications,
  filterApplicationsByStatus,
  resetFilters,
  confirmApplication,
} from "../../../features/application/applicationsSlice.js";
import { dateFormater } from "../../../helper/dateFormater.js";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { notifySuccess } from "../../../helper/toast.js";
import ApplicationSkeleton from "./ApplicationSkeleton.jsx";

const Applications = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    data,
    filteredData,
    loading,
    error,
    searchQuery,
    order,
    filterStatus,
  } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  if (loading)
    return (
      <>
        <ApplicationSkeleton />
      </>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 container mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">{t("applications.title")}</h1>
        <p className="text-2xl font-semibold underline underline-offset-4">
          {data?.length}
        </p>
      </div>

      {/* Search Input */}
      <div className={"flex items-center mb-5 gap-4"}>
        <input
          type="text"
          placeholder={t("applications.search")}
          value={searchQuery}
          onChange={(e) => dispatch(searchApplications(e.target.value))}
          className="border p-2 w-full rounded-lg px-4"
        />
        <button className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 whitespace-nowrap hover:bg-green-600 hover:text-white transition-all duration-300">
          <Link
            onClick={() => notifySuccess(t("applications.info"))}
            className={"n"}
            download
            to="http://localhost:8080/api/v1/application/download-all"
          >
            {t("applications.download")}
          </Link>
        </button>
      </div>

      {/* Filter Panel */}
      <div className="border rounded-2xl py-5 px-5 mb-7 shadow">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {/* Filter Icon and Label */}
          <div className="flex items-center gap-2">
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>{t("applications.filter")}</p>
          </div>

          {/* Order Select */}
          <label className="flex items-center gap-2">
            <p>{t("applications.order")}</p>
            <select
              name="order"
              value={order}
              onChange={(e) => dispatch(sortApplications(e.target.value))}
              className="border p-2 rounded"
            >
              <option value="asc">{t("applications.asc")}</option>
              <option value="desc">{t("applications.desc")}</option>
            </select>
          </label>

          {/* Status Filter Select */}
          <label className="flex items-center gap-2">
            <p>{t("applications.filterStatus")}</p>
            <select
              name="status"
              value={filterStatus}
              onChange={(e) =>
                dispatch(filterApplicationsByStatus(e.target.value))
              }
              className="border p-2 rounded"
            >
              <option value="all">{t("applications.all")}</option>
              <option value="false">{t("applications.notAnswered")}</option>
              <option value="true">{t("applications.answered")}</option>
            </select>
          </label>

          {/* Reset Button */}
          <button
            onClick={() => dispatch(resetFilters())}
            className="flex items-center gap-2 bg-red-300 rounded-lg p-2 text-[#EA0234] shadow shadow-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
          >
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3.75V0.75L2.25 4.5L6 8.25V5.25C8.4825 5.25 10.5 7.2675 10.5 9.75C10.5 12.2325 8.4825 14.25 6 14.25C3.5175 14.25 1.5 12.2325 1.5 9.75H0C0 13.065 2.685 15.75 6 15.75C9.315 15.75 12 13.065 12 9.75C12 6.435 9.315 3.75 6 3.75Z"
                fill="#EA0234"
              />
            </svg>
            <p>{t("applications.reset")}</p>
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <table className="border-collapse w-full border">
        <thead>
          <tr>
            <th className="border p-2">{t("applications.id")}</th>
            <th className="border p-2">{t("applications.fullName")}</th>
            <th className="border p-2">{t("applications.phoneNumber")}</th>
            <th className="border p-2">{t("applications.sentTime")}</th>
            <th className="border p-2">{t("applications.action")}</th>
            <th className="border p-2">{t("applications.status")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((app) => (
            <tr key={app.id}>
              <td className="border p-2 text-center">{app.id}</td>
              <td className="border p-2 text-center">{app.fullName}</td>
              <td className="border p-2 text-center">{app.phoneNumber}</td>
              <td className="border p-2 text-center">
                {dateFormater(app.whenAdded)}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(confirmApplication(app.id));
                  }}
                  className="text-[#FFA756] bg-[#FFEDDD] p-2 w-full rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:text-[#000]"
                  disabled={app.answered}
                >
                  {!app.answered
                    ? t("applications.confirm")
                    : t("applications.confirmed")}
                </button>
              </td>
              <td className="border p-2">
                <ApplicationStatus status={app.answered} t={t} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ApplicationStatus = ({ status, t }) => {
  if (!status)
    return (
      <p className="bg-[#E0D4FC] text-[#6226EF] text-center p-2 rounded-lg">
        {t("applications.notAnswered")}
      </p>
    );
  return (
    <p className="bg-[#CCF0EB] text-[#06B89D] text-center p-2 rounded-lg">
      {t("applications.answered")}
    </p>
  );
};

ApplicationStatus.propTypes = {
  status: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default Applications;
