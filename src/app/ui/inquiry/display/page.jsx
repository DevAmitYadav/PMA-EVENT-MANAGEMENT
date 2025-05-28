"use client";

import { useEffect, useState } from "react";
import { getEnquiries, deleteEnquiry } from "@/lib/api/enquiryApi";
import EditModal from "../edit/page";
import { toast } from "sonner";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiMessageCircle, 
  FiClock, 
  FiEdit, 
  FiTrash2, 
  FiList, 
  FiAlertTriangle 
} from "react-icons/fi";

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of enquiries per page

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await getEnquiries();
      setEnquiries(data);
      setCurrentPage(1); // Reset to first page whenever data is fetched
    } catch (error) {
      toast.error("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    try {
      await deleteEnquiry(deleteItem._id);
      toast.success("Enquiry deleted successfully.");
      setDeleteItem(null);
      fetchEnquiries();
    } catch (error) {
      toast.error("Failed to delete enquiry.");
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(date));

  // Define header items with icons for an enhanced visual experience
  const headers = [
    { label: "Name", icon: <FiUser className="inline-block mr-1" /> },
    { label: "Email", icon: <FiMail className="inline-block mr-1" /> },
    { label: "Phone", icon: <FiPhone className="inline-block mr-1" /> },
    { label: "Event Type", icon: <FiCalendar className="inline-block mr-1" /> },
    { label: "Message", icon: <FiMessageCircle className="inline-block mr-1" /> },
    { label: "Submitted On", icon: <FiClock className="inline-block mr-1" /> },
    { label: "Actions", icon: <FiList className="inline-block mr-1" /> },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(enquiries.length / pageSize);
  const currentEnquiries = enquiries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Updated pagination with enhanced, strong blue colors
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`px-4 py-2 border rounded-md transition ${
                currentPage === num
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    );
  };

  return (
    <section className="p-6 font-sans">
      {/* Enhanced Dashboard heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiList className="text-blue-500" /> Enquiries Dashboard
        </h2>
      </div>

      {loading ? (
        // Loading state with animated skeleton rows
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-50 dark:bg-blue-900">
              <tr>
                {headers.map((heading, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    {heading.icon}
                    {heading.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  {headers.map((_, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : enquiries.length === 0 ? (
        // If there are no enquiries
        <div className="py-10 text-center text-gray-400">
          No enquiries available.
        </div>
      ) : (
        <>
          {/* Main table with enhanced UI */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-lg rounded-lg">
              <thead className="bg-blue-50 dark:bg-blue-900">
                <tr>
                  {headers.map((heading, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      {heading.icon}
                      {heading.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-gray-700">
                {currentEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {enquiry.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {enquiry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {enquiry.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {enquiry.eventType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-400">
                      {enquiry.eventDetails}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditItem(enquiry)}
                        className="flex items-center gap-1 mr-4 text-blue-600 hover:text-blue-800 transition"
                      >
                        <FiEdit /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteItem(enquiry)}
                        className="flex items-center gap-1 text-rose-600 hover:text-rose-800 transition"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </>
      )}

      {/* Edit Modal */}
      {editItem && (
        <EditModal
          enquiry={editItem}
          onClose={() => setEditItem(null)}
          refresh={fetchEnquiries}
        />
      )}

      {/* Confirm Delete Modal */}
      {deleteItem && (
        <ConfirmDeleteModal
          title="Delete Enquiry"
          message="Are you sure you want to delete this enquiry?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteItem(null)}
        />
      )}
    </section>
  );
}

function ConfirmDeleteModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 w-80">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white mb-4">
          <FiAlertTriangle className="text-red-500" /> {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
