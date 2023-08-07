import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";

function Expenses(props) {
  return (
    <Card className="expenses">
      <ExpenseItem
        title={props.items[0].Title}
        expense={props.items[0].Expense}
        location={props.items[0].Location}
        date={props.items[0].Date}
      ></ExpenseItem>
      <ExpenseItem
        title={props.items[1].Title}
        expense={props.items[1].Expense}
        location={props.items[1].Location}
        date={props.items[1].Date}
      ></ExpenseItem>
      <ExpenseItem
        title={props.items[2].Title}
        expense={props.items[2].Expense}
        location={props.items[2].Location}
        date={props.items[2].Date}
      ></ExpenseItem>
    </Card>
  );
}

export default Expenses;
