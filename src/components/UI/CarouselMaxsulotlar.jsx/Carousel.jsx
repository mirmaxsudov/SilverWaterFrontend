import styles from "./Carousel.module.css";
import { Box, Modal, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { $api } from "../../../api/request";
import { notifyError } from "../../../helper/toast";

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await $api.get("/api/v1/web-product");
      setProducts(response.data);
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        notifyError("Malumotlarni yuklashda xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.body}>
      {loading ? (
        <Box className={styles.loading}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          className={styles.slider}
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap={2}
        >
          {products.map((product) => (
            <Box
              gridColumn={{
                xs: "span 12",
                sm: "span 6",
                md: "span 6",
                lg: "span 6",
                xl: "span 3",
              }}
              className={styles.card}
              key={product.id}
            >
              <Box
                className={styles.img}
                onClick={() => handleImageClick(product.image.url)}
                style={{ cursor: "pointer" }}
              >
                <img src={product.image.url} alt={product.title} />
              </Box>
              <div className={styles.content}>
                <div
                  className={`${styles.title} text-wrap`}
                  style={{ wordBreak: "break-word" }}
                >
                  <p className="text-start text-2xl">{product.title}</p>
                </div>
              </div>
            </Box>
          ))}
        </Box>
      )}
      <Modal open={Boolean(selectedImage)} onClose={handleCloseModal}>
        <Box className={styles.modalContent}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full view"
              className={styles.fullImage}
            />
          )}
          <Button onClick={handleCloseModal} className={styles.closeBtn}>
            Yopish
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Carousel;