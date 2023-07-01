import { useEffect, useRef, useState } from "react";
import { CanceledError } from "./components/services/api-clients";
import userService, { Users } from "./components/services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = async (user: Users) => {
    const originaUsers = [...users];

    //updating the Ui first before calling d server
    setUsers(users.filter((u) => u.id !== user.id));

    //calling the server to delete user
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originaUsers);
    });
  };

  const addUser = async () => {
    const originalUsers = [...users];
    const newUser = {
      id: 0,
      name: "Mosh",
    };

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: Users) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {/* {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>My Alert</Alert>
      )} */}
      {/* <Button color="primary" onClick={() => setAlertVisible(true)}>
        click me
      </Button>
      <ListGroup items={items} heading="Cities" onSelectItem={() => items} />
      <Like onClick={() => console.log("clicked")} /> */}

      {/* <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} /> */}

      {/* <ExpandableText>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
        error tempora libero iure porro ipsa eaque molestias, explicabo quis
        perferendis sed blanditiis iusto vel praesentium cumque delectus amet
        temporibus expedita. Atque eveniet aliquid ipsam ratione consequatur
        doloribus et debitis, modi est. Earum tempora molestiae ducimus sapiente
        et sunt mollitia nam non eos illo illum quidem natus, officia rerum
        expedita sint. Molestias quisquam a, incidunt pariatur provident facilis
        qui neque nisi aliquid. Beatae nisi quod tenetur, optio ab vero incidunt
        necessitatibus vitae quisquam odio eligendi tempora officiis fuga quidem
        eveniet suscipit deserunt blanditiis laudantium. Ab libero aspernatur
        blanditiis, sit ratione quisquam.
      </ExpandableText> */}
      {/* <Form /> */}
      {/* <StateHookForm /> */}
      {/* <ReactHookForm /> */}
      {/* <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div> */}
      {/* <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div> */}

      {/* <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id != id))}
      /> */}

      {/* <input ref={ref} type="text" className="form-control" /> */}
      {/* <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} /> */}
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
