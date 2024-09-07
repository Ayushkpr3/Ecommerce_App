import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProductDetails, updateProduct, clearErrors } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import './updateProduct.css';

const UpdateProduct = ({ match, history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
  ];

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        description: product.description || '',
        category: product.category || '',
        stock: product.Stock || 0,
      });
      setOldImages(product.images || []);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully');
      history.push('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, updateError, isUpdated, product, productId, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.set('name', formData.name);
    updatedFormData.set('price', formData.price);
    updatedFormData.set('description', formData.description);
    updatedFormData.set('category', formData.category);
    updatedFormData.set('Stock', formData.stock);

    images.forEach((image) => {
      updatedFormData.append('images', image);
    });

    dispatch(updateProduct(productId, updatedFormData));
  };

  return (
    <div className="updateProductWrapper">
      <MetaData title="Update Product" />
      <Sidebar />
      <div className="updateProductContainer">
        <form className="updateProductForm" onSubmit={submitHandler} encType="multipart/form-data">
          <h2>Update Product</h2>

          <div className="formGroup">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows="3"
            ></textarea>
          </div>

          <div className="formGroup">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Enter stock"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="images">Images</label>
            <input type="file" id="images" name="images" accept="image/*" onChange={handleImageChange} multiple />
            <div className="imagePreviewContainer">
              {oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
              ))}
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
          </div>

          <button type="submit" className="submitBtn" disabled={loading}>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
