import { CButton, CCard, CCardBody } from "@coreui/react";

const FoodCard = ({
  image,
  title,
  description,
  price,
  onAdd,
}) => {
  return (
    <CCard className="bg-black border border-gray-800 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <CCardBody>
        <h5 className="text-white text-xl font-semibold mb-2">
          {title}
        </h5>

        <p className="text-gray-400 text-sm mb-4">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-amber-400 text-2xl font-bold">
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
};

export default FoodCard;