import React, { useEffect, useState } from 'react';
import './newProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // State variables for form inputs
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    images: [],
    imagesPreview: [],
  });

  const { name, price, description, category, stock, images, imagesPreview } = productData;

  const { loading, error, success } = useSelector((state) => state.newProduct);

  // Categories available for selection
  const categories = ['Laptop', 'Footwear', 'Bottom', 'Tops', 'Attire', 'Camera', 'SmartPhones'];

  // Effect to handle errors and successful product creation
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product Created Successfully');
      history.push('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);

    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData));
  };

  // Handler for image input change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setProductData((prevData) => ({
      ...prevData,
      images: [],
      imagesPreview: [],
    }));

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductData((prevData) => ({
            ...prevData,
            imagesPreview: [...prevData.imagesPreview, reader.result],
            images: [...prevData.images, reader.result],
          }));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="newProductWrapper">
      <MetaData title="Create New Product" />
      <Sidebar />
      <div className="newProductContainer">
        <form className="createProductForm" onSubmit={handleSubmit}>
          <h1>Create New Product</h1>

          <div className="formGroup">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              value={price}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <textarea
              name="description"
              placeholder="Product Description"
              value={description}
              onChange={handleChange}
              rows="2"
            ></textarea>
          </div>

          <div className="formGroup">
            <select name="category" value={category} onChange={handleChange}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              required
              value={stock}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          <div className="imagePreviewContainer">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <button type="submit" className="submitBtn" disabled={loading}>
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
