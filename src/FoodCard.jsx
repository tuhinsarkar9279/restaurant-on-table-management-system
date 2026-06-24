import {
  CButton,
  CCard,
  CCardBody,
} from "@coreui/react";

function FoodCard({
  image,
  title,
  description,
  price,
  onAdd,
}) {
  return (
    <CCard className="bg-black border border-gray-800">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <CCardBody>
        <h5 className="text-white text-xl font-semibold">
          {title}
        </h5>

        <p className="text-gray-400 text-sm mb-3">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-amber-400 text-xl font-bold">
            ${price}
          </span>

          <CButton
            color="warning"
            onClick={onAdd}
          >
            + Add
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  );
}

export default FoodCard;