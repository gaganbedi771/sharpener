import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import ExpenseDetails from "./ExpenseDetails"
import Card from "../UI/Card";

function ExpenseItem(props) {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date}></ExpenseDate>

      <ExpenseDetails 
        title={props.title}
        location={props.location}
        expense={props.expense}
        ></ExpenseDetails>

    </Card>
  );
}

export default ExpenseItem;
