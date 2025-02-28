import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { notifyError } from "../../../helper/toast";
import { getById } from "../../../api/request/botNotification/botNotification.api";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineContentCopy } from "react-icons/md";

const BotNotificationDetails = () => {
  const { id: notificationId } = useParams();
  const navigate = useNavigate();

  const [botNotification, setBotNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getById(notificationId);
        if (response.status !== 200) {
          notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
          setBotNotification(null);
        } else {
          setBotNotification(response.data);
        }
      } catch (error) {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        if (status >= 400 && status < 500) {
          notifyError(message || "So‘rovda xatolik yuz berdi.");
        } else {
          notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
        }
        setBotNotification(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [notificationId]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleCopy = async () => {
    if (botNotification?.message) {
      try {
        await navigator.clipboard.writeText(botNotification.message);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      } catch (err) {
        notifyError("Xabar nusxalanmadi.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ImSpinner2 className="animate-spin text-4xl text-gray-600" />
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!botNotification) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl">Notification not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const message = botNotification.message ?? "";
  const threshold = 300;
  const isLongMessage = message.length > threshold;
  const displayedMessage =
    isExpanded || !isLongMessage
      ? message
      : message.substring(0, threshold) + "...";

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Notification Details</h2>

        <div className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="w-32 font-semibold">ID:</span>
            <p className="text-gray-700 break-all">{botNotification.id}</p>
          </div>

          {botNotification.sentBy && (
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="w-32 font-semibold">Sent By:</span>
              <p className="text-gray-700 break-all">{botNotification.sentBy}</p>
            </div>
          )}

          {botNotification.sentAt && (
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="w-32 font-semibold">Sent At:</span>
              <p className="text-gray-700">
                {new Date(botNotification.sentAt).toLocaleString()}
              </p>
            </div>
          )}

          {botNotification.createdAt && (
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="w-32 font-semibold">Created At:</span>
              <p className="text-gray-700">
                {new Date(botNotification.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-start">
            <span className="w-32 font-semibold">Message:</span>
            <div className="relative flex-1 text-gray-700 w-full max-w-full overflow-x-hidden">
              <p
                className="
                  whitespace-pre-wrap
                  break-all
                  bg-gray-50
                  p-3
                  rounded
                  shadow-inner
                  w-full
                  max-w-full
                "
              >
                {displayedMessage}
              </p>

              {isLongMessage && (
                <button
                  onClick={toggleExpanded}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              )}

              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                title="Copy message"
              >
                <MdOutlineContentCopy size={20} />
              </button>

              {copySuccess && (
                <span className="absolute bg-white rounded px-2 py-1 top-4 right-10 text-green-600 text-sm">
                  {copySuccess}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotNotificationDetails;
