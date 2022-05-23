
import { query as q } from "faunadb";

export default {
  name: "RegisterUser",
  role: q.Role("RegisterRole"),
  body:
  q.Query(
    q.Lambda(
      ["email", "password", "username", "about_me"],
      q.Create(q.Collection("User"), {
        credentials: { password: q.Var("password") },
        data: { 
          email: q.Var("email"),
          username: q.Var("username"),
          about_me: q.Var("about_me")
        }
      })
    )
  )
};
  