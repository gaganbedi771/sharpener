import ExpenseItem from "./components/ExpenseItem";

function App() {
  const expenses = [
    {
      title: "Food",
      Expense: 1000,
      Location: "Manali",
      Date: new Date(2023, 7, 8),
    },
    {
      title: "Petrol",
      Expense: 5000,
      Location: "Chandigarh",
      Date: new Date(),
    },
    { title: "Movies", Expense: 600, Location: "Chandigarh", Date: new Date() },
  ];

  return (
    <div>
      <h2> Expense Items </h2>
      <ExpenseItem
        title={expenses[0].title}
        expense={expenses[0].Expense}
        location={expenses[0].Location}
        date={expenses[0].Date}
      ></ExpenseItem>
         <ExpenseItem
        title={expenses[1].title}
        expense={expenses[1].Expense}
        location={expenses[1].Location}
        date={expenses[1].Date}
      ></ExpenseItem>
         <ExpenseItem
        title={expenses[2].title}
        expense={expenses[2].Expense}
        location={expenses[2].Location}
        date={expenses[2].Date}
      ></ExpenseItem>
    </div>
  );
}

export default App;
