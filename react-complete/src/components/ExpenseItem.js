import "./ExpenseItem.css";
function ExpenseItem(props) {

  return (
    <div className="expense-item">
      <div className="expense-item__description">
        <h2> Hey</h2>
        <h3>
          {props.title} at {props.location} on {props.date.toISOString()}{" "}
        </h3>
        <div className="expense-item__price">Rs {props.expense}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
