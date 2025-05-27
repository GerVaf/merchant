import { Modal } from "antd";

// eslint-disable-next-line react/prop-types
const ImageModal = ({ visible, src, alt, onClose }) => {
  return (
    <Modal  open={visible} footer={null}  onCancel={onClose} centered>
      <img src={src} className="object-contain p-5 w-full" alt={alt} />
    </Modal>
  );
};

export default ImageModal;
