import create from "./http-service";

export interface Users {
  id: number;
  name: string;
  //username: string;
  //   email: string;
  //   address: {
  //     street: string;
  //     suit: string;
  //     city: string;
  //     zipcode: string;
  //     geo: {
  //       lat: string;
  //       lng: string;
  //     };
  //   };
  //   phone: number;
  //   website: string;
  //   company: {
  //     name: string;
  //     catchPhrase: string;
  //     bs: string;
  //   };
}

export default create("/users");
