import Expenses from "./components/Expenses/Expenses";

function App() {
  const expenses = [
    { Title: "Food", Expense: 1000, Location: "Manali", Date: new Date(2023, 0, 8) },
    { Title: "Petrol", Expense: 5000, Location: "Chandigarh", Date: new Date() },
    { Title: "Movies", Expense: 600, Location: "Chandigarh", Date: new Date() },
  ];

  return (
    <div>
      <h2> Expense Items </h2>
      <Expenses items={expenses}></Expenses>
    </div>
  );
}

export default App;
