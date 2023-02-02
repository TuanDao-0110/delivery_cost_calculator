import React from "react";
const tagIcon = ["🍮", "🥦", "🥩", "🍺", "🌽"];
type props = {
  tag: Array<string>;
};
const FoodTag = ({ tag }: props) => {
  return (
    <>
      {tag?.map((item, index) => {
        return (
          <div key={index} className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
            {tagIcon[Math.round(Math.random() * 4)]} {item}
          </div>
        );
      })}
    </>
  );
};

// export default FoodTag;
export const MemoizedFoodTag = React.memo(FoodTag);
