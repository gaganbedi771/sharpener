import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails"
import Card from "../UI/Card";

function ExpenseItem(props) {
  return (
    <div className="expense-item">
      <ExpenseDate date={props.date}></ExpenseDate>

      <ExpenseDetails 
        title={props.title}
        location={props.location}
        expense={props.expense}
        ></ExpenseDetails>

    </div>
  );
}

export default ExpenseItem;
