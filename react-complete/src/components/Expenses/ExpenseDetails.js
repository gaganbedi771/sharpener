// import Card from "./Card";

function ExpenseDetails(props) {

  return (
    <div className="expense-item__description">
      <h2> {props.title}</h2>
      <h3> at {props.location} </h3>
      <div className="expense-item__price">Rs {props.expense}</div>
    </div>
  );
}
 
export default ExpenseDetails;
