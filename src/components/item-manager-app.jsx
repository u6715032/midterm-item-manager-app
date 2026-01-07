import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  // additional refs
  const itemCategory = useRef(null);
  const itemPrice = useRef(null);

  // auto-increment ID
  const nextId = useRef(1);

  // add item handler
  const handleAddItem = () => {
    const name = itemName.current.value.trim();
    const category = itemCategory.current.value;
    const price = Number(itemPrice.current.value);

    // validation
    if (name === "") {
      setErrorMsg("Item name cannot be empty.");
      return;
    }

    const duplicate = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      setErrorMsg("Item name must be unique.");
      return;
    }

    if (category === "") {
      setErrorMsg("Please select a category.");
      return;
    }

    if (price < 0) {
      setErrorMsg("Price cannot be negative.");
      return;
    }

    // add item
    const newItem = {
      id: nextId.current,
      name,
      category,
      price,
    };

    nextId.current += 1;
    setItems([...items, newItem]);
    setErrorMsg("");

    // clear inputs
    itemName.current.value = "";
    itemCategory.current.value = "";
    itemPrice.current.value = "";
  };

  // delete item
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // category icon helper
  const getCategoryIcon = (category) => {
    if (category === "Stationary") return stationaryLogo;
    if (category === "Kitchenware") return kitchenwareLogo;
    if (category === "Appliance") return applianceLogo;
    return "";
  };

  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* item rows */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={getCategoryIcon(item.category)}
                    alt={item.category}
                    className="category-icon"
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    className="delete-icon"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* form row (LAST ROW) */}
            <tr>
              <td>-</td>
              <td>
                <input type="text" ref={itemName} />
              </td>
              <td>
                <select ref={itemCategory}>
                  <option value="">Select</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input type="number" ref={itemPrice} />
              </td>
              <td>
                <button onClick={handleAddItem}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">{errorMsg}</div>
    </>
  );
}

export default ItemManager;
