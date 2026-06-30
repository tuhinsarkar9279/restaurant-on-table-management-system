import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilSave,
  cilX,
} from "@coreui/icons";

const Colors = () => {
  // ===========================
  // STATES
  // ===========================

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [visible, setVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    img: "",
    name: "",
    category: "",
    dsc: "",
    price: "",
    rate: "",
    country: "",
    collection: "",
  });

  // ===========================
  // LOAD ALL FOODS
  // ===========================

  useEffect(() => {
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchSearch = (food.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "All" || food.collection === categoryFilter;

    return matchSearch && matchCategory;
  });

  const fetchFoods = async () => {
    try {
      const categories = [
        "bbqs",
        "best-foods",
        "burgers",
        "desserts",
        "drinks",
        "fried-chicken",
        "ice-cream",
        "pizzas",
        "porks",
        "sandwiches",
        "sausages",
        "steaks",
        "our-foods",
      ];

      const results = await Promise.all(
        categories.map(async (category) => {
          try {
            const res = await axios.get(`http://localhost:3000/${category}`);
            return (res.data || []).map((item) => ({ ...item, collection: category }));
          } catch (err) {
            return [];
          }
        })
      );

      const allFoods = results.flat();
      setFoods(allFoods);
    } catch (err) {
      console.log(err);
      alert("Failed to load food items");
    }
  };

  // ===========================
  // HANDLE INPUT
  // ===========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ===========================
  // OPEN ADD MODAL
  // ===========================

  const openAddModal = () => {
    setIsEdit(false);

    setFormData({
      id: "",
      img: "",
      name: "",
      category: "",
      dsc: "",
      price: "",
      rate: "",
      country: "",
      collection: "",
    });

    setVisible(true);
  };

  // ===========================
  // OPEN EDIT MODAL
  // ===========================

  const openEditModal = (
    food
  ) => {
    setIsEdit(true);

    setFormData(food);

    setVisible(true);
  };

  // ===========================
  // BUILD PAYLOAD
  // ===========================

  const buildPayload = () => ({
    id: formData.id || `${Date.now()}`,
    img: formData.img?.trim() || "",
    name: formData.name?.trim() || "",
    dsc: formData.dsc?.trim() || "",
    price: Number(formData.price) || 0,
    rate: Number(formData.rate) || 0,
    country: formData.country?.trim() || "",
  });

  // ===========================
  // ADD ITEM
  // ===========================

  const addItem = async () => {
    if (!formData.collection) {
      alert("Please select a category");
      return;
    }

    try {
      const payload = buildPayload();
      await axios.post(`http://localhost:3000/${formData.collection}`, payload);

      await fetchFoods();
      setVisible(false);
      alert("Food Added");
    } catch (err) {
      console.log(err);
      alert("Failed to add food");
    }
  };

  // ===========================
  // UPDATE ITEM
  // ===========================

  const updateItem = async () => {
    try {
      const payload = buildPayload();
      await axios.put(
        `http://localhost:3000/${formData.collection}/${formData.id}`,
        payload
      );

      await fetchFoods();
      setVisible(false);
      alert("Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to update food");
    }
  };

  // ===========================
  // DELETE ITEM
  // ===========================

  const deleteItem = async (
    food
  ) => {
    if (
      !window.confirm(
        "Delete this item?"
      )
    )
      return;

    try {
      await axios.delete(
        `http://localhost:3000/${food.collection}/${food.id}`
      );

      fetchFoods();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            Menu Management
          </h4>

          <CButton
            color="success"
            onClick={openAddModal}
          >
            <CIcon
              icon={cilPlus}
              className="me-2"
            />
            Add Item
          </CButton>
        </CCardHeader>
        <div className="row mb-4">

  <div className="col-md-6">

    <CFormInput
      placeholder="Search Food..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

  </div>

  <div className="col-md-4">

    <CFormSelect
      value={categoryFilter}
      onChange={(e) =>
        setCategoryFilter(e.target.value)
      }
    >
      <option value="All">
        All Categories
      </option>

      <option value="bbqs">BBQS</option>

      <option value="best-foods">
        BEST FOODS
      </option>

      <option value="burgers">
        BURGERS
      </option>

      <option value="desserts">
        DESSERTS
      </option>

      <option value="drinks">
        DRINKS
      </option>

      <option value="fried-chicken">
        FRIED CHICKEN
      </option>

      <option value="ice-cream">
        ICE CREAM
      </option>

      <option value="pizzas">
        PIZZAS
      </option>

      <option value="porks">
        PORKS
      </option>

      <option value="sandwiches">
        SANDWICHES
      </option>

      <option value="sausages">
        SAUSAGES
      </option>

      <option value="steaks">
        STEAKS
      </option>

      <option value="our-foods">
        OUR FOODS
      </option>

    </CFormSelect>

  </div>

  <div className="col-md-2">

    <div
      className="bg-primary text-white rounded text-center p-2"
    >
      <h6>Total Items</h6>

      <h4>{filteredFoods.length}</h4>
    </div>

  </div>

</div>

        <CCardBody>
          <CTable
            bordered
            hover
            responsive
            align="middle"
          >
            <CTableHead color="dark">
              <CTableRow>

                <CTableHeaderCell>
                  #
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Image
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Name
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Category
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Description
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Price
                </CTableHeaderCell>

                

               

                <CTableHeaderCell>
                  Edit
                </CTableHeaderCell>

                <CTableHeaderCell>
                  Delete
                </CTableHeaderCell>

              </CTableRow>
            </CTableHead>

            <CTableBody>

              {foods.length === 0 ? (

                <CTableRow>

                  <CTableDataCell
                    colSpan={10}
                    className="text-center"
                  >
                    No Food Found
                  </CTableDataCell>

                </CTableRow>

              ) : (

                filteredFoods.map((food, index) => (

                  <CTableRow key={`${food.collection}-${food.id}`}>

                    <CTableDataCell>
                      {index + 1}
                    </CTableDataCell>

                    <CTableDataCell>

                      <img
                        src={food.img}
                        alt={food.name}
                        width="70"
                        height="70"
                        className="rounded"
                      />

                    </CTableDataCell>

                    <CTableDataCell>
                      {food.name}
                    </CTableDataCell>

                    <CTableDataCell>
                      {food.collection}
                    </CTableDataCell>

                    <CTableDataCell>
                      {food.dsc}
                    </CTableDataCell>

                    <CTableDataCell>
                      ₹{food.price}
                    </CTableDataCell>

                    

                    

                    <CTableDataCell>

                      <CButton
                        color="warning"
                        size="sm"
                        onClick={() =>
                          openEditModal(food)
                        }
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>

                    </CTableDataCell>

                    <CTableDataCell>

                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() =>
                          deleteItem(food)
                        }
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>

                    </CTableDataCell>

                  </CTableRow>

                ))

              )}

            </CTableBody>

          </CTable>
        </CCardBody>
      </CCard>

      <CModal
  visible={visible}
  onClose={() => setVisible(false)}
  size="lg"
>
  <CModalHeader>
    <CModalTitle>
      {isEdit
        ? "Edit Food Item"
        : "Add Food Item"}
    </CModalTitle>
  </CModalHeader>

  <CModalBody>

    <div className="row">

      <div className="col-md-6 mb-3">
        <label className="form-label">
          Food ID
        </label>

        <CFormInput
          name="id"
          value={formData.id}
          onChange={handleChange}
          disabled={isEdit}
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">
          Food Name
        </label>

        <CFormInput
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mb-3">

        <label className="form-label">
          Category
        </label>

        <CFormSelect
          name="collection"
          value={formData.collection}
          onChange={handleChange}
        >

          <option value="">
            Select Category
          </option>

          <option value="bbqs">
            BBQS
          </option>

          <option value="best-foods">
            BEST FOODS
          </option>

          <option value="burgers">
            BURGERS
          </option>

          <option value="desserts">
            DESSERTS
          </option>

          <option value="drinks">
            DRINKS
          </option>

          <option value="fried-chicken">
            FRIED CHICKEN
          </option>

          <option value="ice-cream">
            ICE CREAM
          </option>

          <option value="pizzas">
            PIZZAS
          </option>

          <option value="porks">
            PORKS
          </option>

          <option value="sandwiches">
            SANDWICHES
          </option>

          <option value="sausages">
            SAUSAGES
          </option>

          <option value="steaks">
            STEAKS
          </option>

          <option value="our-foods">
            OUR FOODS
          </option>

        </CFormSelect>

      </div>

      <div className="col-md-6 mb-3">

        <label className="form-label">
          Price
        </label>

        <CFormInput
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

      </div>

      <div className="col-md-6 mb-3">

        <label className="form-label">
          Rating
        </label>

        <CFormInput
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
        />

      </div>

      <div className="col-md-6 mb-3">

        <label className="form-label">
          Country
        </label>

        <CFormInput
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

      </div>
            <div className="col-12 mb-3">

        <label className="form-label">
          Description
        </label>

        <CFormTextarea
          rows={3}
          name="dsc"
          value={formData.dsc}
          onChange={handleChange}
        />

      </div>

      <div className="col-12 mb-3">

        <label className="form-label">
          Image URL
        </label>

        <CFormInput
          name="img"
          value={formData.img}
          onChange={handleChange}
        />

      </div>

      {formData.img && (
        <div className="col-12 text-center">

          <img
            src={formData.img}
            alt="Preview"
            style={{
              width: "180px",
              borderRadius: "10px",
            }}
          />

        </div>
      )}

    </div>

  </CModalBody>

  <CModalFooter>

    <CButton
      color="secondary"
      onClick={() => setVisible(false)}
    >
      <CIcon
        icon={cilX}
        className="me-2"
      />
      Cancel
    </CButton>

    {isEdit ? (

      <CButton
        color="warning"
        onClick={updateItem}
      >
        <CIcon
          icon={cilSave}
          className="me-2"
        />
        Update Item
      </CButton>

    ) : (

      <CButton
        color="success"
        onClick={addItem}
      >
        <CIcon
          icon={cilSave}
          className="me-2"
        />
        Save Item
      </CButton>

    )}

  </CModalFooter>

</CModal>

    </>
  );
};

export default Colors;