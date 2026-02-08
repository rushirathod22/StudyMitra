
import { motion } from "framer-motion";

const AIChatModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-[90%] max-w-md p-6"
      >
        <h3 className="text-lg font-semibold text-indigo-600">
          Studymitra AI Mentor
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Ask me anything about your study plan, progress, or doubts.
        </p>

        <div className="mt-4 h-40 border rounded-lg p-3 text-sm text-gray-400">
          AI chat coming soon…
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-indigo-600"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default AIChatModal;
