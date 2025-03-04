import { MdInsertEmoticon } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../features/language/languageSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { $api } from "../../api/request.jsx";
import Cookies from 'js-cookie';

const Profile = () => {
  const profileData = useLoaderData();
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(state => state.language.language);

  useEffect(() => {
    if (!profileData || profileData.error) setError(t("profile.error"));
  }, [profileData, t]);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    navigate("/login");
  };

  return (
    <section className="profile-section">
      <div className="container mx-auto">
        <div className="top flex items-center justify-between">
          <h1 className="font-bold text-3xl">{t("profile.title")}</h1>
          <div className="flex items-center gap-[20px]">
            <select
              onChange={(e) => {
                e.preventDefault();
                dispatch(changeLanguage(e.target.value));
              }}
              value={language}
              name="language"
              className="bg-white text-black font-semibold py-2 rounded px-4 border"
            >
              <option value="uz">Uz</option>
              <option value="ru">Ru</option>
              <option value="en">En</option>
            </select>
            <button
              onClick={handleLogout}
              className="bg-red-300 text-red-700 font-semibold py-2 rounded px-4 hover:bg-red-600 transition-all duration-300 hover:text-[#fff]"
            >
              {t("profile.logout")}
            </button>
          </div>
        </div>

        <div className="mt-10 middle border py-5 px-7 bg-white flex flex-row items-center gap-[50px] rounded-lg">
          {error ? (
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          ) : (
            <>
              <div className="w-[150px] h-[150px] border p-5 rounded-full">
                <MdInsertEmoticon className="w-[100%] h-[100%]" />
              </div>
              <div
                className="flex flex-row items-center gap-[50px]"
                style={{ width: "calc(100% - 200px)" }}
              >
                <div>
                  <h1 className="text-3xl font-bold">{profileData.username}</h1>
                  <p className="text-lg mt-2 text-gray-600">
                    {profileData.role}
                  </p>
                  <p className="text-md mt-2 text-gray-600">
                    {profileData.username}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export const profileAction = async () => {
  try {
    const res = await $api.get(`/api/v1/web-users/profile`);
    return await res.data;
  } catch (error) {
    return { error: "Afsuski, foydalanuvchi topilmadi" };
  }
};

export default Profile;
